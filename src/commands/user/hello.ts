import { controllerInterface } from "./../../interface/index";
import { Client, Message, MessageEmbed } from "discord.js";
const HelloController: controllerInterface = {
  name: "hello",
  category: "user",
  aliases: ["he"],
  run: async (client: Client<boolean>, message: Message, args: string[]) => {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    const url = member.user.displayAvatarURL();
    const avatarEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setImage(url)
      .setURL(url)
    message.channel.send({ embeds: [avatarEmbed] });
    message.channel.send(`hello ${message.author} you have the good day!`);
  },
};
export default HelloController;
