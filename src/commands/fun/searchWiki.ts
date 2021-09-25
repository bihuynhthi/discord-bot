import { controllerInterface } from "../../interface/index";
import { Client, Message } from "discord.js";
import axios from "axios";
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
  for (let index = 0; index < PostInfoGet.query.search.length; index++) {
    const element = PostInfoGet.query.search[index];

    var tempData = element.title.split(" ").join("_");
    const urlSend = `https://vi.wikipedia.org/wiki/${tempData}`;
    dataSend.push(`${element.title} : ${urlSend}`);
  }
  if (dataSend.length >= 1) {
    return dataSend.join("\n");
  } else {
    return "don't have the page you want to watch";
  }
};
const dataExportSearchGoogle: controllerInterface = {
  name: "searchWiki",
  category: "fun",
  aliases: ["wiki"],
  run: async (client: Client<boolean>, message: Message, args: string[]) => {
    const searchKey = args.join("+");
    const result = await searchGoogle(searchKey);
    message.channel.send(result);
  },
};
export default dataExportSearchGoogle;
