const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Define a command handler
bot.command('start', (ctx) => {
  const menuOptions = [
    ['За нас'],
    ['Услуги'],
    ['Планове и абонамент'],
    ['Уебсайтове'],
    ['Дигитален маркетинг']
  ];

  const replyMarkup = Markup.keyboard(menuOptions).oneTime().resize();

  ctx.reply('Здравейте, моето име е InnoBot, и съм тук да ви запозная с InnoGrowth. Моля изберете от менюто:', replyMarkup);
});

// Define a message handler for menu selection
bot.hears(['За нас', 'Услуги', 'Планове и абонамент', 'Уебсайтове', 'Дигитален маркетинг'], (ctx) => {
  const selectedOption = ctx.message.text;

  // Perform actions based on the selected option
  if (selectedOption === 'За нас') {
    ctx.reply('Това е информация за нас.');
  } else if (selectedOption === 'Услуги') {
    ctx.reply('Това са нашите услуги.');
  } else if (selectedOption === 'Планове и абонамент') {
    ctx.reply('Тук са нашите планове и абонаменти.');
  } else if (selectedOption === 'Уебсайтове') {
    ctx.reply('Тук е информация за нашите уебсайтове.');
  } else if (selectedOption === 'Дигитален маркетинг') {
    ctx.reply('Тук е информация за дигиталния маркетинг.');
  }

  const replyMarkup = Markup.keyboard([['Да'], ['Не']]).oneTime().resize();

  ctx.reply('Имате ли други въпроси?', replyMarkup);
});

// Define a message handler for handling other questions
bot.hears(['Да'], (ctx) => {
  const menuOptions = [
    ['За нас'],
    ['Услуги'],
    ['Планове и абонамент'],
    ['Уебсайтове'],
    ['Дигитален маркетинг']
  ];

  const replyMarkup = Markup.keyboard(menuOptions).oneTime().resize();

  ctx.reply('С какво е свързан въпросът Ви?', replyMarkup);
});

bot.hears(['Не'], (ctx) => {
  ctx.reply('Благодаря Ви! Желая Ви приятен ден!');
});

bot.on('text', (ctx) => {
  ctx.reply('Моля отговорете с "Да" или "Не".');
});

// Start the bot
bot.launch();
