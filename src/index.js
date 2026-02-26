const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const registerCommands = require("./frontend/command");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log("Bot is online.");
});

registerCommands(client);

client.login(process.env.TOKEN);
