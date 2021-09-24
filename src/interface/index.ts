import { Client, Collection ,Message} from "discord.js";
export interface dataSendAgain {
  name: string;
  category: string;
  aliases: string[];
  run: (client: Client, message: Message, args: string[]) => Promise<void>;
}
export interface clientInterFace extends Client {
  commands?: Collection<string, dataSendAgain>;
  aliases?: Collection<string, string>;
}
