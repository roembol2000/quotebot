const Discord = require("discord.js");
const { readFile } = require("fs");

const client = new Discord.Client();
require("dotenv").config();

client.on("ready", async () => {
  console.log(`Started! I'm ${client.user.tag}`);

  const channel = client.channels.cache.get(process.env.CHANNEL);
  const interval = process.env.INTERVAL_IN_SECONDS * 1000;
  const quotes = require("./quotes");

  let previousQuote;

  setInterval(() => {
    if (!channel) {
      console.log("The channel doesn't seem to exist!");
      process.exit(1);
    }

    // Select a quote and make sure the bot doesn't send the quote 2 times in a row.
    let quote;
    while ((quote = quotes[Math.floor(Math.random() * quotes.length)]) == previousQuote) {
      quote = quotes[Math.floor(Math.random() * quotes.length)];
    }

    previousQuote = quote;

    channel.send(`*'${quote}'*`)
  }, interval)
});

client.login(process.env.TOKEN);