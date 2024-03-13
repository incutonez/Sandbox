import { Allow, IsArray, IsObject, IsString } from "class-validator";
import { getNameById } from "@/enums/helper";
import {
	ZeldaTiles,
	ZeldaTilesBlock, ZeldaTilesBush,
	ZeldaTilesCastleBottomLeft,
	ZeldaTilesCastleBottomRight,
	ZeldaTilesCastleSand,
	ZeldaTilesCastleTop,
	ZeldaTilesCastleTopAlt,
	ZeldaTilesCastleTopLeft,
	ZeldaTilesCastleTopLeftAlt,
	ZeldaTilesCastleTopRight,
	ZeldaTilesCastleTopRightAlt,
	ZeldaTilesDock,
	ZeldaTilesDoor,
	ZeldaTilesDoorClosedX,
	ZeldaTilesDoorClosedY,
	ZeldaTilesDoorLockedX,
	ZeldaTilesDoorLockedY,
	ZeldaTilesDoorUnlockedX,
	ZeldaTilesDoorUnlockedY,
	ZeldaTilesFire,
	ZeldaTilesFireAlt,
	ZeldaTilesGrave,
	ZeldaTilesGroundTile,
	ZeldaTilesNone,
	ZeldaTilesPondBottom,
	ZeldaTilesPondBottomLeft,
	ZeldaTilesPondBottomRight,
	ZeldaTilesPondCenter,
	ZeldaTilesPondCenterLeft, ZeldaTilesPondCenterRight,
	ZeldaTilesPondTop,
	ZeldaTilesPondTopLeft,
	ZeldaTilesPondTopRight,
	ZeldaTilesSandBottom,
	ZeldaTilesSandCenter,
	ZeldaTilesStairsKeep,
	ZeldaTilesStairsUp,
	ZeldaTilesStatue,
	ZeldaTilesStatue1,
	ZeldaTilesStatue2,
	ZeldaTilesTransition,
	ZeldaTilesTreeBottomRight,
	ZeldaTilesTreeTopLeft,
	ZeldaTilesWallHoleX,
	ZeldaTilesWallHoleY,
	ZeldaTilesWallKeep,
	ZeldaTilesWallLeftX,
	ZeldaTilesWallLeftY,
	ZeldaTilesWallLeftYFlip,
	ZeldaTilesWallRightX,
	ZeldaTilesWallRightY,
	ZeldaTilesWallRightYFlip,
	ZeldaTilesWallX,
	ZeldaTilesWallY,
	ZeldaTilesWater,
	ZeldaTilesWaterBottomLeft,
	ZeldaTilesWaterBottomRight,
	ZeldaTilesWaterTopLeft,
	ZeldaTilesWaterTopRight,
} from "@/enums/ZeldaTiles";
import {
	ZeldaWorldColorsBlack,
	ZeldaWorldColorsBluePure,
	ZeldaWorldColorsRedPure, ZeldaWorldColorsWhite,
	ZeldaWorldColorsWhitePure,
} from "@/enums/ZeldaWorldColors";
import { ModelTransform } from "@/models/decorators";
import { ModelInterface, ViewModel } from "@/models/ViewModel";
import { ZeldaScreen } from "@/models/ZeldaScreen";
import { ZeldaTargetColor } from "@/models/ZeldaTargetColor";
import { ZeldaTileCell } from "@/models/ZeldaTileCell";
import { IZeldaWorldObjectConfig } from "@/models/ZeldaWorldObject";
import { type IOption } from "@/types/components";
import { isEmpty } from "@/utils/common";
import { getImageSrc, replaceColors } from "@/utils/zelda";

const TransitionTypes = [ZeldaTilesTransition, ZeldaTilesDoor];
function makeTargets(item: IOption, Value?: IOption) {
	return ZeldaTargetColor.create({
		Value,
		Target: item,
	});
}
/**
 * TODOJEF: I really should standardize these colors
 * - 1 color => White
 * - 2 colors => White, Black
 * - 3 colors => White, Black, Blue
 * - 4 colors => White, Black, Blue, Red
 */
const WhiteBlueRed = [ZeldaWorldColorsWhitePure, ZeldaWorldColorsBluePure, ZeldaWorldColorsRedPure];
const WhiteBlackBlueRed = [ZeldaWorldColorsWhitePure, ZeldaWorldColorsBlack, ZeldaWorldColorsBluePure, ZeldaWorldColorsRedPure];
const FireOuterFireInnerWhite = [ZeldaWorldColorsBlack, ZeldaWorldColorsBluePure, ZeldaWorldColorsWhitePure];
const WhiteBlueBlack = [ZeldaWorldColorsWhitePure, ZeldaWorldColorsBluePure, ZeldaWorldColorsBlack];
const WhiteRedBlack = [ZeldaWorldColorsWhitePure, ZeldaWorldColorsRedPure, ZeldaWorldColorsBlack];
const White = [ZeldaWorldColorsWhitePure];
const WhiteBlue = [ZeldaWorldColorsWhitePure, ZeldaWorldColorsBluePure];
const WhiteBlack = [ZeldaWorldColorsWhitePure, ZeldaWorldColorsBlack];

export function getDefaultTileColors(type: IOption) {
	let colors: IOption[] = [];
	switch (type) {
		// TODOJEF: Add color change for these?
		case ZeldaTilesStairsKeep:
		case ZeldaTilesWallKeep:
		case ZeldaTilesTransition:
		case ZeldaTilesNone:
			break;
		case ZeldaTilesBlock:
		case ZeldaTilesCastleSand:
		case ZeldaTilesDoorClosedY:
		case ZeldaTilesDoorClosedX:
		case ZeldaTilesDoorUnlockedX:
		case ZeldaTilesDoorUnlockedY:
		case ZeldaTilesDoorLockedX:
		case ZeldaTilesDoorLockedY:
		case ZeldaTilesStatue1:
		case ZeldaTilesStatue2:
		case ZeldaTilesWallLeftX:
		case ZeldaTilesWallLeftY:
		case ZeldaTilesWallLeftYFlip:
		case ZeldaTilesWallRightX:
		case ZeldaTilesWallRightY:
		case ZeldaTilesWallRightYFlip:
		case ZeldaTilesWallX:
		case ZeldaTilesWallY:
			colors = WhiteBlueRed;
			break;
		case ZeldaTilesWallHoleX:
		case ZeldaTilesWallHoleY:
			colors = WhiteBlackBlueRed;
			break;
		case ZeldaTilesFire:
		case ZeldaTilesFireAlt:
			colors = FireOuterFireInnerWhite;
			break;
		case ZeldaTilesCastleBottomLeft:
		case ZeldaTilesCastleBottomRight:
		case ZeldaTilesCastleTop:
		case ZeldaTilesCastleTopAlt:
		case ZeldaTilesCastleTopLeftAlt:
		case ZeldaTilesCastleTopRightAlt:
		case ZeldaTilesCastleTopLeft:
		case ZeldaTilesCastleTopRight:
		case ZeldaTilesDock:
		case ZeldaTilesGrave:
		case ZeldaTilesStairsUp:
		case ZeldaTilesStatue:
		case ZeldaTilesTreeBottomRight:
		case ZeldaTilesTreeTopLeft:
		case ZeldaTilesWater:
		case ZeldaTilesWaterTopLeft:
		case ZeldaTilesWaterTopRight:
		case ZeldaTilesWaterBottomLeft:
		case ZeldaTilesWaterBottomRight:
			colors = WhiteBlueBlack;
			break;
		case ZeldaTilesGroundTile:
			colors = WhiteRedBlack;
			break;
		case ZeldaTilesDoor:
			colors = [[ZeldaWorldColorsWhite, ZeldaWorldColorsBlack]];
			break;
		case ZeldaTilesSandBottom:
		case ZeldaTilesSandCenter:
			colors = White;
			break;
		case ZeldaTilesPondBottom:
		case ZeldaTilesPondBottomLeft:
		case ZeldaTilesPondBottomRight:
		case ZeldaTilesPondTop:
		case ZeldaTilesPondTopLeft:
		case ZeldaTilesPondTopRight:
		case ZeldaTilesPondCenter:
		case ZeldaTilesPondCenterLeft:
		case ZeldaTilesPondCenterRight:
			colors = WhiteBlue;
			break;
		case ZeldaTilesBush:
		default:
			colors = WhiteBlack;
			break;
	}
	return colors.map((target) => {
		let value: IOption | undefined;
		if (Array.isArray(target)) {
			value = target[1];
			target = target[0];
		}
		return makeTargets(target, value);
	});
}

export interface IZeldaTileConfig extends IZeldaWorldObjectConfig {
	Name?: string;
	Transition?: ModelInterface<ZeldaScreen>;
}

export interface IZeldaTileMeta {
	Children: IZeldaTileConfig[];
	Type: string;
}

// TODOJEF: This class shares a lot with ZeldaWorldObject, so we should consider refactoring to use that
export class ZeldaTile extends ViewModel {
	@IsObject()
	image = document.createElement("img");

	@IsString()
	src? = "";

	@ModelTransform(() => ZeldaTileCell)
	cell?: ZeldaTileCell;

	// TODOJEF: Make this a proper enum?
	@IsObject()
	type: IOption = ZeldaTilesNone;

	@IsArray()
	@ModelTransform(() => ZeldaTargetColor)
	colors: ZeldaTargetColor[] = [];

	@ModelTransform(() => ZeldaScreen)
	Transition?: ZeldaScreen;

	@Allow()
	TileType?: IOption;

	reset() {
		this.Type = ZeldaTilesNone;
		this.Transition = ZeldaScreen.create();
	}

	get isDoor() {
		return this.Type === ZeldaTilesDoor;
	}

	get isTransition() {
		return TransitionTypes.indexOf(this.Type) !== -1;
	}

	/**
   * This is intentionally not a true getter because of https://stackoverflow.com/q/28950760/1253609
   */
	get Type() {
		return this.type;
	}

	/**
   * This is a little tricky... we call an underlying method because we don't want to have to
   * make a custom setter in our sub-class... we just want to override the logic that is used.  This
   * is due to having to redefine both the set AND get if you change one or the other.
   * Ref: https://stackoverflow.com/q/28950760/1253609
   */
	set Type(value: IOption) {
		this.type = value;
		this.updateSrc();
		if (this.isTransition) {
			this.Transition = ZeldaScreen.create({
				X: 0,
				Y: 0,
			});
		}
	}

	set Colors(colors) {
		this.colors = colors;
		this.updateImage();
	}

	get Colors() {
		return this.colors;
	}

	updateSrc() {
		const name = this.getImageKey();
		let src = "";
		if (this.hasImage()) {
			src = getImageSrc({
				name,
			});
		}
		this.image.onload = () => {
			/* Make sure we unset this because we're about to be updating the image when colors change, and we don't want this
			 * to be called infinitely */
			this.image.onload = null;
			this.Colors = getDefaultTileColors(this.type);
		};
		this.image.src = src;
	}

	getTypeKey() {
		return getNameById(ZeldaTiles, this.Type.id)?.replace("ZeldaTiles", "");
	}

	hasImage() {
		return this.Type !== ZeldaTilesNone;
	}

	updateImage() {
		if (this.hasImage()) {
			replaceColors({
				colors: this.Colors,
				image: this.image,
			});
		}
	}

	/**
   * The image key is slightly different when we're dealing with a Transition, as we need to use the
   * Transparent image instead.
   * We have this method in here, so it can be overridden in sub-classes, like in Cell
   */
	getImageKey() {
		return this.isTransition ? "Transparent" : this.getTypeKey();
	}

	getColors(flatten = false) {
		const colors = this.Colors.filter((color) => !!color.Value);
		if (flatten) {
			return colors.reduce((value: string[], color) => {
				const config = color.getConfig();
				if (config) {
					value = value.concat(config);
				}
				return value;
			}, []);
		}
		return colors;
	}

	getConfig() {
		const { cell = ZeldaTileCell.create() } = this;
		const config: IZeldaTileConfig = {
			X: cell.x,
			Y: cell.y,
		};
		const { Name } = cell;
		if (Name) {
			config.Name = Name;
		}
		const colors = this.getColors(true);
		if (!isEmpty(colors)) {
			config.Colors = colors as string[];
		}
		if (this.isTransition) {
			const removeFields = [];
			const transition = this.Transition?.get<ModelInterface<ZeldaScreen>>({
				exclude: [
					"AccentColor",
					"GroundColor",
					"cells",
					"totalRows",
					"totalColumns",
				],
			}) ?? ZeldaScreen.create();
			if (isEmpty(transition.Template)) {
				removeFields.push("Template");
			}
			if (!transition.IsCastle) {
				removeFields.push("IsCastle");
			}
			if (!transition.IsFloating) {
				removeFields.push("IsFloating");
			}
			if (this.isDoor) {
				transition.Name ??= `${transition.Template}${transition.X}${transition.Y}`;
			}
			else {
				removeFields.push("Name");
			}
			removeFields.forEach((field) => delete transition[field as keyof typeof transition]);
			config.Transition = transition;
		}
		return config;
	}
}
