// Netlify Serverless Function for Telegram Order Notifications
// Runs on AWS Europe (bypasses all ISP blocks, 100% uptime)

exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const order = JSON.parse(event.body || "{}");
    const botToken = "8956303885:AAHQglgjEGvUA5lBJ-AvYnDv_Ya-aHHHMNk";
    const targetChatIds = ["6634156130", "701892841"];

    const orderId = order.orderId || ("SC-" + Math.floor(100 + Math.random() * 900));
    const totalAmount = order.total || 0;
    const custName = order.customerName || "Покупатель";
    const custPhone = order.customerPhone || "Не указан";
    const delivery = order.deliveryType || "Уточняется";
    const address = order.deliveryAddress || "г. Санкт-Петербург";
    const comment = order.comment || "";

    let itemsText = "";
    if (Array.isArray(order.items) && order.items.length > 0) {
      itemsText = order.items.map(it => {
        const title = it.title || it.titleRu || "Свеча";
        const price = it.price || 0;
        const scent = it.scent || it.scentRu || "Стандартный";
        const color = it.colors || "Натуральный";
        const finish = it.finish || "матовый";
        return `• <b>«${title}»</b> — ${price} ₽\n  🌸 <i>Аромат:</i> ${scent}\n  🎨 <i>Цвет:</i> ${color}, ${finish}`;
      }).join("\n");
    } else {
      itemsText = `• «Заказ» — ${totalAmount} ₽`;
    }

    let cardMsg = `🕯 <b>НОВЫЙ ЗАКАЗ: #${orderId}</b>\n\n` +
      `👤 <b>Покупатель:</b> ${custName}\n` +
      `📞 <b>Телефон / TG:</b> <code>${custPhone}</code>\n` +
      `🚚 <b>Доставка:</b> ${delivery} (${address})\n`;
    
    if (comment) {
      cardMsg += `💬 <b>Пожелание:</b> ${comment}\n`;
    }
    cardMsg += `\n🛍 <b>Состав заказа:</b>\n${itemsText}\n\n` +
      `💰 <b>ИТОГО К ОПЛАТЕ: ${totalAmount} ₽</b>\n` +
      `⏳ <b>Статус:</b> Ожидает согласования мастером (ссылку на СБП направит Катерина)`;

    let deliveredCount = 0;
    for (const cid of targetChatIds) {
      try {
        const tgResp = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: cid,
            text: cardMsg,
            parse_mode: "HTML",
            disable_web_page_preview: true
          })
        });
        const tgData = await tgResp.json();
        if (tgData && tgData.ok) {
          deliveredCount++;
        }
      } catch (tgErr) {
        console.error("TG send error to " + cid, tgErr);
      }
    }

    const payUrl = `pay.html?order=${orderId}&amount=${totalAmount}&desc=${encodeURIComponent("Заказ #" + orderId)}&client=${encodeURIComponent(custName)}`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        orderId,
        payUrl,
        deliveredCount,
        tgSent: deliveredCount > 0
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: err.toString() })
    };
  }
};
