import { Client, Message } from "discord.js";
import { controllerInterface } from "./../../interface/index";
import { getAudioUrl } from "google-tts-api";
import {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
} from "@discordjs/voice";

const sayController: controllerInterface = {
  name: "say",
  category: "fun",
  aliases: ["s", "speak"],
  run: async (client: Client<boolean>, message: Message, args: string[]) => {
    if (!args[0]) {
      message.channel.send("xin hãy nhập gì đó đẻ bot nói");
      return;
    }
    const stringTalk = args.join(" ");
    if (stringTalk.length > 200) {
      message.channel.send("bot chỉ đọc được dưới 200 kí tự")
      return
    }
    const voiceChannel = message.member.voice;
    if (!voiceChannel.channelId) {
      message.channel.send("bạn phải vào room voice để sử dụng lệnh này");
      return;
    }
    const audioUrl = getAudioUrl(stringTalk, {
      lang: "vi",
      slow: false,
      host: "https://translate.google.com",
    });
    try {
      const player = createAudioPlayer();
      const resource = createAudioResource(
        audioUrl
      );

      const connection = joinVoiceChannel({
        channelId: voiceChannel.channelId,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      player.play(resource);
      connection.subscribe(player);

      // checking for ending, leaving vc if yes

      player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
      });
    } catch (error) {
      console.log(error)
    }
  },
};
export default sayController;
