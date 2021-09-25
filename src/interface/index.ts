import { Client, Collection, Message } from "discord.js";
export interface controllerInterface {
  name: string;
  category: string;
  aliases: string[];
  run: (client: Client, message: Message, args: string[]) => Promise<void>;
  description?: string;
  usage?:string
}
export interface clientInterFace extends Client {
  commands?: Collection<string, controllerInterface>;
  aliases?: Collection<string, string>;
}
