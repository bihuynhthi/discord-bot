import { readdirSync } from "fs";
import path from "path";
import { clientInterFace } from "../interface";
import { table } from "table";
var dataLog = [["filename", "status"]];

const handler = (client: clientInterFace) => {
  var dirMain = readdirSync(path.join(__dirname, "../commands/"));
  dirMain.forEach((dir) => {
    var commands = readdirSync(
      path.join(__dirname, `../commands/${dir}/`)
    ).filter((file) => file.endsWith(".ts"));
    for (var file of commands) {
      var pull = require(path.join(
        __dirname,
        `../commands/${dir}/${file}`
      )).default;
      if (pull.name) {
        client.commands.set(pull.name, pull);
        dataLog.push([file, "☑ file status is good"]);
      } else {
        dataLog.push([file, " thieu name"]);
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.map((alias: string) => {
          client.aliases.set(alias, pull.name);
        });
    }
  });
  console.log(table(dataLog));
};
export default handler;
