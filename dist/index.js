"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const heroku_awake_1 = __importDefault(require("heroku-awake"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "./.env") });
const port = process.env.PORT || 3000;
const server = (0, express_1.default)();
const url = "https://chat-bot-discord-bihuynhthi.herokuapp.com/";
const bot = () => {
    const client = new discord_js_1.Client({
        intents: [
            discord_js_1.Intents.FLAGS.GUILDS,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            discord_js_1.Intents.FLAGS.GUILD_MESSAGE_TYPING,
            discord_js_1.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        ],
    });
    const token = process.env.BOT_KEY;
    client.on("ready", () => {
        var _a;
        console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
    });
    client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        const messageData = String(message.content.toLocaleLowerCase());
        if (messageData === "ping") {
            message.channel.send("pong");
        }
        console.log(messageData.indexOf("!searchgoogle "));
        if (messageData.indexOf("!searchgoogle ") >= 0) {
            const messageGoogle = messageData.split(" ").slice(1).join("+");
            var url = `https://vi.wikipedia.org/w/api.php`;
            var PostInfoGet = (yield axios_1.default.get(encodeURI(url), {
                params: {
                    action: "query",
                    list: "search",
                    srsearch: messageGoogle,
                    format: "json",
                },
            })).data;
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
    }));
    client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.isCommand())
            return;
        if (interaction.commandName === "ping") {
            yield interaction.reply("Pong!");
        }
    }));
    client.login(token);
};
server.get("/", (req, res) => {
    return res.status(200).send({
        message: "tritranduc is running",
    });
});
server.disable("x-powered-by");
server.listen(port, () => {
    bot();
    (0, heroku_awake_1.default)(url);
    console.log(`🚀 Server is running on port ${port} ✨`);
});
