import { isEmpty } from "ui/utilities.js";
import { read, MIME_PNG } from "jimp/browser/lib/jimp.js";
import colorConvert from "color-convert";
import deltaE from "delta-e";
import {
  Enum,
  isString,
  makeArray,
} from "@incutonez/shared";
import { Tiles } from "ui/classes/enums/Tiles.js";
import { Items } from "ui/classes/enums/Items.js";
import { Enemies } from "ui/classes/enums/NPCs.js";

/**
 * @property {String} Tiles
 * @property {String} Enemies
 * @property {String} Items
 */
export const ImageType = new Enum(["Tiles", "Enemies", "Items"], false);
/**
* @property {String} E00
* @property {String} E94
* @property {String} E76
*/
export const DeltaFormula = new Enum(["E00", "E94", "E76"], false);

const ImageCache = {};
// Taken from https://github.com/turakvlad/replace-color
function getDelta(current, target, formula) {
  return deltaE[`getDelta${formula}`]({
    L: current[0],
    A: current[1],
    B: current[2],
  }, {
    L: target[0],
    A: target[1],
    B: target[2],
  });
}

// Taken from https://github.com/turakvlad/replace-color
function convertColor(from, to, color) {
  let alpha = null;
  // If the "from" type is "hex" and the color's string length is 9, it means that we have "ahex" (a hex code with an alpha channel).
  if (from === "hex" && color.length === 9) {
    // Extract an alpha channel (e.g., "AA" will be extracted from "#AABBCCDD").
    alpha = color.slice(1, 3);
    // Convert a hex code with an alpha channel to a hex code without it (e.g., "#AABBCCDD" will be converted to "#BBCCDD").
    color = color.slice(0, 1) + color.slice(3);
    // Convert an alpha channel from a [00, FF] period to a [0, 255] period.
    alpha = parseInt(alpha, 16);
  }
  // If the "from" type is "rgb" and the color's array length is 4, it means that we have "rgba" (an rgb code with an alpha channel).
  if (from === "rgb" && color.length === 4) {
    // Extract an alpha channel.
    alpha = color.pop();
    // Convert an alpha channel from a [0, 1] period to a [0, 255] period.
    alpha = Math.round(alpha * 255);
  }
  // This is possible only in case of the "rgb" to "rgb" conversion.
  if (from === to) {
    return [...color, alpha];
  }
  return [...colorConvert[from][to](color), alpha];
}

/**
 * This function is a modified version of https://github.com/turakvlad/replace-color
 * The replace-color package only works for Node, and I needed a browser version as well as
 * something that did multiple color replacement.
 * @param {Jimp} image
 * @param {String} type
 * @param {String[]} replaceColors
 * @param {String[]} targetColors
 * @param {String} formula
 * @param deltaE
 * @returns {Promise<string>}
 */
export async function replaceColor({ image, type = ImageType.Tiles, replaceColors, targetColors, formula = DeltaFormula.E00, deltaE = 2.3 }) {
  if (isString(image)) {
    // We need to be working with a Jimp object
    image = await getImage({
      name: image,
      type,
    });
  }
  if (!(isEmpty(replaceColors) || isEmpty(targetColors))) {
    replaceColors = makeArray(replaceColors);
    targetColors = makeArray(targetColors);
    const targetLABColors = [];
    const replaceRGBColors = [];
    const { bitmap } = image;
    const { data } = bitmap;
    targetColors.forEach((color, index) => {
      targetLABColors.push(convertColor("hex", "lab", color));
      replaceRGBColors.push(convertColor("hex", "rgb", replaceColors[index]));
    });
    image.scan(0, 0, bitmap.width, bitmap.height, (x, y, idx) => {
      const currentLABColor = convertColor(
        "rgb",
        "lab",
        [data[idx], data[idx + 1], data[idx + 2]],
      );

      for (let i = 0; i < targetLABColors.length; i++) {
        const targetLABColor = targetLABColors[i];
        const replaceRGBColor = replaceRGBColors[i];
        if (getDelta(currentLABColor, targetLABColor, formula) <= deltaE) {
          data[idx] = replaceRGBColor[0];
          data[idx + 1] = replaceRGBColor[1];
          data[idx + 2] = replaceRGBColor[2];
          if (replaceRGBColor[3] !== null) {
            data[idx + 3] = replaceRGBColor[3];
          }
          break;
        }
      }
    });
  }
  return image.getBase64Async(MIME_PNG);
}

export async function loadImages() {
  const promises = [];
  const noTileImage = [Tiles.None, Tiles.SolidColor, Tiles.Transition, Tiles.Castle];
  const noEnemyImage = [Enemies.BubbleBlue,
    Enemies.BubbleRed,
    Enemies.DarknutBlue,
    Enemies.GelBlue,
    Enemies.GoriyaBlue,
    Enemies.KeeseBlue,
    Enemies.KeeseRed,
    Enemies.LeeverBlue,
    Enemies.LynelBlue,
    Enemies.MoblinBlue,
    Enemies.MoldormBlue,
    Enemies.OctorokBlue,
    Enemies.RopeBlue,
    Enemies.WizzrobeBlue,
    Enemies.ZolGreen,
    Enemies.ZolGray,
    Enemies.TektiteBlue,
    Enemies.LanmolaBlue];
  Tiles.forEach(({ value, id }) => {
    if (noTileImage.indexOf(id) === -1) {
      promises.push(getImage({
        name: value,
        type: ImageType.Tiles,
      }));
    }
  });
  Items.forEach(({ value }) => {
    promises.push(getImage({
      name: value,
      type: ImageType.Items,
    }));
  });
  Enemies.forEach(({ value, id }) => {
    if (noEnemyImage.indexOf(id) === -1) {
      promises.push(getImage({
        name: value,
        type: ImageType.Enemies,
      }));
    }
  });
  return Promise.all(promises);
}

// Taken from https://stackoverflow.com/a/49273187/1253609
async function base64ToBuffer(value) {
  return await (await fetch(value)).arrayBuffer();
}

export async function getImage({ name, type = ImageType.Tiles, encode = false }) {
  if (isEmpty(name)) {
    return "";
  }
  const key = `${type}.${name}`;
  let found = localStorage.getItem(key);
  if (!found) {
    found = await read({
      url: `${type}/${name}.png`,
    });
    ImageCache[key] = found;
    found = await found.getBase64Async(MIME_PNG);
    // It seems more efficient to cache the Jimp Object and clone it than read it each time
    localStorage.setItem(key, found);
  }
  if (encode) {
    return found;
  }
  found = ImageCache[key];
  // We're probably at a page refresh, and it's been saved in localStorage, but not our Jimp Object cache
  if (!found) {
    found = ImageCache[key] = await read(await base64ToBuffer(localStorage.getItem(key)));
  }
  return found.clone();
}
