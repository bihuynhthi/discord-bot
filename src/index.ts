import dotenv from "dotenv";
import discord, { Client, Intents,MessageAttachment } from "discord.js";
import path from "path";
import axios from "axios";
dotenv.config({ path: path.join(__dirname, "./.env") });

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
});
const token = process.env.BOT_KEY;


client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("message", async (message) => {
  const messageData = String(message.content.toLocaleLowerCase());
  if (messageData === "ping") {
    message.channel.send("pong");
  }
  console.log(messageData.indexOf("!searchgoogle "));
  if (messageData.indexOf("!searchgoogle ") >= 0) {
    const messageGoogle = messageData.split(" ").slice(1).join("+");
    var url = `https://vi.wikipedia.org/w/api.php`;

    var PostInfoGet = (
      await axios.get(encodeURI(url), {
        params: {
          action: "query",
          list: "search",
          srsearch: messageGoogle,
          format: "json",
        },
      })
    ).data;
    var dataSend = [];
    for (let index = 0; index < PostInfoGet.query.search.length; index++) {
      const element = PostInfoGet.query.search[index];

      var tempData = element.title.split(" ").join("_");
      const urlSend = `https://vi.wikipedia.org/wiki/${tempData}`;
      dataSend.push(`${element.title} : ${urlSend}`);
    }
    console.log(message.channelId);
    message.channel.send(dataSend.join("\n"));
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(token);
