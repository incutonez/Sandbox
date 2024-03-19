import { Allow, IsArray, IsObject, IsString } from "class-validator";
import { getNameById } from "@/enums/helper";
import {
	Tiles,
	TilesBlock, TilesBush,
	TilesCastleBottomLeft,
	TilesCastleBottomRight,
	TilesCastleSand,
	TilesCastleTop,
	TilesCastleTopAlt,
	TilesCastleTopLeft,
	TilesCastleTopLeftAlt,
	TilesCastleTopRight,
	TilesCastleTopRightAlt,
	TilesDock,
	TilesDoor,
	TilesDoorClosedX,
	TilesDoorClosedY,
	TilesDoorLockedX,
	TilesDoorLockedY,
	TilesDoorUnlockedX,
	TilesDoorUnlockedY,
	TilesFire,
	TilesFireAlt,
	TilesGrave,
	TilesGroundTile,
	TilesNone,
	TilesPondBottom,
	TilesPondBottomLeft,
	TilesPondBottomRight,
	TilesPondCenter,
	TilesPondCenterLeft, TilesPondCenterRight,
	TilesPondTop,
	TilesPondTopLeft,
	TilesPondTopRight,
	TilesSandBottom,
	TilesSandCenter,
	TilesStairsKeep,
	TilesStairsUp,
	TilesStatue,
	TilesStatue1,
	TilesStatue2,
	TilesTransition,
	TilesTreeBottomRight,
	TilesTreeTopLeft,
	TilesWallHoleX,
	TilesWallHoleY,
	TilesWallKeep,
	TilesWallLeftX,
	TilesWallLeftY,
	TilesWallLeftYFlip,
	TilesWallRightX,
	TilesWallRightY,
	TilesWallRightYFlip,
	TilesWallX,
	TilesWallY,
	TilesWater,
	TilesWaterBottomLeft,
	TilesWaterBottomRight,
	TilesWaterTopLeft,
	TilesWaterTopRight,
} from "@/enums/zelda/Tiles";
import {
	WorldColorsBlack,
	WorldColorsBluePure,
	WorldColorsRedPure, WorldColorsWhite,
	WorldColorsWhitePure,
} from "@/enums/zelda/WorldColors";
import { ModelTransform } from "@/models/decorators";
import { ModelInterface, ViewModel } from "@/models/ViewModel";
import { ZeldaScreen } from "@/models/ZeldaScreen";
import { ZeldaTargetColor } from "@/models/ZeldaTargetColor";
import { ZeldaTileCell } from "@/models/ZeldaTileCell";
import { IZeldaWorldObjectConfig } from "@/models/ZeldaWorldObject";
import { type IZeldaEnum } from "@/types/components";
import { isEmpty } from "@/utils/common";
import { replaceColors } from "@/utils/zelda";

const TransitionTypes = [TilesTransition, TilesDoor];
function makeTargets(item: IZeldaEnum, Value?: IZeldaEnum) {
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
const WhiteBlueRed = [WorldColorsWhitePure, WorldColorsBluePure, WorldColorsRedPure];
const WhiteBlackBlueRed = [WorldColorsWhitePure, WorldColorsBlack, WorldColorsBluePure, WorldColorsRedPure];
const FireOuterFireInnerWhite = [WorldColorsBlack, WorldColorsBluePure, WorldColorsWhitePure];
const WhiteBlueBlack = [WorldColorsWhitePure, WorldColorsBluePure, WorldColorsBlack];
const WhiteRedBlack = [WorldColorsWhitePure, WorldColorsRedPure, WorldColorsBlack];
const White = [WorldColorsWhitePure];
const WhiteBlue = [WorldColorsWhitePure, WorldColorsBluePure];
const WhiteBlack = [WorldColorsWhitePure, WorldColorsBlack];

export function getDefaultTileColors(type: IZeldaEnum) {
	let colors: IZeldaEnum[] = [];
	switch (type) {
		// TODOJEF: Add color change for these?
		case TilesStairsKeep:
		case TilesWallKeep:
		case TilesTransition:
		case TilesNone:
			break;
		case TilesBlock:
		case TilesCastleSand:
		case TilesDoorClosedY:
		case TilesDoorClosedX:
		case TilesDoorUnlockedX:
		case TilesDoorUnlockedY:
		case TilesDoorLockedX:
		case TilesDoorLockedY:
		case TilesStatue1:
		case TilesStatue2:
		case TilesWallLeftX:
		case TilesWallLeftY:
		case TilesWallLeftYFlip:
		case TilesWallRightX:
		case TilesWallRightY:
		case TilesWallRightYFlip:
		case TilesWallX:
		case TilesWallY:
			colors = WhiteBlueRed;
			break;
		case TilesWallHoleX:
		case TilesWallHoleY:
			colors = WhiteBlackBlueRed;
			break;
		case TilesFire:
		case TilesFireAlt:
			colors = FireOuterFireInnerWhite;
			break;
		case TilesCastleBottomLeft:
		case TilesCastleBottomRight:
		case TilesCastleTop:
		case TilesCastleTopAlt:
		case TilesCastleTopLeftAlt:
		case TilesCastleTopRightAlt:
		case TilesCastleTopLeft:
		case TilesCastleTopRight:
		case TilesDock:
		case TilesGrave:
		case TilesStairsUp:
		case TilesStatue:
		case TilesTreeBottomRight:
		case TilesTreeTopLeft:
		case TilesWater:
		case TilesWaterTopLeft:
		case TilesWaterTopRight:
		case TilesWaterBottomLeft:
		case TilesWaterBottomRight:
			colors = WhiteBlueBlack;
			break;
		case TilesGroundTile:
			colors = WhiteRedBlack;
			break;
		case TilesDoor:
			colors = [[WorldColorsWhite, WorldColorsBlack]];
			break;
		case TilesSandBottom:
		case TilesSandCenter:
			colors = White;
			break;
		case TilesPondBottom:
		case TilesPondBottomLeft:
		case TilesPondBottomRight:
		case TilesPondTop:
		case TilesPondTopLeft:
		case TilesPondTopRight:
		case TilesPondCenter:
		case TilesPondCenterLeft:
		case TilesPondCenterRight:
			colors = WhiteBlue;
			break;
		case TilesBush:
		default:
			colors = WhiteBlack;
			break;
	}
	return colors.map((target) => {
		let value: IZeldaEnum | undefined;
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
	@IsString()
	src? = "";

	@ModelTransform(() => ZeldaTileCell)
	cell?: ZeldaTileCell;

	// TODOJEF: Make this a proper enum?
	@IsObject()
	type: IZeldaEnum = {};

	@IsArray()
	@ModelTransform(() => ZeldaTargetColor)
	colors: ZeldaTargetColor[] = [];

	@ModelTransform(() => ZeldaScreen)
	Transition?: ZeldaScreen;

	@Allow()
	TileType?: IZeldaEnum;

	reset() {
		this.Type = TilesNone;
		this.Transition = ZeldaScreen.create();
	}

	get isDoor() {
		return this.Type === TilesDoor;
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
	set Type(value: IZeldaEnum) {
		this.type = value;
		this.Colors = getDefaultTileColors(value);
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

	getTypeKey() {
		return getNameById(Tiles, this.Type.id)?.replace("Tiles", "");
	}

	hasImage() {
		return !(isEmpty(this.Type) || this.Type.id === TilesNone.id);
	}

	async updateImage() {
		if (this.hasImage()) {
			this.src = await replaceColors({
				colors: this.Colors,
				imageEnum: this.Type,
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
