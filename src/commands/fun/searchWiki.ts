import { controllerInterface } from "../../interface/index";
import { Client, Message } from "discord.js";
import axios from "axios";
import cheerio from "cheerio";
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
const getPageContent = async (url: string) => {
  const DataFetch = await axios.get(encode_utf8(url));
  var $ = cheerio.load(DataFetch.data);
  var stringTalk = $("#mw-content-text > div.mw-parser-output")
    .text()
    .slice(0, 200);
  var dataTemp = $("#mw-content-text > div.mw-parser-output").text();
  return dataTemp.slice(0, 1900) + ".... and this is the link : " + url;
};
const dataExportSearchGoogle: controllerInterface = {
  name: "searchWiki",
  category: "fun",
  aliases: ["wiki"],
  run: async (client: Client<boolean>, message: Message, args: string[]) => {
    const searchKey = args.join("+");
    const result = await searchGoogle(searchKey);
    if (result[1][0]) {
      var pageContent = await getPageContent(String(result[1][0]));
      message.channel.send(pageContent)
    }
    message.channel.send(String(result[0]));
  },
};
export default dataExportSearchGoogle;
