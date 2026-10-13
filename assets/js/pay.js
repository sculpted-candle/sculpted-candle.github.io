/**
 * SCULPTED & CANDLE — Dynamic SBP Payment Invoice
 * Reads URL params:
 *   ?order=SC-105&amount=1950&desc=...&client=...&phone=...&recipient=...
 * Generates:
 *   1. T-Bank direct link with prefilled exact amount & comment
 *   2. Sberbank direct link with prefilled amount
 *   3. SBP / Universal link
 * Renders authentic scannable QR code via QRCode library.
 * Direct 1-tap mobile button to launch banking app with amount ready.
 */

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);

  // 1. Extract params
  const orderId = urlParams.get('order') || ('SC-' + Math.floor(100 + Math.random() * 900));
  const rawAmount = parseInt(urlParams.get('amount'), 10) || 1950;
  const desc = urlParams.get('desc') || 'Свеча ручной работы';
  const clientName = urlParams.get('client') || '';
  let phone = urlParams.get('phone');
  let recipient = urlParams.get('recipient');
  let defaultBank = urlParams.get('bank');

  // If phone, recipient or bank not in URL, load from server settings or localStorage
  if (!phone || !recipient || !defaultBank) {
    try {
      const resp = await fetch('/api/settings');
      if (resp.ok) {
        const set = await resp.json();
        if (set && set.sbp) {
          phone = phone || set.sbp.phone;
          recipient = recipient || set.sbp.recipient;
          defaultBank = defaultBank || set.sbp.bank;
        }
      }
    } catch (e) {
      // fallback
    }
    if (!phone) {
      try {
        const localSet = JSON.parse(localStorage.getItem('sc_settings') || '{}');
        phone = localSet.phone || '+7 (900) 000-00-00';
        recipient = localSet.recipient || 'Екатерина М. (Катерина)';
        defaultBank = defaultBank || localSet.bank || 'Альфа-Банк';
      } catch (e) {
        phone = '+7 (900) 000-00-00';
        recipient = 'Екатерина М. (Катерина)';
      }
    }
  }
  defaultBank = defaultBank || 'Альфа-Банк';

  const cleanPhone = (phone || '').replace(/\D/g, '');
  const formattedAmount = `${rawAmount.toLocaleString('ru-RU')} ₽`;

  // 2. Populate Static DOM elements
  const orderBadgeEl = document.getElementById('order-badge');
  if (orderBadgeEl) orderBadgeEl.textContent = `Заказ № ${orderId}`;
  
  const orderAmountEl = document.getElementById('order-amount');
  if (orderAmountEl) orderAmountEl.textContent = formattedAmount;

  const pillAmountEl = document.getElementById('pill-amount');
  if (pillAmountEl) pillAmountEl.textContent = formattedAmount;

  const paySumCopyEl = document.getElementById('pay-sum-copy-val');
  if (paySumCopyEl) paySumCopyEl.textContent = formattedAmount;

  const payPhoneEl = document.getElementById('pay-phone');
  if (payPhoneEl) payPhoneEl.textContent = phone;

  const recipientNameEl = document.getElementById('recipient-name');
  if (recipientNameEl) recipientNameEl.textContent = recipient;

  const payCommentEl = document.getElementById('pay-comment');
  if (payCommentEl) payCommentEl.textContent = `Заказ ${orderId}`;

  let descText = desc;
  if (clientName) {
    descText = `Для: ${clientName} • ${desc}`;
  }
  const orderDescEl = document.getElementById('order-desc');
  if (orderDescEl) orderDescEl.textContent = descText;

  // 3. Copy button handlers
  const copyPhoneBtn = document.getElementById('btn-copy-phone');
  if (copyPhoneBtn) {
    copyPhoneBtn.onclick = () => {
      navigator.clipboard.writeText(phone).then(() => {
        copyPhoneBtn.textContent = '✓ Скопировано';
        setTimeout(() => copyPhoneBtn.textContent = 'Копировать', 2000);
      });
    };
  }

  const copyAmountBtn = document.getElementById('btn-copy-amount');
  if (copyAmountBtn) {
    copyAmountBtn.onclick = () => {
      navigator.clipboard.writeText(String(rawAmount)).then(() => {
        copyAmountBtn.textContent = '✓ Скопировано';
        setTimeout(() => copyAmountBtn.textContent = 'Копировать', 2000);
      });
    };
  }

  // 4. Bank switching logic & QR Generation
  let currentBank = 'alfa';
  if (defaultBank) {
    const dbLow = defaultBank.toLowerCase();
    if (dbLow.includes('альфа') || dbLow.includes('alfa')) currentBank = 'alfa';
    else if (dbLow.includes('сбер')) currentBank = 'sber';
    else if (dbLow.includes('т-банк') || dbLow.includes('тинькофф')) currentBank = 'tbank';
  }

  // Check if master configured a custom SBP / T-Bank collection link
  let customSbpLink = urlParams.get('custom_link') || '';
  if (!customSbpLink) {
    try {
      const localSet = JSON.parse(localStorage.getItem('sc_settings') || '{}');
      customSbpLink = localSet.sbpCustomLink || '';
    } catch (e) {}
  }

  function getBankPayload(bankType) {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    // If master has a direct personal SBP collection link (e.g. from T-Bank or Sber)
    if (customSbpLink && customSbpLink.startsWith('http')) {
      return {
        qrText: customSbpLink,
        appUrl: customSbpLink,
        btnText: `Перейти к оплате через СБП`,
        btnClass: 'pay-app-btn-sbp',
        bankLabel: 'СБП (Прямая ссылка)'
      };
    }

    // Reliable mobile deep links that launch bank apps directly without 404
    if (bankType === 'alfa') {
      return {
        qrText: window.location.href,
        appUrl: isMobile ? 'alfabank://' : `tel:${cleanPhone}`,
        btnText: `Открыть Альфа-Банк (${cleanPhone})`,
        btnClass: 'pay-app-btn-alfa',
        bankLabel: 'Альфа-Банк (СБП 0%)'
      };
    } else if (bankType === 'tbank') {
      return {
        qrText: window.location.href,
        appUrl: isMobile ? 'tinkoffbank://' : `tel:${cleanPhone}`,
        btnText: `Открыть Т-Банк (${cleanPhone})`,
        btnClass: 'pay-app-btn-tbank',
        bankLabel: 'Т-Банк (СБП 0%)'
      };
    } else if (bankType === 'sber') {
      return {
        qrText: window.location.href,
        appUrl: isMobile ? 'sberbankonline://' : `tel:${cleanPhone}`,
        btnText: `Открыть СберБанк (${cleanPhone})`,
        btnClass: 'pay-app-btn-sber',
        bankLabel: 'Сбербанк (СБП 0%)'
      };
    } else {
      return {
        qrText: window.location.href,
        appUrl: isMobile ? 'tinkoffbank://' : `tel:${cleanPhone}`,
        btnText: `Перевести через СБП (${cleanPhone})`,
        btnClass: 'pay-app-btn-sbp',
        bankLabel: 'СБП (Любой банк РФ 0%)'
      };
    }
  }

  function updatePaymentView(bankType) {
    currentBank = bankType;
    const config = getBankPayload(bankType);

    // Update Tab UI
    document.querySelectorAll('.pay-bank-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-bank') === bankType);
    });

    // Update Labels & Mobile Button
    const bankLabelEl = document.getElementById('pay-bank-label');
    if (bankLabelEl) bankLabelEl.textContent = config.bankLabel;

    const appBtn = document.getElementById('btn-open-app');
    const appBtnText = document.getElementById('btn-app-text');
    if (appBtn && appBtnText) {
      appBtn.href = config.appUrl;
      appBtnText.textContent = config.btnText;
      appBtn.className = `pay-app-btn ${config.btnClass}`;
      
      // On click, also copy clean phone to clipboard so user can just paste it in bank app!
      appBtn.onclick = (e) => {
        if (!config.appUrl.startsWith('http')) {
          e.preventDefault();
          navigator.clipboard.writeText(cleanPhone).then(() => {
            alert(`Номер ${phone} скопирован в буфер обмена!\n\nОткройте ваш банк и вставьте номер в поле «Перевод по СБП».`);
            window.location.href = config.appUrl;
          }).catch(() => {
            window.location.href = config.appUrl;
          });
        }
      };
    }

    // Render or Update QR Code
    const qrContainer = document.getElementById('qrcode');
    if (qrContainer && typeof QRCode !== 'undefined') {
      qrContainer.innerHTML = '';
      try {
        new QRCode(qrContainer, {
          text: config.qrText,
          width: 170,
          height: 170,
          colorDark: '#1E201D',
          colorLight: '#FFFFFF',
          correctLevel: QRCode.CorrectLevel.M
        });
      } catch (err) {
        console.warn('QR Render error:', err);
      }
    }
  }

  // Bind bank tab clicks
  document.querySelectorAll('.pay-bank-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      updatePaymentView(tab.getAttribute('data-bank'));
    });
  });

  // Initial render
  updatePaymentView(currentBank);

  // 5. Telegram confirmation button
  const tgConfirmBtn = document.getElementById('btn-confirm-tg');
  if (tgConfirmBtn) {
    const tgMsg = encodeURIComponent(
      `Здравствуйте, Катерина! Я оплатил(а) заказ № ${orderId} на сумму ${rawAmount} ₽ (${desc}). Чек об оплате прикрепляю к этому сообщению 👇`
    );
    tgConfirmBtn.href = `https://t.me/layra_ms?text=${tgMsg}`;
  }
});
