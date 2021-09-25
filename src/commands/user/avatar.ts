import { controllerInterface } from "./../../interface/index";
import { Client, Message, MessageEmbed } from "discord.js";

const AvatarController: controllerInterface = {
  name: "avatar",
  category: "user",
  aliases: ["ava"],
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
      .setTitle(`${url ? "Download image here" : "you don't have the avatar"}`);
    message.channel.send({ embeds: [avatarEmbed] });
  },
};
export default AvatarController;
