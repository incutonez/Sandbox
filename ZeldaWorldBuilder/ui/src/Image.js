import { isEmpty } from "ui/utilities.js";
import { read, MIME_PNG } from "jimp/browser/lib/jimp.js";
import colorConvert from "color-convert";
import deltaE from "delta-e";

const imageCache = {};

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

export async function replaceColor({ image, replaceColors, targetColors, formula = "E00", deltaE = 2.3 }) {
  if (typeof image === "string") {
    // We need to be working with a Jimp object
    image = await getImage(image);
  }

  if (replaceColors && targetColors) {
    if (!Array.isArray(replaceColors)) {
      replaceColors = [replaceColors];
    }

    if (!Array.isArray(targetColors)) {
      targetColors = [targetColors];
    }

    const colors = [];
    targetColors.forEach((color, index) => {
      colors.push({
        type: "hex",
        targetColor: color,
        replaceColor: replaceColors[index],
      });
    });
    const targetLABColors = [];
    const replaceRGBColors = [];
    colors.forEach((color) => {
      targetLABColors.push(convertColor(color.type, "lab", color.targetColor));
      replaceRGBColors.push(convertColor(color.type, "rgb", color.replaceColor));
    });

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      const currentLABColor = convertColor(
        "rgb",
        "lab",
        [image.bitmap.data[idx], image.bitmap.data[idx + 1], image.bitmap.data[idx + 2]],
      );

      for (let i = 0; i < targetLABColors.length; i++) {
        const targetLABColor = targetLABColors[i];
        const replaceRGBColor = replaceRGBColors[i];
        if (getDelta(currentLABColor, targetLABColor, formula) <= deltaE) {
          image.bitmap.data[idx] = replaceRGBColor[0];
          image.bitmap.data[idx + 1] = replaceRGBColor[1];
          image.bitmap.data[idx + 2] = replaceRGBColor[2];
          if (replaceRGBColor[3] !== null) {
            image.bitmap.data[idx + 3] = replaceRGBColor[3];
          }

          break;
        }
      }
    });
  }
  return image.getBase64Async(MIME_PNG);
}

export async function getImage(name, base64 = false) {
  if (isEmpty(name)) {
    return "";
  }

  let found = imageCache[name];
  if (!found) {
    found = await read({
      url: `/Tiles/${name}.png`,
    });
    imageCache[name] = found;
  }
  return base64 ? found.getBase64Async(MIME_PNG) : found.clone();
}
