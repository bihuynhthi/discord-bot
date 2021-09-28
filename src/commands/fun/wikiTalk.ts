import { controllerInterface } from "../../interface/index";
import { Client, Message } from "discord.js";
import { getAudioUrl } from "google-tts-api";
import {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  AudioPlayerStatus,
} from "@discordjs/voice";
import cheerio from "cheerio";
import axios from "axios";
import { encode_utf8 } from "./../../utils/utf-8";
const searchGoogle = async (searchKey: string) => {
  var url = `https://vi.wikipedia.org/w/api.php`;
  try {
    var PostInfoGet = (
      await axios.get(encodeURI(url), {
        params: {
          action: "query",
          list: "search",
          srsearch: searchKey,
          format: "json",
        },
      })
    ).data;
  } catch (error) {
    console.log(error);
    return "don't have the page you want to watch";
  }

  var dataSend = [];
  var dataUrl = [];
  for (let index = 0; index < PostInfoGet.query.search.length; index++) {
    const element = PostInfoGet.query.search[index];

    var tempData = element.title.split(" ").join("_");
    const urlSend = `https://vi.wikipedia.org/wiki/${tempData}`;
    dataSend.push(`${element.title} : ${urlSend}`);
    dataUrl.push(urlSend);
  }
  if (dataSend.length >= 1) {
    return [dataSend.join("\n"), dataUrl];
  } else {
    return ["don't have the page you want to watch", []];
  }
};
const dataExportSearchGoogle: controllerInterface = {
  name: "searchwikitalk",
  category: "fun",
  aliases: ["wikit"],
  run: async (client: Client<boolean>, message: Message, args: string[]) => {
    const searchKey = args.join("+");
    const result = await searchGoogle(searchKey);
    var dataSend = result[0];
    if (result[1][0]) {
      const DataFetch = await axios.get(encode_utf8(result[1][0]));
      var $ = cheerio.load(DataFetch.data);
      var stringTalk = $("#mw-content-text > div.mw-parser-output")
        .text()
        .slice(0, 200);
      var dataTemp = $("#mw-content-text > div.mw-parser-output").text();
      dataSend = dataTemp.slice(0,1900)+'.... and this is the link : '+result[1][0];
    } else {
      var stringTalk = String(result[0]);
    }

    message.channel.send(String(dataSend));
    message.channel.send(String(result[0]));
    if (stringTalk.length > 200) {
      message.channel.send("bot chỉ đọc được dưới 200 kí tự");
      return;
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
      const resource = createAudioResource(audioUrl);

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
      console.log(error);
    }
  },
};
export default dataExportSearchGoogle;
