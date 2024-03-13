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
import { ZeldaTargetColor } from "@/models/ZeldaTargetColor";
import { isEmpty, toInt } from "@/utils/common";

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

interface IReplaceColors {
	image: HTMLImageElement;
	colors: ZeldaTargetColor[];
}

const canvas = document.createElement("canvas");
const HexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

function hexToRgb(hex = "") {
	const result = HexRegex.exec(hex) ?? [];
	return {
		red: toInt(result[1], 16) ?? 0,
		green: toInt(result[2], 16) ?? 0,
		blue: toInt(result[3], 16) ?? 0,
	};
}

export function replaceColors({ image, colors = [] }: IReplaceColors) {
	const ctx = canvas.getContext("2d");
	if (ctx && image) {
		const w = image.naturalWidth;
		const h = image.naturalHeight;
		canvas.height = h;
		canvas.width = w;
		ctx.drawImage(image, 0, 0, w, h);
		const imageData = ctx.getImageData(0, 0, w, h);
		for (const color of colors) {
			if (!color.Value?.id) {
				continue;
			}
			const { red, green, blue } = hexToRgb(color.Value.id as string);
			const { red: redTarget, blue: blueTarget, green: greenTarget } = hexToRgb(color.Target.id as string);
			for (let i = 0; i < imageData.data.length; i += 4) {
				// is this pixel the old rgb?
				if (imageData.data[i] === redTarget &&
					imageData.data[i + 1] === greenTarget &&
					imageData.data[i + 2] === blueTarget
				) {
					// change to your new rgb
					imageData.data[i] = red;
					imageData.data[i + 1] = green;
					imageData.data[i + 2] = blue;
				}
			}
			// We have to make sure we update our target, as it reflects the color we replaced the original with
			color.Target = color.Value;
		}
		ctx.putImageData(imageData, 0, 0);
		image.src = canvas.toDataURL("image/png");
	}
}

// TODOJEF: Potentially preload default images and cache them?
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

export function getImageSrc({ name = "", type = "Tiles" }) {
	return `/zelda/${type}/${name}.png`;
}

export async function getImage({ name = "", type = "Tiles", encode = false }) {
	if (isEmpty(name)) {
		return "";
	}
	const key = `${type}.${name}`;
	let cachedItem = localStorage.getItem(key);
	if (!cachedItem) {
		// TODOJEF: I think I either need to use canvas to load the image or send it to the API to replace
		const image = await Jimp.read(`/zelda/${type}/${name}.png`);
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

