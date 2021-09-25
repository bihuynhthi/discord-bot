import { controllerInterface } from "./../../interface/index";
import { Client, Message } from "discord.js";
const dataExportPing: controllerInterface = {
  name: "ping",
  category: "user",
  aliases: ["p"],
  run: async (client: Client<boolean>, message: Message, args: string[]) => {
    message.channel.send(`Pong! ${client.ws.ping} ms`);
  },
};
export default dataExportPing;
