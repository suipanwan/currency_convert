const TelegramBot = require('node-telegram-bot-api');
const API = require('./API/cc_API');
const logger = require('./utils/logger');
const token = process.env.TG_BOT_TOKEN;

const bot = new TelegramBot(token, {
  polling: true, 
  request: {},
});

// Matches /start
bot.onText(/\/start/, function onPhotoText(msg) {
  bot.sendMessage(msg.chat.id,'Welcome! Enter any integer to convert~');
});

bot.onText(/[0-9]+/, (msg) => {
  const chatId = msg.chat.id;
  logger.info(`RECEIVE User: ${msg.from.id} ${msg.from.first_name||''} ${msg.from.last_name||''} Msg: ${msg.text}`);
  const in_val = parseFloat(msg.text);
  API.getCAD_HKD().then((rate) => {
    if (rate === false) {
      bot.sendMessage(chatId, 'Error Occured.');
      return;
    }
    const converted_val = (in_val*rate).toFixed(2);
    rt_msg = `${in_val} CAD = ${converted_val} HKD\n\n`;
    rt_msg += `(+13% Tax)\n${(in_val*1.13).toFixed(2)} CAD = ${(converted_val*1.13).toFixed(2)} HKD`;
    logger.info(`RETURN User: ${msg.from.id} ${msg.from.first_name||''} ${msg.from.last_name||''} Rate: ${rate}`);
    bot.sendMessage(chatId, rt_msg);
  });

});

logger.info("Bot Started");