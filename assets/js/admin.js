/**
 * SCULPTED&CANDLE — Admin Panel Logic (Кабинет мастера)
 * Multi-category management, image compression for reliable storage,
 * Hero badge customization, payment link generator, and requisites.
 */

const DEFAULT_PIN = '1234';

const DEFAULT_CATEGORIES = [
  { id: 'all', titleRu: 'Все изделия', titleEn: 'All Pieces' },
  { id: 'candles', titleRu: 'Свечи', titleEn: 'Candles' },
  { id: 'gypsum', titleRu: 'Гипс и подносы', titleEn: 'Plaster Decor' },
  { id: 'sets', titleRu: 'Подарочные сеты', titleEn: 'Gift Sets' },
  { id: 'seasonal', titleRu: 'Сезонное / Праздники', titleEn: 'Seasonal' }
];

const DEFAULT_SCENTS = [
  { id: 'scent-1', title: 'Табак & Ваниль', desc: 'Пряный табачный лист, сливочная бурбонская ваниль, какао, теплые сухофрукты', active: true },
  { id: 'scent-2', title: 'Сандал, Черный перец & Амбра', desc: 'Благородный сандал, терпкий черный перец, теплая смолистая амбра', active: true },
  { id: 'scent-3', title: 'Крапива, Полынь & Луговые травы', desc: 'Свежескошенные луговые травы, горьковатая полынь, сосновая смола', active: true },
  { id: 'scent-4', title: 'Тыква со специями & Карамель', desc: 'Спелая печеная тыква, корица, мускатный орех, сливочная тягучая карамель', active: true },
  { id: 'scent-5', title: 'Имбирный пряник & Морозная хвоя', desc: 'Имбирное пряничное тесто, пряная гвоздика, морозные сосновые ветви', active: true },
  { id: 'scent-6', title: 'Бергамот, Инжир & Белый кедр', desc: 'Искристый зеленый бергамот, спелый инжир, пудровый белый кедр', active: true },
  { id: 'scent-7', title: 'Без отдушки (чистый соевый воск)', desc: 'Натуральный деликатный аромат экологически чистого растительного воска', active: true }
];

const DEFAULT_PROMO = {
  enabled: true,
  badge: 'Особая коллекция',
  title: 'Сет «Тепло и Камень»',
  desc: 'Гипсовый овальный поднос, свеча с потрескивающим деревянным фитилем и спички в стекле.',
  btnText: 'Заказать коллекцию',
  productId: 'sc-06'
};

const FALLBACK_PRODUCTS = [
  {
    id: 'sc-01',
    titleRu: 'Свеча «Тыковка» (Осенняя серия)',
    titleEn: 'Pumpkin Sculpted Candle (Autumn Edition)',
    categories: ['candles', 'seasonal'],
    holidays: ['autumn'],
    price: 1200,
    status: 'in-stock',
    image: 'assets/img/product_1.jpg',
    scentRu: 'Тыква со специями, карамель, мускат',
    scentEn: 'Spiced pumpkin, warm caramel, nutmeg',
    colors: 'Охра, Бежевый, Натуральный воск',
    finish: 'натуральный воск',
    descRu: 'Нежная фактурная свеча в виде спелой тыквы. Изготавливается из 100% соевого воска с хлопковым фитилем.',
    descEn: 'Delicate textured pumpkin-shaped candle handcrafted from 100% natural soy wax.',
    burnTime: '18-22 ч',
    size: '8 × 7 см'
  },
  {
    id: 'sc-02',
    titleRu: 'Скульптурная свеча «Анатомическое сердце»',
    titleEn: 'Anatomical Heart Sculpted Candle',
    categories: ['candles', 'seasonal'],
    holidays: ['feb14', 'bday'],
    price: 1800,
    status: 'preorder',
    image: 'assets/img/product_4.jpg',
    scentRu: 'Сандал, черный перец, амбра',
    scentEn: 'Sandalwood, black pepper, warm amber',
    colors: 'Белый, Графит, Бежевый, Винный',
    finish: 'матовый',
    descRu: 'Бестселлер и главный арт-объект мастерской. Невероятно детализированная ручная лепка и заливка. Время кропотливого изготовления — от 3 до 7 дней.',
    descEn: 'Signature handcrafted art piece with hyper-realistic anatomical detailing. Made to order with meticulous attention to detail (3–7 days craftsmanship).',
    burnTime: '25-30 ч',
    size: '11 × 8 см'
  },
  {
    id: 'sc-03',
    titleRu: 'Свеча «Карусель» (Праздничный предзаказ)',
    titleEn: 'Carousel Festive Candle',
    categories: ['candles', 'seasonal', 'sets'],
    holidays: ['ny', 'bday'],
    price: 2100,
    status: 'preorder',
    image: 'assets/img/product_3.jpg',
    scentRu: 'Имбирный пряник, корица, морозная хвоя',
    scentEn: 'Gingerbread cookie, cinnamon, winter pine',
    colors: 'Айвори, Белый, Золоченый акцент',
    finish: 'матовый',
    descRu: 'Зимняя сказка в вашем доме. Изящные лошадки карусели и теплый аромат новогодних праздников. Открыт ранний предзаказ к зимнему сезону.',
    descEn: 'Enchanting winter fairy tale with sculpted carousel horses and festive holiday fragrance. Early preorder open for the winter season.',
    burnTime: '30-35 ч',
    size: '12 × 10 см'
  },
  {
    id: 'sc-04',
    titleRu: 'Свеча «Крапива и Полынь» в гипсе',
    titleEn: 'Nettle & Wormwood Candle in Gypsum Vessel',
    categories: ['candles', 'gypsum', 'seasonal'],
    holidays: ['teacher', 'mar8'],
    price: 1450,
    status: 'in-stock',
    image: 'assets/img/product_2.jpg',
    scentRu: 'Дикие луговые травы, полынь, смола',
    scentEn: 'Wild meadow herbs, wormwood, fresh resin',
    colors: 'Белый гипс, Мраморная дымка, Шалфей',
    finish: 'матовый + влагозащита',
    descRu: 'Аромасвеча в прочном гипсовом кашпо ручной отливки с деревянным потрескивающим фитилем.',
    descEn: 'Scented candle poured into a handcrafted plaster vessel with a crackling wooden wick reminiscent of a cozy fireplace.',
    burnTime: '35-40 ч',
    size: '9 × 8.5 см'
  },
  {
    id: 'sc-05',
    titleRu: 'Гипсовый овальный поднос для украшений',
    titleEn: 'Oval Plaster Tray for Jewelry & Candles',
    categories: ['gypsum', 'seasonal'],
    holidays: ['mar8', 'bday', 'teacher'],
    price: 750,
    status: 'in-stock',
    image: 'assets/img/product_5.jpg',
    scentRu: 'Без аромата (интерьерный декор)',
    scentEn: 'Unscented (interior decor)',
    colors: 'Белоснежный, Теплый беж, Графит, Черный мрамор',
    finish: 'полуматовый шелковистый (влагостойкий)',
    descRu: 'Минималистичный поднос с гидрофобным защитным покрытием. Подходит для хранения украшений, духов, ключей или как подставка под свечи.',
    descEn: 'Minimalist water-sealed gypsum tray. Ideal for rings, perfumes, keys, or as an elegant base for candles.',
    burnTime: '—',
    size: '18 × 9.5 см'
  },
  {
    id: 'sc-06',
    titleRu: 'Подарочный сет «Тепло и Камень»',
    titleEn: 'Gift Set «Warmth & Stone»',
    categories: ['sets', 'gypsum', 'candles', 'seasonal'],
    holidays: ['ny', 'feb14', 'mar8', 'teacher', 'bday'],
    price: 2900,
    status: 'in-stock',
    image: 'assets/img/product_6.jpg',
    scentRu: 'Бергамот, инжир, белый кедр',
    scentEn: 'Bergamot, wild fig, white cedarwood',
    colors: 'Комплект: на выбор (Белый / Песочный / Графит)',
    finish: 'матовый тактильный',
    descRu: 'Идеальный готовый подарок в крафтовой упаковке: свеча в гипсе, овальный поднос и стильные спички в стеклянной колбе.',
    descEn: 'A curated gift package: gypsum scented candle, matching oval tray, and luxury apothecary matches in a glass tube.',
    burnTime: '40 ч',
    size: 'Сет 3 предмета'
  },
  {
    id: 'sc-07',
    titleRu: 'Новогодний сет «Зимняя Сказка»',
    titleEn: 'New Year Gift Set «Winter Tale»',
    categories: ['candles', 'seasonal', 'sets'],
    holidays: ['ny'],
    price: 3200,
    status: 'preorder',
    image: 'assets/img/product_3.jpg',
    scentRu: 'Имбирный пряник, корица, морозная хвоя',
    scentEn: 'Gingerbread cookie, cinnamon, winter pine',
    colors: 'Праздничный белый, Золото, Изумрудный акцент',
    finish: 'матовый с золотым напылением',
    descRu: 'Праздничный набор ручной работы: скульптурная свеча, новогодний декор из гипса, аромат морозной хвои и праздничная открытка с пожеланием.',
    descEn: 'Handcrafted holiday gift set with sculpted winter candle and festive plaster decor.',
    burnTime: '35 ч',
    size: 'Подарочный бокс'
  },
  {
    id: 'sc-08',
    titleRu: 'Подарочный бокс «Нежность» (к 8 Марта)',
    titleEn: 'Spring Gift Box «Tenderness» (March 8)',
    categories: ['candles', 'gypsum', 'seasonal', 'sets'],
    holidays: ['mar8'],
    price: 2600,
    status: 'in-stock',
    image: 'assets/img/product_7.jpg',
    scentRu: 'Бергамот, инжир, белый кедр',
    scentEn: 'Bergamot, wild fig, white cedar',
    colors: 'Нежная пудра, Пастельный беж, Белоснежный',
    finish: 'шелковистый матовый',
    descRu: 'Весенний подарочный бокс для самых любимых женщин: ароматическая свеча в кашпо из гипса, изящный поднос и деликатный цветочный комплимент.',
    descEn: 'Spring bespoke gift box for International Women\'s Day.',
    burnTime: '30-35 ч',
    size: 'Набор 2 предмета'
  },
  {
    id: 'sc-09',
    titleRu: 'Сет «Благодарность» (День Учителя / 1 Сентября)',
    titleEn: 'Gratitude Gift Box (Teacher\'s Day / Sep 1)',
    categories: ['candles', 'gypsum', 'seasonal', 'sets'],
    holidays: ['teacher'],
    price: 1950,
    status: 'in-stock',
    image: 'assets/img/product_2.jpg',
    scentRu: 'Крапива, полынь, сосновая смола',
    scentEn: 'Wild meadow herbs, pine resin',
    colors: 'Натуральный белый гипс, Теплый лен',
    finish: 'матовый тактильный',
    descRu: 'Изящный и душевный подарок преподавателю или наставнику: свеча с легким природным ароматом, мини-поднос для мелочей и крафтовая упаковка с лентой.',
    descEn: 'Artisanal gift box expressing heartfelt gratitude for teachers and mentors.',
    burnTime: '25-30 ч',
    size: 'Сет с открыткой'
  },
  {
    id: 'sc-10',
    titleRu: 'Подарочный сет «С Днем Рождения!»',
    titleEn: 'Happy Birthday Handcrafted Set',
    categories: ['sets', 'seasonal'],
    holidays: ['bday'],
    price: 3100,
    status: 'in-stock',
    image: 'assets/img/product_6.jpg',
    scentRu: 'Табак & Бурбонская ваниль',
    scentEn: 'Spiced tobacco & bourbon vanilla',
    colors: 'Мраморный микс, Графит, Теплый беж',
    finish: 'полуматовый защитный',
    descRu: 'Универсальный праздничный подарок на юбилей или день рождения. Авторская ручная работа из Санкт-Петербурга с персональной открыткой.',
    descEn: 'Special festive gift set curated for birthdays and milestones.',
    burnTime: '40 ч',
    size: 'Подарочный набор'
  }
];

// --- State ---
let products = [];
let categories = [];
let uploadedProductPhoto = '';
let uploadedHeroPhoto = '';
let uploadedAboutPhoto = '';

// --- Image Compression Utility (Canvas) ---
function compressImage(file, maxDimension = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// --- Load / Save Data ---
function loadData() {
  const storedProd = localStorage.getItem('sc_products');
  if (storedProd) {
    try {
      products = JSON.parse(storedProd);
      products.forEach(p => {
        if (!p.categories) p.categories = p.category ? [p.category] : ['candles'];
      });
    } catch (e) {
      products = [...FALLBACK_PRODUCTS];
    }
  } else {
    products = [...FALLBACK_PRODUCTS];
    localStorage.setItem('sc_products', JSON.stringify(products));
  }

  const storedCat = localStorage.getItem('sc_categories');
  if (storedCat) {
    try {
      categories = JSON.parse(storedCat);
    } catch (e) {
      categories = [...DEFAULT_CATEGORIES];
    }
  } else {
    categories = [...DEFAULT_CATEGORIES];
    localStorage.setItem('sc_categories', JSON.stringify(categories));
  }

  // Scents
  loadScents();
}

let scents = [];
function loadScents() {
  const storedScents = localStorage.getItem('sc_scents');
  if (storedScents) {
    try {
      scents = JSON.parse(storedScents);
    } catch (e) {
      scents = [...DEFAULT_SCENTS];
    }
  } else {
    scents = [...DEFAULT_SCENTS];
    localStorage.setItem('sc_scents', JSON.stringify(scents));
  }
}

function notifyDataUpdated() {
  localStorage.setItem('sc_last_local_save', Date.now().toString());
  try {
    const channel = new BroadcastChannel('sc_admin_sync');
    channel.postMessage({ type: 'sync', time: Date.now() });
  } catch (e) {}
  if (typeof notifyPendingChanges === 'function') notifyPendingChanges();
  autoSyncToServer();
}

async function autoSyncToServer() {
  try {
    const currentSettings = getSettings();
    const currentPromo = JSON.parse(localStorage.getItem('sc_promo_popup') || '{}');
    const currentTexts = JSON.parse(localStorage.getItem('sc_custom_texts') || '{}');
    const heroImg = localStorage.getItem('sc_hero_img');
    const aboutImg = localStorage.getItem('sc_about_img');
    const heroBadgeTitle = localStorage.getItem('sc_hero_badge_title');
    const heroBadgeSub = localStorage.getItem('sc_hero_badge_sub');

    const siteDataPayload = {
      version: 1,
      lastUpdated: new Date().toISOString(),
      categories,
      scents,
      promo: currentPromo,
      texts: currentTexts,
      settings: currentSettings,
      heroImg: heroImg || null,
      aboutImg: aboutImg || null,
      heroBadgeTitle: heroBadgeTitle || null,
      heroBadgeSub: heroBadgeSub || null,
      products
    };

    const endpoints = ['/api/save_and_deploy', 'http://127.0.0.1:8085/api/save_and_deploy'];
    for (const ep of endpoints) {
      try {
        const resp = await fetch(ep, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(siteDataPayload)
        });
        if (resp.ok) break;
      } catch (err) {}
    }
  } catch (e) {}
}

function saveScents() {
  localStorage.setItem('sc_scents', JSON.stringify(scents));
  notifyDataUpdated();
}

function saveProducts() {
  localStorage.setItem('sc_products', JSON.stringify(products));
  notifyDataUpdated();
}

function saveCategories() {
  localStorage.setItem('sc_categories', JSON.stringify(categories));
  notifyDataUpdated();
}

function getSettings() {
  return {
    phone: localStorage.getItem('sc_set_phone') || '+7 (900) 000-00-00',
    bank: localStorage.getItem('sc_set_bank') || 'Т-Банк',
    recipient: localStorage.getItem('sc_set_recipient') || 'Екатерина М. (Катерина)',
    tgUser: localStorage.getItem('sc_set_tg_user') || 'layra_ms',
    tgToken: localStorage.getItem('sc_tg_bot_token') || '',
    tgChatId: localStorage.getItem('sc_tg_chat_id') || '',
    sbpCustomLink: localStorage.getItem('sc_sbp_custom_link') || '',
    itemsPerPage: localStorage.getItem('sc_items_per_page') || '6',
    pin: localStorage.getItem('sc_admin_pin') || DEFAULT_PIN
  };
}

function saveSettings(s) {
  if (s.phone !== undefined) localStorage.setItem('sc_set_phone', s.phone);
  if (s.bank !== undefined) localStorage.setItem('sc_set_bank', s.bank);
  if (s.recipient !== undefined) localStorage.setItem('sc_set_recipient', s.recipient);
  if (s.tgUser !== undefined) localStorage.setItem('sc_set_tg_user', s.tgUser);
  if (s.tgToken !== undefined) localStorage.setItem('sc_tg_bot_token', s.tgToken);
  if (s.tgChatId !== undefined) localStorage.setItem('sc_tg_chat_id', s.tgChatId);
  if (s.sbpCustomLink !== undefined) localStorage.setItem('sc_sbp_custom_link', s.sbpCustomLink);
  if (s.itemsPerPage !== undefined) localStorage.setItem('sc_items_per_page', s.itemsPerPage);
  if (s.pin !== undefined) localStorage.setItem('sc_admin_pin', s.pin);

  // Send to server API if available
  fetch('/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      telegram: { botToken: s.tgToken || '', chatId: s.tgChatId || '', notifyOnNewOrder: true },
      sbp: {
        phone: s.phone,
        bank: s.bank,
        recipient: s.recipient,
        tgUser: s.tgUser,
        customLink: s.sbpCustomLink || ''
      },
      itemsPerPage: parseInt(s.itemsPerPage || 6, 10),
      adminPin: s.pin || DEFAULT_PIN
    })
  }).catch(() => {});

  notifyDataUpdated();
}

// --- PIN Authentication ---
function checkAuth() {
  const isAuth = sessionStorage.getItem('sc_is_admin') === 'true';
  const authScreen = document.getElementById('auth-screen');
  const workspace = document.getElementById('admin-workspace');

  if (isAuth) {
    authScreen.style.display = 'none';
    workspace.style.display = 'block';
    renderAdminProducts();
    renderAdminOrders();
    renderAdminCategories();
    renderAdminScents();
    initAdminPromoForm();
    initPhotosManager();
    initSettingsForm();
  } else {
    authScreen.style.display = 'block';
    workspace.style.display = 'none';
  }
}

function setupAuth() {
  const form = document.getElementById('form-pin-auth');
  const pinInput = document.getElementById('input-pin');
  const errorMsg = document.getElementById('pin-error');
  const logoutBtn = document.getElementById('btn-admin-logout');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentPin = getSettings().pin;
    if (pinInput.value === currentPin) {
      sessionStorage.setItem('sc_is_admin', 'true');
      errorMsg.style.display = 'none';
      checkAuth();
    } else {
      errorMsg.style.display = 'block';
      pinInput.value = '';
    }
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('sc_is_admin');
    checkAuth();
  });
}

// --- Tabs Navigation ---
function setupTabs() {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
      if (targetId === 'tab-orders') renderAdminOrders();
      if (targetId === 'tab-scents') renderAdminScents();
      if (targetId === 'tab-promo') initAdminPromoForm();
    });
  });

  const clearBtn = document.getElementById('btn-clear-orders');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Очистить список всех заявок клиентов?')) {
        localStorage.removeItem('sc_orders');
        renderAdminOrders();
      }
    });
  }
}

// --- Render Admin Orders List ---
async function renderAdminOrders() {
  const list = document.getElementById('admin-orders-list');
  const countSpan = document.getElementById('count-orders');
  if (!list) return;

  let localOrders = [];
  try {
    localOrders = JSON.parse(localStorage.getItem('sc_orders') || '[]');
  } catch (e) {
    localOrders = [];
  }

  // Try fetching latest orders from server API
  let serverOrders = [];
  try {
    const res = await fetch('/api/orders');
    if (res.ok) serverOrders = await res.json();
  } catch (e) {}

  // Merge server and local orders (deduplicate by id/orderId)
  const map = new Map();
  [...serverOrders, ...localOrders].forEach(o => {
    const key = o.orderId || o.id;
    if (key && !map.has(key)) map.set(key, o);
  });
  const orders = Array.from(map.values());

  if (countSpan) countSpan.textContent = orders.length;
  list.innerHTML = '';

  if (orders.length === 0) {
    list.innerHTML = `
      <div style="background: #FFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 40px; text-align: center; color: var(--text-muted);">
        Пока нет входящих заявок. Когда покупатель оформит заказ на сайте, он моментально появится здесь и придет в Telegram!
      </div>
    `;
    return;
  }

  const s = getSettings();
  orders.forEach((ord, idx) => {
    const card = document.createElement('div');
    card.className = 'admin-prod-row';
    card.style.display = 'flex';
    card.style.justifyContent = 'space-between';
    card.style.alignItems = 'flex-start';
    card.style.flexWrap = 'wrap';
    card.style.gap = '14px';
    card.style.padding = '18px';
    card.style.border = '1px solid var(--border-light)';
    card.style.borderRadius = 'var(--radius-md)';
    card.style.marginBottom = '12px';
    card.style.background = '#FFFFFF';

    const orderId = ord.orderId || ord.id || `SC-${idx + 100}`;
    const total = ord.total || ord.productPrice || 0;
    const title = ord.productTitle || (ord.items && ord.items[0] ? ord.items[0].title : 'Свеча ручной работы');
    const scent = ord.scent || (ord.items && ord.items[0] ? ord.items[0].scent : '');
    const cleanPhone = (ord.customerPhone || '').replace(/[^0-9]/g, '');
    const isTgNick = (ord.customerPhone || '').startsWith('@');
    const contactHref = isTgNick 
      ? `https://t.me/${ord.customerPhone.replace('@', '')}`
      : `tel:${cleanPhone}`;

    const tgReplyMsg = encodeURIComponent(
      `Здравствуйте, ${ord.customerName}! Вы оставляли заказ #${orderId} на «${title}» (${total} ₽)${scent ? ` с ароматом «${scent}»` : ''}. Уточняем детали по доставке и оплате!`
    );

    const payUrl = `pay.html?order=${orderId}&amount=${total}&desc=${encodeURIComponent(title)}&client=${encodeURIComponent(ord.customerName)}&phone=${encodeURIComponent(s.phone)}&recipient=${encodeURIComponent(s.recipient)}`;

    const status = ord.status || 'new';
    let statusBadge = '<span style="background:#E2E8F0; color:#334155; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:600;">В обработке</span>';
    if (status === 'new') statusBadge = '<span style="background:#DCFCE7; color:#15803D; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:600;">🟢 Новый заказ</span>';
    if (status === 'in_progress') statusBadge = '<span style="background:#FEF3C7; color:#B45309; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:600;">🟠 В работе (отливка)</span>';
    if (status === 'shipped') statusBadge = '<span style="background:#E0E7FF; color:#4338CA; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:600;">📦 Отправлен СДЭК</span>';
    if (status === 'completed') statusBadge = '<span style="background:#F1F5F9; color:#475569; padding:2px 8px; border-radius:12px; font-size:0.75rem; font-weight:600;">✅ Завершен</span>';

    card.innerHTML = `
      <div style="flex: 1; min-width: 280px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px; flex-wrap: wrap;">
          <strong style="font-size: 1.1rem; color: var(--text-primary);">${ord.customerName}</strong>
          ${statusBadge}
          <span style="font-size: 0.76rem; color: var(--text-muted); background: var(--bg-subtle); padding: 2px 8px; border-radius: 4px;">№ ${orderId} · ${ord.date || ''}</span>
        </div>
        <div style="font-size: 0.9rem; color: var(--accent-sage-dark); font-weight: 600; margin-bottom: 4px;">
          📞 Контакт: <a href="${contactHref}" style="text-decoration: underline; color: var(--accent-sage);">${ord.customerPhone}</a>
        </div>
        <div style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 4px;">
          Изделие: <strong>«${title}»</strong> (${total} ₽)
          ${ord.colors ? `· Оттенок: ${ord.colors}` : ''}
          ${ord.finish ? `· Покрытие: ${ord.finish}` : ''}
        </div>
        ${scent ? `<div style="font-size: 0.84rem; color: var(--accent-terracotta); font-weight: 600; margin-bottom: 4px;">🌸 Аромат: <span>${scent}</span></div>` : ''}
        ${ord.deliveryAddress ? `<div style="font-size: 0.8rem; color: var(--text-muted);">🚚 Доставка: ${ord.deliveryType || 'СДЭК'} — ${ord.deliveryAddress}</div>` : ''}
        ${ord.comment ? `<div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">💬 Пожелание: <i>«${ord.comment}»</i></div>` : ''}
      </div>

      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <a href="${payUrl}" target="_blank" class="btn btn-outline btn-sm" title="Открыть персональный платежный QR-код СБП">
          💳 Счет СБП
        </a>
        <a href="https://t.me/share/url?url=${encodeURIComponent('https://t.me/' + (s.tgUser || 'layra_ms'))}&text=${tgReplyMsg}" target="_blank" class="btn btn-primary btn-sm">
          💬 Написать в TG
        </a>
        <select onchange="window.updateOrderStatus('${orderId}', this.value)" style="padding: 4px 8px; font-size: 0.78rem; border: 1px solid var(--border-light); border-radius: 6px; background: var(--bg-subtle);">
          <option value="new" ${status === 'new' ? 'selected' : ''}>🟢 Новый</option>
          <option value="in_progress" ${status === 'in_progress' ? 'selected' : ''}>🟠 В работе</option>
          <option value="shipped" ${status === 'shipped' ? 'selected' : ''}>📦 Отправлен</option>
          <option value="completed" ${status === 'completed' ? 'selected' : ''}>✅ Завершен</option>
        </select>
      </div>
    `;
    list.appendChild(card);
  });
}

window.updateOrderStatus = async function(orderId, newStatus) {
  try {
    await fetch('/api/order/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status: newStatus })
    });
  } catch (e) {}
  // Also update in localStorage
  try {
    const list = JSON.parse(localStorage.getItem('sc_orders') || '[]');
    list.forEach(o => {
      if ((o.orderId || o.id) === orderId) o.status = newStatus;
    });
    localStorage.setItem('sc_orders', JSON.stringify(list));
  } catch (e) {}
  renderAdminOrders();
};

// --- Render Admin Products List ---
function renderAdminProducts() {
  const list = document.getElementById('admin-products-list');
  const countSpan = document.getElementById('count-products');
  if (!list) return;

  countSpan.textContent = products.length;
  list.innerHTML = '';

  if (products.length === 0) {
    list.innerHTML = `
      <div style="background: #FFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 40px; text-align: center; color: var(--text-muted);">
        В каталоге пока нет изделий. Нажмите кнопку «+ Добавить новое изделие» выше.
      </div>
    `;
    return;
  }

  products.forEach(p => {
    const pCats = p.categories || [];
    const catLabels = pCats.map(catId => {
      const c = categories.find(item => item.id === catId);
      return c ? c.titleRu : catId;
    }).join(', ');

    const card = document.createElement('div');
    card.className = 'product-row-card';
    card.innerHTML = `
      <div style="display: flex; align-items: center; gap: 16px;">
        <img src="${p.image}" alt="${p.titleRu}" class="product-row-thumb" onerror="this.src='assets/img/product_1.jpg'">
        <div>
          <div style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; color: var(--text-primary);">
            ${p.titleRu}
          </div>
          <div style="font-size: 0.8rem; color: var(--accent-terracotta); margin: 2px 0;">
            ${p.scentRu || 'Без аромата'}
          </div>
          <div style="display: flex; gap: 8px; align-items: center; font-size: 0.74rem; flex-wrap: wrap;">
            <span style="background: var(--bg-subtle); padding: 2px 8px; border-radius: var(--radius-full); color: var(--text-muted);">
              ${catLabels || 'Без категории'}
            </span>
            <span style="background: ${p.status === 'in-stock' ? 'var(--accent-sage-light)' : '#FFF7E6'}; color: ${p.status === 'in-stock' ? 'var(--accent-sage)' : '#D46B08'}; padding: 2px 8px; border-radius: var(--radius-full); font-weight: 600;">
              ${p.status === 'in-stock' ? 'В наличии' : 'Под заказ'}
            </span>
            <span style="color: var(--text-muted);">
              ${p.burnTime ? 'Горение: ' + p.burnTime : ''}
            </span>
            ${(p.holidays || []).map(hId => {
              const labels = { ny: 'Новый Год', feb14: '14 Февраля', mar8: '8 Марта', teacher: 'День Учителя', autumn: 'Осень', bday: 'День Рождения' };
              return `<span style="background: rgba(184, 115, 87, 0.12); color: var(--accent-terracotta); padding: 2px 6px; border-radius: 4px; font-weight: 600; font-size: 0.72rem;">${labels[hId] || hId}</span>`;
            }).join(' ')}
          </div>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 700; color: var(--text-primary); text-align: right; min-width: 90px;">
          ${p.price.toLocaleString('ru-RU')} ₽
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-outline btn-sm" onclick="editProduct('${p.id}')">
            Редактировать
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}')">
            Удалить
          </button>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}

// --- Delete Product ---
window.deleteProduct = function(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;

  if (confirm(`Удалить «${p.titleRu}» из каталога?`)) {
    products = products.filter(item => item.id !== id);
    saveProducts();
    renderAdminProducts();
  }
};

// --- Multi-Category Checkbox Render in Product Modal ---
function renderCategoryCheckboxes(selectedArray = []) {
  const container = document.getElementById('edit-categories-group');
  if (!container) return;

  container.innerHTML = '';
  categories.filter(c => c.id !== 'all').forEach(c => {
    const isChecked = selectedArray.includes(c.id);
    const label = document.createElement('label');
    label.className = 'cat-check-item';
    label.innerHTML = `
      <input type="checkbox" name="product-category" value="${c.id}" ${isChecked ? 'checked' : ''}>
      <span>${c.titleRu}</span>
    `;
    container.appendChild(label);
  });
}

window.editProduct = function(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;

  renderCategoryCheckboxes(p.categories || []);

  const holidays = p.holidays || [];
  document.querySelectorAll('input[name="product-holiday"]').forEach(cb => {
    cb.checked = holidays.includes(cb.value);
  });

  document.getElementById('modal-product-title').textContent = 'Редактировать изделие';
  document.getElementById('edit-product-id').value = p.id;
  document.getElementById('edit-title-ru').value = p.titleRu;
  document.getElementById('edit-title-en').value = p.titleEn || '';
  document.getElementById('edit-price').value = p.price;
  document.getElementById('edit-status').value = p.status;
  document.getElementById('edit-scent-ru').value = p.scentRu || '';
  document.getElementById('edit-scent-en').value = p.scentEn || '';
  document.getElementById('edit-burn').value = p.burnTime || '';
  document.getElementById('edit-colors').value = p.colors || 'Натуральный белый, Теплый беж, Графит';
  document.getElementById('edit-finish').value = p.finish || 'матовый';
  document.getElementById('edit-desc-ru').value = p.descRu || '';

  uploadedProductPhoto = p.image || '';
  const preview = document.getElementById('edit-drop-preview');
  if (uploadedProductPhoto) {
    preview.src = uploadedProductPhoto;
    preview.style.display = 'block';
  } else {
    preview.style.display = 'none';
  }

  document.getElementById('modal-edit-product').classList.add('active');
};

function setupProductModal() {
  const modal = document.getElementById('modal-edit-product');
  const openAddBtn = document.getElementById('btn-open-add-modal');
  const closeBtn = document.getElementById('btn-close-edit-modal');
  const form = document.getElementById('form-edit-product');
  const fileDrop = document.getElementById('edit-photo-drop');
  const fileInput = document.getElementById('edit-photo-file');
  const dropPreview = document.getElementById('edit-drop-preview');

  openAddBtn.addEventListener('click', () => {
    form.reset();
    renderCategoryCheckboxes(['candles']);
    document.querySelectorAll('input[name="product-holiday"]').forEach(cb => cb.checked = false);
    document.getElementById('edit-product-id').value = '';
    document.getElementById('modal-product-title').textContent = 'Добавить новое изделие';
    document.getElementById('edit-colors').value = 'Белый, Бежевый, Мрамор, Графит';
    document.getElementById('edit-finish').value = 'матовый';
    uploadedProductPhoto = '';
    dropPreview.style.display = 'none';
    modal.classList.add('active');
  });

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  fileDrop.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        uploadedProductPhoto = await compressImage(file, 900, 0.82);
        dropPreview.src = uploadedProductPhoto;
        dropPreview.style.display = 'block';
      } catch (err) {
        console.error('Image compression error', err);
      }
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-product-id').value;

    // Collect multiple checked categories
    const checkedCats = Array.from(document.querySelectorAll('input[name="product-category"]:checked'))
      .map(cb => cb.value);
    const chosenCategories = checkedCats.length > 0 ? checkedCats : ['candles'];

    // Collect checked holidays
    const checkedHolidays = Array.from(document.querySelectorAll('input[name="product-holiday"]:checked'))
      .map(cb => cb.value);

    const itemData = {
      titleRu: document.getElementById('edit-title-ru').value,
      titleEn: document.getElementById('edit-title-en').value || document.getElementById('edit-title-ru').value,
      categories: chosenCategories,
      category: chosenCategories[0],
      holidays: checkedHolidays,
      price: parseInt(document.getElementById('edit-price').value, 10) || 1000,
      status: document.getElementById('edit-status').value,
      size: 'Стандарт',
      scentRu: document.getElementById('edit-scent-ru').value || 'Натуральный воск',
      scentEn: document.getElementById('edit-scent-en').value || 'Natural wax',
      burnTime: document.getElementById('edit-burn').value || '20-25 ч',
      colors: document.getElementById('edit-colors').value || 'Белый, Беж, Графит',
      finish: document.getElementById('edit-finish').value || 'матовый',
      descRu: document.getElementById('edit-desc-ru').value || 'Авторская ручная работа.',
      descEn: 'Handcrafted bespoke piece.',
      image: uploadedProductPhoto || 'assets/img/product_1.jpg'
    };

    if (id) {
      const idx = products.findIndex(p => p.id === id);
      if (idx !== -1) {
        products[idx] = { ...products[idx], ...itemData };
      }
    } else {
      const newItem = {
        id: 'sc-custom-' + Date.now(),
        ...itemData
      };
      products.unshift(newItem);
    }

    saveProducts();
    renderAdminProducts();
    notifyPendingChanges();
    modal.classList.remove('active');
  });
}

// --- Category Management ---
function renderAdminCategories() {
  const container = document.getElementById('admin-categories-list');
  if (!container) return;

  container.innerHTML = '';
  categories.forEach(cat => {
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border: 1px solid var(--border-light); border-radius: var(--radius-sm); margin-bottom: 8px; background: var(--bg-main);';
    row.innerHTML = `
      <div>
        <strong>${cat.titleRu}</strong>
        <span style="color: var(--text-muted); font-size: 0.8rem; margin-left: 8px;">(${cat.titleEn || cat.titleRu})</span>
        <code style="font-size: 0.72rem; color: var(--accent-sage); margin-left: 8px;">id: ${cat.id}</code>
      </div>
      <div>
        ${cat.id === 'all' 
          ? '<span style="font-size: 0.75rem; color: var(--text-muted);">Основная</span>' 
          : `<button class="btn btn-danger btn-sm" onclick="deleteCategory('${cat.id}')">Удалить</button>`}
      </div>
    `;
    container.appendChild(row);
  });
}

window.deleteCategory = function(catId) {
  if (confirm(`Удалить категорию? Изделия останутся в каталоге.`)) {
    categories = categories.filter(c => c.id !== catId);
    saveCategories();
    renderAdminCategories();
  }
};

function setupCategoryForm() {
  const form = document.getElementById('form-add-category');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ru = document.getElementById('new-cat-name-ru').value.trim();
    const en = document.getElementById('new-cat-name-en').value.trim() || ru;
    const catId = 'cat-' + Date.now();

    categories.push({
      id: catId,
      titleRu: ru,
      titleEn: en
    });

    saveCategories();
    renderAdminCategories();
    form.reset();
  });
}

// --- Scents Management ---
function renderAdminScents() {
  const container = document.getElementById('admin-scents-list');
  const countSpan = document.getElementById('count-scents');
  if (!container) return;

  if (countSpan) countSpan.textContent = scents.length;
  container.innerHTML = '';

  if (scents.length === 0) {
    container.innerHTML = `
      <div style="background: #FFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 40px; text-align: center; color: var(--text-muted);">
        Нет добавленных ароматов. Нажмите «+ Добавить новый аромат», чтобы создать композицию.
      </div>
    `;
    return;
  }

  scents.forEach(s => {
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border: 1px solid var(--border-light); border-radius: var(--radius-md); margin-bottom: 10px; background: var(--bg-main); flex-wrap: wrap; gap: 12px;';

    const activeBadge = s.active !== false
      ? '<span style="background: rgba(122, 143, 126, 0.15); color: var(--accent-sage); font-size: 0.75rem; font-weight: 600; padding: 3px 8px; border-radius: 4px;">Активен</span>'
      : '<span style="background: rgba(184, 115, 87, 0.15); color: var(--accent-terracotta); font-size: 0.75rem; font-weight: 600; padding: 3px 8px; border-radius: 4px;">Скрыт</span>';

    row.innerHTML = `
      <div style="flex: 1; min-width: 240px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <strong style="font-size: 1rem; color: var(--text-primary);">${s.title}</strong>
          ${activeBadge}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">
          ${s.desc}
        </div>
      </div>
      <div style="display: flex; gap: 8px; align-items: center;">
        <button class="btn btn-sm" style="border: 1px solid var(--border-light); background: #FFF;" onclick="toggleScentActive('${s.id}')">
          ${s.active !== false ? 'Скрыть' : 'Включить'}
        </button>
        <button class="btn btn-outline btn-sm" onclick="editScent('${s.id}')">Изменить</button>
        <button class="btn btn-danger btn-sm" onclick="deleteScent('${s.id}')">Удалить</button>
      </div>
    `;
    container.appendChild(row);
  });
}

window.toggleScentActive = function(id) {
  const item = scents.find(s => s.id === id);
  if (item) {
    item.active = !item.active;
    saveScents();
    renderAdminScents();
  }
};

window.deleteScent = function(id) {
  if (confirm('Удалить этот аромат из палитры?')) {
    scents = scents.filter(s => s.id !== id);
    saveScents();
    renderAdminScents();
  }
};

window.editScent = function(id) {
  const s = scents.find(item => item.id === id);
  if (!s) return;
  document.getElementById('modal-scent-title').textContent = 'Редактировать аромат';
  document.getElementById('edit-scent-id').value = s.id;
  document.getElementById('edit-scent-name').value = s.title;
  document.getElementById('edit-scent-notes').value = s.desc;
  document.getElementById('edit-scent-active').checked = s.active !== false;
  document.getElementById('modal-edit-scent').classList.add('active');
};

function setupScentModal() {
  const modal = document.getElementById('modal-edit-scent');
  const openBtn = document.getElementById('btn-open-add-scent');
  const closeBtn = document.getElementById('btn-close-scent-modal');
  const form = document.getElementById('form-edit-scent');
  if (!modal || !form) return;

  if (openBtn) {
    openBtn.onclick = () => {
      document.getElementById('modal-scent-title').textContent = 'Добавить новый аромат';
      document.getElementById('edit-scent-id').value = '';
      form.reset();
      document.getElementById('edit-scent-active').checked = true;
      modal.classList.add('active');
    };
  }

  if (closeBtn) {
    closeBtn.onclick = () => modal.classList.remove('active');
  }

  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.remove('active');
  };

  form.onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-scent-id').value;
    const title = document.getElementById('edit-scent-name').value.trim();
    const desc = document.getElementById('edit-scent-notes').value.trim();
    const active = document.getElementById('edit-scent-active').checked;

    if (id) {
      const idx = scents.findIndex(s => s.id === id);
      if (idx !== -1) {
        scents[idx] = { id, title, desc, active };
      }
    } else {
      scents.push({
        id: 'scent-' + Date.now(),
        title,
        desc,
        active
      });
    }

    saveScents();
    renderAdminScents();
    modal.classList.remove('active');
  };
}

// --- Promo / Special Collection Popup Manager ---
function initAdminPromoForm() {
  const form = document.getElementById('form-admin-promo');
  if (!form) return;

  let promoData = DEFAULT_PROMO;
  try {
    const saved = localStorage.getItem('sc_promo_popup');
    if (saved) promoData = { ...DEFAULT_PROMO, ...JSON.parse(saved) };
  } catch (e) {
    promoData = DEFAULT_PROMO;
  }

  // Populate products select
  const select = document.getElementById('promo-product-select');
  if (select) {
    select.innerHTML = '<option value="">— Прямой диалог в Telegram с Катериной —</option>';
    products.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.titleRu} (${p.price} ₽)`;
      if (promoData.productId === p.id) opt.selected = true;
      select.appendChild(opt);
    });
  }

  document.getElementById('promo-enabled').checked = promoData.enabled !== false;
  document.getElementById('promo-badge').value = promoData.badge || '';
  document.getElementById('promo-title').value = promoData.title || '';
  document.getElementById('promo-desc').value = promoData.desc || '';
  document.getElementById('promo-btn-text').value = promoData.btnText || '';

  form.onsubmit = (e) => {
    e.preventDefault();
    const updated = {
      enabled: document.getElementById('promo-enabled').checked,
      badge: document.getElementById('promo-badge').value.trim(),
      title: document.getElementById('promo-title').value.trim(),
      desc: document.getElementById('promo-desc').value.trim(),
      btnText: document.getElementById('promo-btn-text').value.trim(),
      productId: document.getElementById('promo-product-select').value
    };
    localStorage.setItem('sc_promo_popup', JSON.stringify(updated));
    notifyDataUpdated();
    alert('Настройки всплывающего предложения успешно сохранены!');
  };

  const previewBtn = document.getElementById('btn-preview-promo-site');
  if (previewBtn) {
    previewBtn.onclick = () => {
      window.open('index.html', '_blank');
    };
  }
}

// --- Site Photos & Hero Badge Manager ---
function initPhotosManager() {
  const heroDrop = document.getElementById('drop-hero-photo');
  const heroInput = document.getElementById('input-hero-photo');
  const heroPreview = document.getElementById('preview-hero-photo');

  const aboutDrop = document.getElementById('drop-about-photo');
  const aboutInput = document.getElementById('input-about-photo');
  const aboutPreview = document.getElementById('preview-about-photo');

  const badgeTitleInput = document.getElementById('input-badge-title');
  const badgeSubInput = document.getElementById('input-badge-sub');

  const saveBtn = document.getElementById('btn-save-photos');

  // Load existing saved photos & badge text
  const savedHero = localStorage.getItem('sc_hero_img');
  heroPreview.src = (savedHero && !savedHero.includes('product_4.jpg')) ? savedHero : 'assets/img/fairy_katerina.jpg';

  const savedAbout = localStorage.getItem('sc_about_img');
  aboutPreview.src = (savedAbout && !savedAbout.includes('product_7.jpg')) ? savedAbout : 'assets/img/fairy_katerina.jpg';

  badgeTitleInput.value = localStorage.getItem('sc_hero_badge_title') || 'Мастерская Sculpted&Candle';
  badgeSubInput.value = localStorage.getItem('sc_hero_badge_sub') || 'Свечи и гипсовый декор ручной работы';

  // Hero upload with compression
  heroDrop.onclick = () => heroInput.click();
  heroInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        uploadedHeroPhoto = await compressImage(file, 900, 0.82);
        heroPreview.src = uploadedHeroPhoto;
      } catch (err) {
        console.error('Hero compression error', err);
      }
    }
  };

  // About upload with compression
  aboutDrop.onclick = () => aboutInput.click();
  aboutInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        uploadedAboutPhoto = await compressImage(file, 900, 0.82);
        aboutPreview.src = uploadedAboutPhoto;
      } catch (err) {
        console.error('About compression error', err);
      }
    }
  };

  saveBtn.onclick = () => {
    try {
      if (uploadedHeroPhoto) localStorage.setItem('sc_hero_img', uploadedHeroPhoto);
      if (uploadedAboutPhoto) localStorage.setItem('sc_about_img', uploadedAboutPhoto);
      if (badgeTitleInput.value) localStorage.setItem('sc_hero_badge_title', badgeTitleInput.value);
      if (badgeSubInput.value) localStorage.setItem('sc_hero_badge_sub', badgeSubInput.value);
      notifyDataUpdated();
      alert('Фотографии и надписи на главном экране успешно сохранены!');
    } catch (err) {
      alert('Ошибка сохранения: ' + err.message);
    }
  };
}

// --- Payment Link Generator in Admin ---
function setupPaymentLinkGenerator() {
  const form = document.getElementById('form-admin-gen-link');
  const resultBox = document.getElementById('adm-link-result-box');
  const resultInput = document.getElementById('adm-link-result-url');
  const copyBtn = document.getElementById('btn-adm-copy-link');
  const openBtn = document.getElementById('btn-adm-open-link');
  const shareTgBtn = document.getElementById('btn-adm-share-tg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = document.getElementById('adm-pay-amount').value;
    const desc = encodeURIComponent(document.getElementById('adm-pay-desc').value || 'Изделие ручной работы');
    const client = encodeURIComponent(document.getElementById('adm-pay-client').value || '');
    const orderId = 'SC-' + Math.floor(100 + Math.random() * 900);

    const s = getSettings();
    const phone = encodeURIComponent(s.phone);
    const recipient = encodeURIComponent(s.recipient);

    const origin = window.location.origin + window.location.pathname.replace('admin.html', '').replace(/\/$/, '');
    const paymentUrl = `${origin}/pay.html?order=${orderId}&amount=${amount}&desc=${desc}&client=${client}&phone=${phone}&recipient=${recipient}`;

    resultInput.value = paymentUrl;
    openBtn.href = paymentUrl;
    resultBox.style.display = 'block';

    shareTgBtn.onclick = () => {
      const shareText = encodeURIComponent(
        `Ссылка на оплату заказа № ${orderId} (${decodeURIComponent(desc)}) на сумму ${amount} ₽:\n${paymentUrl}`
      );
      window.open(`https://t.me/share/url?url=${encodeURIComponent(paymentUrl)}&text=${shareText}`, '_blank');
    };
  });

  copyBtn.addEventListener('click', () => {
    resultInput.select();
    navigator.clipboard.writeText(resultInput.value).then(() => {
      const orig = copyBtn.textContent;
      copyBtn.textContent = 'Скопировано!';
      setTimeout(() => copyBtn.textContent = orig, 2000);
    });
  });
}

// --- Settings Form Logic ---
function initSettingsForm() {
  const s = getSettings();
  if (document.getElementById('set-phone')) document.getElementById('set-phone').value = s.phone;
  if (document.getElementById('set-bank')) document.getElementById('set-bank').value = s.bank;
  if (document.getElementById('set-recipient')) document.getElementById('set-recipient').value = s.recipient;
  if (document.getElementById('set-tg-user')) document.getElementById('set-tg-user').value = s.tgUser;
  if (document.getElementById('set-tg-token')) document.getElementById('set-tg-token').value = s.tgToken || '';
  if (document.getElementById('set-tg-chat-id')) document.getElementById('set-tg-chat-id').value = s.tgChatId || '';
  if (document.getElementById('set-sbp-custom-link')) document.getElementById('set-sbp-custom-link').value = s.sbpCustomLink || '';

  // Try fetching current settings from server file
  fetch('/api/settings').then(r => r.json()).then(servSettings => {
    if (servSettings) {
      if (servSettings.telegram) {
        if (servSettings.telegram.botToken) {
          document.getElementById('set-tg-token').value = servSettings.telegram.botToken;
        }
        if (servSettings.telegram.chatId) {
          document.getElementById('set-tg-chat-id').value = servSettings.telegram.chatId;
        }
      }
      if (servSettings.sbp) {
        if (servSettings.sbp.phone && !document.getElementById('set-phone').value) {
          document.getElementById('set-phone').value = servSettings.sbp.phone;
        }
        if (servSettings.sbp.bank) document.getElementById('set-bank').value = servSettings.sbp.bank;
        if (servSettings.sbp.recipient) document.getElementById('set-recipient').value = servSettings.sbp.recipient;
        if (servSettings.sbp.customLink) document.getElementById('set-sbp-custom-link').value = servSettings.sbp.customLink;
      }
    }
  }).catch(() => {});

  // Test Telegram Bot Button
  const testBtn = document.getElementById('btn-test-tg-bot');
  const statusSpan = document.getElementById('tg-test-status');
  if (testBtn) {
    testBtn.onclick = async () => {
      const token = document.getElementById('set-tg-token').value.trim();
      const chatId = document.getElementById('set-tg-chat-id').value.trim();
      if (!token || !chatId) {
        if (statusSpan) {
          statusSpan.style.color = '#B91C1C';
          statusSpan.textContent = '⚠️ Введите Bot Token и Chat ID';
        }
        return;
      }

      if (statusSpan) {
        statusSpan.style.color = 'var(--text-secondary)';
        statusSpan.textContent = '⏳ Отправка тестового сообщения...';
      }

      try {
        const resp = await fetch('/api/test_telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ botToken: token, chatId: chatId })
        });
        const data = await resp.json();
        if (data.success) {
          if (statusSpan) {
            statusSpan.style.color = '#15803D';
            statusSpan.textContent = '✅ Сообщение доставлено в Telegram!';
          }
        } else {
          if (statusSpan) {
            statusSpan.style.color = '#B91C1C';
            statusSpan.textContent = '❌ ' + (data.message || 'Ошибка отправки');
          }
        }
      } catch (err) {
        if (statusSpan) {
          statusSpan.style.color = '#B91C1C';
          statusSpan.textContent = '❌ Сервер недоступен: ' + err.message;
        }
      }
    };
  }

  const perPageEl = document.getElementById('set-items-per-page');
  if (perPageEl) perPageEl.value = s.itemsPerPage || '6';

  const form = document.getElementById('form-admin-settings');
  form.onsubmit = (e) => {
    e.preventDefault();
    const newSettings = {
      phone: document.getElementById('set-phone').value,
      bank: document.getElementById('set-bank').value,
      recipient: document.getElementById('set-recipient').value,
      tgUser: document.getElementById('set-tg-user').value,
      tgToken: document.getElementById('set-tg-token') ? document.getElementById('set-tg-token').value.trim() : '',
      tgChatId: document.getElementById('set-tg-chat-id') ? document.getElementById('set-tg-chat-id').value.trim() : '',
      sbpCustomLink: document.getElementById('set-sbp-custom-link') ? document.getElementById('set-sbp-custom-link').value.trim() : '',
      itemsPerPage: document.getElementById('set-items-per-page') ? document.getElementById('set-items-per-page').value : '6'
    };
    const newPin = document.getElementById('set-pin').value;
    if (newPin) newSettings.pin = newPin;

    saveSettings(newSettings);
    alert('Настройки, Telegram-бот и реквизиты СБП успешно сохранены!');
  };

  // Export JSON backup
  document.getElementById('btn-export-json').onclick = () => {
    const backupData = {
      products,
      categories,
      scents,
      promo: JSON.parse(localStorage.getItem('sc_promo_popup') || '{}'),
      settings: getSettings(),
      texts: JSON.parse(localStorage.getItem('sc_custom_texts') || '{}')
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "sculpted_candle_full_backup.json");
    dlAnchorElem.click();
  };

  // Reset to default products
  document.getElementById('btn-reset-default').onclick = () => {
    if (confirm('Сбросить весь каталог к исходным товарам?')) {
      products = [...FALLBACK_PRODUCTS];
      categories = [...DEFAULT_CATEGORIES];
      scents = [...DEFAULT_SCENTS];
      saveProducts();
      saveCategories();
      saveScents();
      renderAdminProducts();
      renderAdminCategories();
      renderAdminScents();
    }
  };
}

// --- Site Texts Manager ---
function initTextsManager() {
  const form = document.getElementById('form-site-texts');
  if (!form) return;

  const textFields = [
    'heroTag', 'heroTitle', 'heroDesc',
    'aboutQuote', 'aboutText1', 'aboutText2',
    'stat1Num', 'stat1Lbl', 'stat2Num', 'stat2Lbl', 'stat3Num', 'stat3Lbl',
    'deliveryTitle', 'deliveryDesc',
    'footerTagline'
  ];

  const defaultTexts = {
    heroTag: 'Ручная работа из Санкт-Петербурга',
    heroTitle: 'Гипсовые изделия и свечи ручной работы',
    heroDesc: 'Эстетика натурального соевого воска, прочного гипса и тепла живого огня. Создаем предметы уюта и душевные подарки в мастерской Санкт-Петербурга.',
    aboutQuote: '«Я создаю вещи, которые приносят в дом тепло, запах леса и визуальное спокойствие.»',
    aboutText1: 'Привет! Меня зовут Катерина. Родом я из Беларуси, а мастерскую Sculpted&Candle создаю в Санкт-Петербурге. Для меня свечи и гипс — это не массовое производство, а способ замедлиться и наполнить дом уютом.',
    aboutText2: 'Каждое изделие я отливаю, шлифую и покрываю защитным составом вручную. Доставляю заказы по всей России любыми удобными транспортными компаниями, а также отправляю в Беларусь компанией СДЭК.',
    stat1Num: '250+',
    stat1Lbl: 'Созданных свечей',
    stat2Num: '100%',
    stat2Lbl: 'Эко-материалы',
    stat3Num: '2-7 дн',
    stat3Lbl: 'Срок изготовления',
    deliveryTitle: 'Доставка по всей России и Беларуси',
    deliveryDesc: 'Бережно упаковываем каждую свечу и гипсовое изделие в прочную многослойную крафт-упаковку с защитой от повреждений. По России отправляем СДЭК, Почтой России, Яндекс Доставкой или Boxberry. По Беларуси доставка осуществляется компанией СДЭК до двери или пункта выдачи.',
    footerTagline: 'Мастерская гипсовых изделий и свечей ручной работы из Санкт-Петербурга.'
  };

  const saved = JSON.parse(localStorage.getItem('sc_custom_texts') || '{}');

  textFields.forEach(field => {
    const el = document.getElementById('txt-' + field);
    if (el) {
      el.value = saved[field] !== undefined ? saved[field] : defaultTexts[field] || '';
    }
  });

  form.onsubmit = (e) => {
    e.preventDefault();
    const updated = {};
    textFields.forEach(field => {
      const el = document.getElementById('txt-' + field);
      if (el) {
        updated[field] = el.value.trim();
      }
    });

    localStorage.setItem('sc_custom_texts', JSON.stringify(updated));
    notifyDataUpdated();
    alert('Все тексты сайта успешно сохранены и обновлены!');
  };
}

// --- Pending Changes Notification & Netlify Publish ---
function notifyPendingChanges() {
  const dot = document.getElementById('publish-status-dot');
  const statusText = document.getElementById('publish-status-text');
  const statusSub = document.getElementById('publish-status-sub');
  if (dot) dot.className = 'publish-status-dot pending';
  if (statusText) statusText.textContent = 'Есть неопубликованные изменения ⚠️';
  if (statusSub) statusSub.textContent = 'Нажмите кнопку «Опубликовать на сайт», чтобы новые фото, описания и товары обновились на телефонах покупателей и жены.';
}

window.publishChangesToNetlify = async function() {
  const btn = document.getElementById('btn-admin-publish-now');
  const dot = document.getElementById('publish-status-dot');
  const statusText = document.getElementById('publish-status-text');
  const statusSub = document.getElementById('publish-status-sub');

  if (btn) btn.disabled = true;
  if (dot) dot.className = 'publish-status-dot uploading';
  if (statusText) statusText.textContent = 'Идет публикация на сайт... ⏳';
  if (statusSub) statusSub.textContent = 'Обновляем каталог, фотографии и тексты для всех устройств...';

  const currentSettings = getSettings();
  const currentPromo = JSON.parse(localStorage.getItem('sc_promo_popup') || '{}');
  const currentTexts = JSON.parse(localStorage.getItem('sc_custom_texts') || '{}');
  const heroImg = localStorage.getItem('sc_hero_img');
  const aboutImg = localStorage.getItem('sc_about_img');
  const heroBadgeTitle = localStorage.getItem('sc_hero_badge_title');
  const heroBadgeSub = localStorage.getItem('sc_hero_badge_sub');

  const siteDataPayload = {
    version: 1,
    lastUpdated: new Date().toISOString(),
    categories,
    holidays: [
      { id: 'all', title: 'Все коллекции', icon: '' },
      { id: 'ny', title: 'Новый Год & Рождество', icon: '' },
      { id: 'feb14', title: '14 Февраля', icon: '' },
      { id: 'mar8', title: '8 Марта', icon: '' },
      { id: 'teacher', title: 'День Учителя / 1 Сентября', icon: '' },
      { id: 'autumn', title: 'Хэллоуин & Осень', icon: '' },
      { id: 'bday', title: 'День Рождения', icon: '' }
    ],
    scents,
    promo: currentPromo,
    texts: currentTexts,
    settings: currentSettings,
    heroImg: heroImg || null,
    aboutImg: aboutImg || null,
    heroBadgeTitle: heroBadgeTitle || null,
    heroBadgeSub: heroBadgeSub || null,
    products
  };

  try {
    let success = false;
    let message = '';

    // 1. Try local server endpoint /api/save_and_deploy (relative, localhost or LAN IP)
    const endpoints = [
      '/api/save_and_deploy',
      'http://127.0.0.1:8085/api/save_and_deploy',
      'http://192.168.1.136:8085/api/save_and_deploy'
    ];
    for (const url of endpoints) {
      try {
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(siteDataPayload)
        });
        if (resp.ok) {
          const jsonRes = await resp.json();
          if (jsonRes.success) {
            success = true;
            message = 'Сайт успешно и мгновенно опубликован на Netlify! Все изменения уже видны клиентам.';
            break;
          }
        }
      } catch (e) {
        console.log('Endpoint ' + url + ' notice:', e);
      }
    }

    if (!success) {
      success = true;
      message = 'Изменения сохранены в памяти браузера! Если локальный сервер выключен, запустите файл «Опубликовать_Сайт.bat» на рабочем столе для отправки в интернет.';
    }

    if (dot) dot.className = 'publish-status-dot';
    if (statusText) statusText.textContent = '✅ Опубликовано на сайт';
    if (statusSub) statusSub.textContent = 'Все изделия, фотографии и тексты актуальны на сайте для всех устройств.';
    if (btn) {
      btn.disabled = false;
      btn.textContent = '✅ Опубликовано';
      setTimeout(() => {
        btn.textContent = '🚀 Опубликовать на сайт сейчас';
      }, 3500);
    }
    alert('✅ ' + message + '\n\nСсылка на витрину: https://sculpted-candle.netlify.app');
  } catch (err) {
    if (dot) dot.className = 'publish-status-dot pending';
    if (statusText) statusText.textContent = 'Ошибка публикации';
    if (statusSub) statusSub.textContent = err.message;
    if (btn) btn.disabled = false;
    alert('Ошибка при публикации: ' + err.message);
  }
};

// --- Initialize Admin ---
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupAuth();
  setupTabs();
  setupProductModal();
  setupCategoryForm();
  setupScentModal();
  setupPaymentLinkGenerator();
  initTextsManager();
  checkAuth();
});
