const TelegramBot = require('node-telegram-bot-api');

const token = '6833278443:AAGKTZmEriFp2WxY9MycmatlakMMJL2sZQ8';

const bot = new TelegramBot(token, { polling: true, testEnvironment: false });

const todos = {};

bot.onText(/\/add (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];

  if (!todos[chatId]) {
    todos[chatId] = [];
  }
  todos[chatId].push(text);

  bot.sendMessage(chatId, 'Added "' + text + '" to your to-do list.');
});

bot.onText(/\/list/, (msg) => {
  const chatId = msg.chat.id;
  const todoList = todos[chatId];

  let message = 'Your to-do items are:\n';
  todoList.forEach((item, index) => {
    message += `${index + 1}. ${item}\n`;
  });
  bot.sendMessage(chatId, message);
});


// 监听 /delete 命令，返回所有的任务
bot.onText(/\/delete/, (msg) => {
  console.log('??delete');
  const chatId = msg.chat.id;
  const todoList = todos[chatId];
  bot.sendMessage(chatId, 'Click an item to delete:', {
    reply_markup: {
      inline_keyboard: todoList.map((item, index) => [
        {
          text: `${index + 1}. ${item}`,
          callback_data: JSON.stringify({ command: 'delete', index })
        },
      ]),
    },
  });
});

// 监听用户点击
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const data = JSON.parse(callbackQuery.data);
  const chatId = message.chat.id;

  if (data.command === 'delete') {
    const deleted = todos[chatId].splice(data.index, 1);
    bot.answerCallbackQuery(callbackQuery.id, { text: 'Deleted "' + deleted[0] + '" from your to-do list.' });
  }

});
