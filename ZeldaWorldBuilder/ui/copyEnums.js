﻿/**
 * TODOJEF: To generate the images, we have to manually go into Unity and use the Export Sub-Sprites option that was added through a script
 * // Ref: https://stackoverflow.com/a/69829938/1253609
 */
/**
 * TODOJEF: Move this to the API... it should be what it does whenever the UI hits enums
 */
import fs from "fs";
import path from "path";
import glob from "glob";
import { EnumStore } from "./src/classes/EnumStore.js";

const inPath = "../Assets/Scripts/Enums/";
const classesPath = "@/classes/";
const outPath = "src/classes/enums/";

/**
 * This takes a C# enum and turns it into a JSON string
 * @param {String} data
 * @returns {String}
 */
function toEnum(data) {
  let output = "";
  const matches = data.trim().match(/public enum [^}]+}/g);
  matches.forEach((match) => {
    // Get the name of the enum
    const matchName = match.match(/public enum ([^\r{]+)/)[1];
    // Need the trim because there's some sort of zwnbsp character that'll show up
    match = match.trim().replace(/public enum [^{]+/, "")
    // Remove any special descriptions
    // Change = to :
    // Remove any comments
      .replace(/\/\/\/?[^\n]+\n/g, "")
      .replace(/=/g, ":");
    if (match.indexOf("Color(") !== -1) {
      const matches = match.match(/(.*Color\([^)]+.*\r\n)?.*[\w]+[^\r\n]+/g);
      matches.forEach((item) => {
        const color = item.match(/(?:Color\()([^)]+)/)?.[1];
        if (color) {
          const [, prop, propName] = item.match(/\r\n\s*(([^:]+\s*:)\s*\d+)/);
          match = match.replace(prop, `${propName}${color}`);
        }
      });
    }
    match = match.replace(/\[[^\]]+\]\r\n/g, "")
      .replace(/\r\n/g, "");
    // If there are no default values, let's create them
    if (match.indexOf(":") === -1) {
      match = "['" + match.replace(/\s+/g, "").replace(/\{|\}/g, "").split(/([^,]+),/).filter((item) => item).join("','") + "']";
    }
    const parse = match.replace(/'/g, "\"").replace(/[\r\n\s]*/g, "").replace(/(\w+):/g, "\"$1\":");
    const description = new EnumStore(JSON.parse(parse.trim())).toClassDescription();
    output += `${description}\nexport ${`const ${matchName} =`} new EnumStore(${match})`;
  });
  return `import {EnumStore} from "${classesPath}EnumStore.js"\n${output}`;
}

if (fs.existsSync(outPath)) {
  fs.rmSync(outPath, {
    recursive: true,
  });
}
fs.mkdirSync(outPath);
glob(`${inPath}*.cs`, {
  ignore: [`${inPath}EnumExtensions.cs`],
}, (err, files) => {
  for (const file of files) {
    const data = toEnum(fs.readFileSync(file, "utf8"));
    const ext = path.extname(file);
    const baseName = path.basename(file, ext);
    fs.writeFileSync(`${outPath}${baseName}.js`, data, {
      flag: "w+",
    });
  }
});
