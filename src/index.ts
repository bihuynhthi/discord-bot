import dotenv from "dotenv";
import { Client, Intents, Collection } from "discord.js";
import path from "path";
import axios from "axios";
import express from "express";
import herokuAwake from "heroku-awake";
dotenv.config({ path: path.join(__dirname, "./.env") });
import { clientInterFace } from "./interface";
import handler from "./handlers/commands";

const port = process.env.PORT || 4000;
const server = express();
const url = "https://chat-bot-discord-bihuynhthi.herokuapp.com/";
const bot = (): void => {
  const client: clientInterFace = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MESSAGE_TYPING,
      Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    ],
  });
  const token = process.env.BOT_KEY;
  console.log(token);

  client.on("ready", () => {
    console.log(`Logged in as ${client.user?.tag}!`);
  });

  client.commands = new Collection();
  client.aliases = new Collection();
  ["commands"].forEach((han) => {
    handler(client);
  });
  client.on("message", async (message) => {
    if (message.author.bot) return;
    const prefix = "!";
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(" ");
    const cmd = args.shift().toLowerCase();
    console.log(cmd);
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args);
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  });

  client.login(token);
};
server.get("/", (req: express.Request, res: express.Response) => {
  return res.status(200).send({
    message: "tritranduc is running",
  });
});

server.disable("x-powered-by");
server.listen(port, () => {
  bot();
  herokuAwake(url);
  console.log(`🚀 Server is running on port ${port} ✨`);
});
