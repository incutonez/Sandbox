import colorConvert from "color-convert";
import deltaE from "delta-e";
import Jimp from "jimp";
import { ZeldaItems } from "@/enums/ZeldaItems";
import {
	ZeldaEnemies,
	ZeldaEnemiesBubbleBlue,
	ZeldaEnemiesBubbleRed,
	ZeldaEnemiesDarknutBlue,
	ZeldaEnemiesGelBlue,
	ZeldaEnemiesGoriyaBlue,
	ZeldaEnemiesKeeseBlue,
	ZeldaEnemiesKeeseRed, ZeldaEnemiesLanmolaBlue,
	ZeldaEnemiesLeeverBlue,
	ZeldaEnemiesLynelBlue,
	ZeldaEnemiesMoblinBlue,
	ZeldaEnemiesMoldormBlue,
	ZeldaEnemiesOctorokBlue,
	ZeldaEnemiesRopeBlue, ZeldaEnemiesTektiteBlue,
	ZeldaEnemiesWizzrobeBlue, ZeldaEnemiesZolGray, ZeldaEnemiesZolGreen,
} from "@/enums/ZeldaNPCs";
import {
	ZeldaTiles,
	ZeldaTilesCastle,
	ZeldaTilesNone,
	ZeldaTilesSolidColor,
	ZeldaTilesTransition,
} from "@/enums/ZeldaTiles";
import { isEmpty, isString, makeArray, toInt } from "@/utils/common";

type TFormula = "E94" | "E00" | "E76";
type TConvert = "rgb" | "hex" | "lab" | "hsl" | "hsv" | "hwb" | "cmyk" | "xyz" | "lch" | "keyword" | "ansi16" | "ansi256" | "hcg" | "apple" | "gray";

/**
 * @property {String} Tiles
 * @property {String} Enemies
 * @property {String} Items
 */
// export const ImageType = new Enum(["Tiles", "Enemies", "Items"], false);

/**
 * @property {String} E00
 * @property {String} E94
 * @property {String} E76
 */
// export const DeltaFormula = new Enum(["E00", "E94", "E76"], false);

const ImageCache: Record<string, Jimp> = {};
// Taken from https://github.com/turakvlad/replace-color
function getDelta(current: any[], target: any[], formula: TFormula) {
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
function convertColor(from: TConvert, to: TConvert, color: string | string[]) {
	let alpha = 0;
	// If the "from" type is "hex" and the color's string length is 9, it means that we have "ahex" (a hex code with an alpha channel).
	if (from === "hex" && color.length === 9 && isString(color)) {
		// Convert a hex code with an alpha channel to a hex code without it (e.g., "#AABBCCDD" will be converted to "#BBCCDD").
		color = color.slice(0, 1) + color.slice(3);
		// Extract an alpha channel (e.g., "AA" will be extracted from "#AABBCCDD").
		// Convert an alpha channel from a [00, FF] period to a [0, 255] period.
		alpha = toInt(color.slice(1, 3), 16);
	}
	// If the "from" type is "rgb" and the color's array length is 4, it means that we have "rgba" (an rgb code with an alpha channel).
	if (from === "rgb" && color.length === 4) {
		// Convert an alpha channel from a [0, 1] period to a [0, 255] period.
		alpha = Math.round(toInt(color[3]) * 255);
	}
	// This is possible only in case of the "rgb" to "rgb" conversion.
	if (from === to) {
		return [...color, alpha];
	}
	// TODOJEF: FIX AS ANY... this is really an object of each TConvert type
	return [...(colorConvert as any)[from][to](color), alpha];
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
interface IReplaceColor {
	image?: Jimp | string;
	type?: string;
	replaceColors: string[];
	targetColors: string[];
	formula?: TFormula;
	deltaE?: number;
}

export async function replaceColor({ image, type = "Tiles", replaceColors, targetColors, formula = "E00", deltaE = 2.3 }: IReplaceColor) {
	if (isString(image)) {
		// We need to be working with a Jimp object
		image = await getImage({
			name: image,
			type,
		}) as Jimp;
	}
	if (image && !(isEmpty(replaceColors) || isEmpty(targetColors))) {
		replaceColors = makeArray(replaceColors);
		targetColors = makeArray(targetColors);
		const targetLABColors: any[] = [];
		const replaceRGBColors: any[] = [];
		const { bitmap } = image;
		const { data } = bitmap as {data: any};
		targetColors.forEach((color, index) => {
			targetLABColors.push(convertColor("hex", "lab", color));
			replaceRGBColors.push(convertColor("hex", "rgb", replaceColors[index]));
		});
		image.scan(0, 0, bitmap.width, bitmap.height, (x: number, y: number, idx: number) => {
			const currentLABColor: any[] = convertColor("rgb", "lab", [data[idx], data[idx + 1], data[idx + 2]]);

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
		return image.getBase64Async(Jimp.MIME_PNG);
	}
}

export async function loadImages() {
	const promises: Promise<any>[] = [];
	const noTileImage = [ZeldaTilesNone, ZeldaTilesSolidColor, ZeldaTilesTransition, ZeldaTilesCastle];
	const noEnemyImage = [
		ZeldaEnemiesBubbleBlue,
		ZeldaEnemiesBubbleRed,
		ZeldaEnemiesDarknutBlue,
		ZeldaEnemiesGelBlue,
		ZeldaEnemiesGoriyaBlue,
		ZeldaEnemiesKeeseBlue,
		ZeldaEnemiesKeeseRed,
		ZeldaEnemiesLeeverBlue,
		ZeldaEnemiesLynelBlue,
		ZeldaEnemiesMoblinBlue,
		ZeldaEnemiesMoldormBlue,
		ZeldaEnemiesOctorokBlue,
		ZeldaEnemiesRopeBlue,
		ZeldaEnemiesWizzrobeBlue,
		ZeldaEnemiesZolGreen,
		ZeldaEnemiesZolGray,
		ZeldaEnemiesTektiteBlue,
		ZeldaEnemiesLanmolaBlue,
	];
	ZeldaTiles.forEach((tile) => {
		if (noTileImage.indexOf(tile) === -1) {
			promises.push(getImage({
				name: tile.name,
				type: "Tiles",
			}));
		}
	});
	ZeldaItems.forEach(({ value }) => {
		promises.push(getImage({
			name: value,
			type: "Items",
		}));
	});
	ZeldaEnemies.forEach((enemy) => {
		if (noEnemyImage.indexOf(enemy) === -1) {
			promises.push(getImage({
				name: enemy.value,
				type: "Enemies",
			}));
		}
	});
	return Promise.all(promises);
}

// Taken from https://stackoverflow.com/a/49273187/1253609
async function base64ToBuffer(value: string | null) {
	if (!value) {
		return;
	}
	const response = await fetch(value);
	return response.arrayBuffer();
}

export async function getImage({ name = "", type = "Tiles", encode = false }) {
	if (isEmpty(name)) {
		return "";
	}
	const key = `${type}.${name}`;
	let cachedItem = localStorage.getItem(key);
	if (!cachedItem) {
		// TODOJEF: I think I either need to use canvas to load the image or send it to the API to replace
		const image = await Jimp.read(`zelda/${type}/${name}.png`);
		ImageCache[key] = image;
		cachedItem = await image.getBase64Async(Jimp.MIME_PNG);
		// It seems more efficient to cache the Jimp Object and clone it than read it each time
		localStorage.setItem(key, cachedItem);
	}
	if (encode) {
		return cachedItem;
	}
	let found = ImageCache[key];
	// We're probably at a page refresh, and it's been saved in localStorage, but not our Jimp Object cache
	if (!found) {
		const cachedImage = await base64ToBuffer(localStorage.getItem(key));
		found = ImageCache[key] = await Jimp.read(cachedImage as Buffer);
	}
	return found.clone();
}
