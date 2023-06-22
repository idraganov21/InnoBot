const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const express = require('express');

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const app = express();
const bot = new TelegramBot(botToken);
const HEROKU_URL = "https://innobot-117f0c66733c.herokuapp.com/";

// Define a command handler
bot.onText(/^\/start($|\s)/, (msg) => {
  const menuOptions = [
    ['За нас'],
    ['Услуги'],
    ['Планове и абонамент'],
    ['Уебсайтове'],
    ['Дигитален маркетинг']
  ];

  const replyMarkup = {
    keyboard: menuOptions,
    one_time_keyboard: true,
    resize_keyboard: true
  };

  bot.sendMessage(msg.chat.id, 'Здравейте, моето име е InnoBot, и съм тук да ви запозная с InnoGrowth. Моля изберете от менюто:', { reply_markup: replyMarkup });
});

// Define a message handler for menu selection
bot.onText(/^(За нас|Услуги|Планове и абонамент|Уебсайтове|Дигитален маркетинг)$/, (msg, match) => {
  const selectedOption = match[1];

  // Perform actions based on the selected option
  if (selectedOption === 'За нас') {
    bot.sendMessage(msg.chat.id, 'Това не е информация.');
  } else if (selectedOption === 'Услуги') {
    bot.sendMessage(msg.chat.id, 'Това са нашите услуги.');
  } else if (selectedOption === 'Планове и абонамент') {
    bot.sendMessage(msg.chat.id, 'Тук са нашите планове и абонаменти.');
  } else if (selectedOption === 'Уебсайтове') {
    bot.sendMessage(msg.chat.id, 'Тук е информация за нашите уебсайтове.');
  } else if (selectedOption === 'Дигитален маркетинг') {
    bot.sendMessage(msg.chat.id, 'Тук е информация за дигиталния маркетинг.');
  }

  const replyMarkup = {
    keyboard: [['Да'], ['Не']],
    one_time_keyboard: true,
    resize_keyboard: true
  };

  bot.sendMessage(msg.chat.id, 'Имате ли други въпроси?', { reply_markup: replyMarkup });
});

// Define a message handler for handling other questions
bot.onText(/^(Да|Не)$/, (msg, match) => {
  const selectedOption = match[1];

  if (selectedOption === 'Да') {
    const menuOptions = [
      ['За нас'],
      ['Услуги'],
      ['Планове и абонамент'],
      ['Уебсайтове'],
      ['Дигитален маркетинг']
    ];

    const replyMarkup = {
      keyboard: menuOptions,
      one_time_keyboard: true,
      resize_keyboard: true
    };

    bot.sendMessage(msg.chat.id, 'С какво е свързан въпросът Ви?', { reply_markup: replyMarkup });
  } else {
    bot.sendMessage(msg.chat.id, 'Благодаря Ви! Желая Ви приятен ден!');
  }
});


app.use(express.json());

app.post(`/bot${botToken}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start the Express.js server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  bot.setWebHook(`${HEROKU_URL}bot${botToken}`);
  console.log(`Telegram bot is running on port ${port}`);
});
