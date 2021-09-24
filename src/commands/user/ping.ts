import { dataSendAgain } from "./../../interface/index";
import { Client, Message } from "discord.js";
const dataExportPing: dataSendAgain = {
  name: "ping",
  category: "user",
  aliases: ["p"],
  run: async (client: Client<boolean>, message: Message, args: string[]) => {
    message.channel.send("Pong");
  },
};
export default dataExportPing;
