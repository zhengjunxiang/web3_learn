"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const bot = new grammy_1.Bot("6833278443:AAGKTZmEriFp2WxY9MycmatlakMMJL2sZQ8"); // <-- 把你的 bot token 放在 "" 之间
// 你现在可以在你的 bot 对象 `bot` 上注册监听器。
// 当用户向你的 bot 发送消息时，grammY 将调用已注册的监听器。
// 处理 /start 命令。
bot.command("start", async (ctx) => {
  // 获取聊天 id。
  const chatId = ctx.msg.chat.id;
  // 要回复的文本。
  const text = "I got your message!!!";
  // 发送回复。
  await bot.api.sendMessage(chatId, text);
});

// 处理其他的消息。
bot.on("message", (ctx) => ctx.reply("Got another message!"));

// bot.api.sendMessage(
//   12345,
//   '<b>Hi!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>.',
//   { parse_mode: "HTML" },
// );
// 现在，你已经确定了将如何处理信息，可以开始运行你的 bot。
// 这将连接到 Telegram 服务器并等待消息。
// 启动 bot。
bot.start();