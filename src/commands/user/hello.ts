import { controllerInterface } from "./../../interface/index";
import { Client, Message } from "discord.js";
const HelloController: controllerInterface = {
    name: "hello",
    category: "user",
    aliases: ["he"],
    run: async (client: Client<boolean>, message: Message, args: string[]) => {
        console.log(message.channel)
        message.channel.send(`hello ${message.author} you have the good day!`)
    }
};
export default HelloController
