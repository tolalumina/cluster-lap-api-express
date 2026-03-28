require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = 8080;

// Telegram bot setup
const token = process.env.BOT_TOKEN;
const chatId = process.env.MY_CHAT_ID;
const bot = new TelegramBot(token, { polling: true });

// async function to get message
async function getMessage() {
  return `
<u>🔔 Hello from Chatbot's Tola</u>

  <i> Hello my friend </i>
  

`;
}

// async function to send message
async function sendMessageToBot() {
  try {
    const msg = await getMessage();
    await bot.sendMessage(chatId, msg, { parse_mode: "HTML" });
  } catch (err) {
    console.error("Error sending message:", err);
  }
}

// start server
app.listen(PORT, () => {
  console.log("chatbot server is working!");
  sendMessageToBot();
});
