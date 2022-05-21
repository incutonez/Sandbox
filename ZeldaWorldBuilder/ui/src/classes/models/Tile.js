import { Tiles } from "ui/classes/enums/Tiles.js";
import { WorldColors } from "ui/classes/enums/WorldColors.js";
import { TargetColor } from "ui/classes/models/TargetColor.js";
import {
  getImage,
  ImageType,
  replaceColor,
} from "ui/Image.js";
import {
  collect,
  isEmpty,
} from "ui/utilities.js";
import {
  FieldType,
  Model,
} from "@incutonez/shared";
import { Cell } from "ui/classes/models/Cell.js";
import { Grid } from "ui/classes/models/Grid.js";

const TransitionTypes = [Tiles.Transition, Tiles.Door];
function makeTargets(item) {
  return {
    Target: item,
  };
}
/**
 * TODOJEF: I really should standardize these colors
 * - 1 color => White
 * - 2 colors => White, Black
 * - 3 colors => White, Black, Blue
 * - 4 colors => White, Black, Blue, Red
 */
const WhiteBlueRed = [WorldColors.PureWhite, WorldColors.PureBlue, WorldColors.PureRed].map(makeTargets);
const WhiteBlackBlueRed = [WorldColors.PureWhite, WorldColors.Black, WorldColors.PureBlue, WorldColors.PureRed].map(makeTargets);
const FireOuterFireInnerWhite = [WorldColors.FireOuter, WorldColors.FireInner, WorldColors.PureWhite].map(makeTargets);
const WhiteBlueBlack = [WorldColors.PureWhite, WorldColors.PureBlue, WorldColors.Black].map(makeTargets);
const WhiteRedBlack = [WorldColors.PureWhite, WorldColors.PureRed, WorldColors.Black].map(makeTargets);
const DoorColor = [{
  Target: WorldColors.White,
  Value: WorldColors.Black,
}];
const White = [WorldColors.PureWhite].map(makeTargets);
const WhiteBlue = [WorldColors.PureWhite, WorldColors.PureBlue].map(makeTargets);
const WhiteBlack = [WorldColors.PureWhite, WorldColors.Black].map(makeTargets);
export function getDefaultTileColors(type) {
  let colors = [];
  switch (type) {
    // TODOJEF: Add color change for these?
    case Tiles.StairsKeep:
    case Tiles.WallKeep:
    case Tiles.Transition:
    case Tiles.None:
      break;
    case Tiles.Block:
    case Tiles.CastleSand:
    case Tiles.DoorClosedY:
    case Tiles.DoorClosedX:
    case Tiles.DoorUnlockedX:
    case Tiles.DoorUnlockedY:
    case Tiles.DoorLockedX:
    case Tiles.DoorLockedY:
    case Tiles.Statue1:
    case Tiles.Statue2:
    case Tiles.WallLeftX:
    case Tiles.WallLeftY:
    case Tiles.WallLeftYFlip:
    case Tiles.WallRightX:
    case Tiles.WallRightY:
    case Tiles.WallRightYFlip:
    case Tiles.WallX:
    case Tiles.WallY:
      colors = WhiteBlueRed;
      break;
    case Tiles.WallHoleX:
    case Tiles.WallHoleY:
      colors = WhiteBlackBlueRed;
      break;
    case Tiles.Fire:
    case Tiles.FireAlt:
      colors = FireOuterFireInnerWhite;
      break;
    case Tiles.CastleBottomLeft:
    case Tiles.CastleBottomRight:
    case Tiles.CastleTop:
    case Tiles.CastleTopAlt:
    case Tiles.CastleTopLeftAlt:
    case Tiles.CastleTopRightAlt:
    case Tiles.CastleTopLeft:
    case Tiles.CastleTopRight:
    case Tiles.Dock:
    case Tiles.Grave:
    case Tiles.StairsUp:
    case Tiles.Statue:
    case Tiles.TreeBottomRight:
    case Tiles.TreeTopLeft:
    case Tiles.Water:
    case Tiles.WaterTopLeft:
    case Tiles.WaterTopRight:
    case Tiles.WaterBottomLeft:
    case Tiles.WaterBottomRight:
      colors = WhiteBlueBlack;
      break;
    case Tiles.GroundTile:
      colors = WhiteRedBlack;
      break;
    case Tiles.Door:
      colors = DoorColor;
      break;
    case Tiles.SandBottom:
    case Tiles.SandCenter:
      colors = White;
      break;
    case Tiles.PondBottom:
    case Tiles.PondBottomLeft:
    case Tiles.PondBottomRight:
    case Tiles.PondTop:
    case Tiles.PondTopLeft:
    case Tiles.PondTopRight:
    case Tiles.PondCenter:
    case Tiles.PondCenterLeft:
    case Tiles.PondCenterRight:
      colors = WhiteBlue;
      break;
    case Tiles.Bush:
    default:
      colors = WhiteBlack;
      break;
  }
  return colors;
}
export class Tile extends Model {
  getDefaultFields() {
    return [{
      name: "image",
      type: String,
    }, {
      name: "src",
      type: String,
    }, {
      name: "cell",
      type: Cell,
    }, {
      name: "type",
      type: Number,
      defaultValue: Tiles.None,
    }, {
      name: "colors",
      type: FieldType.Collection,
      model: TargetColor,
    }, {
      name: "Transition",
      type: Grid,
    }];
  }

  reset() {
    this.set({
      Type: Tiles.None,
      Transition: null,
    });
  }

  get isDoor() {
    return this.Type === Tiles.Door;
  }

  get isTransition() {
    return TransitionTypes.indexOf(this.Type) !== -1;
  }

  /**
   * This is intentionally not a true getter because of https://stackoverflow.com/q/28950760/1253609
   * @returns {Enum}
   */
  get Type() {
    return this.type;
  }

  /**
   * This is a little tricky... we call an underlying method because we don't want to have to
   * make a custom setter in our sub-class... we just want to override the logic that is used.  This
   * is due to having to redefine both the set AND get if you change one or the other.
   * Ref: https://stackoverflow.com/q/28950760/1253609
   * @param {Enum} value
   */
  set Type(value) {
    this.set({
      type: value,
      Colors: getDefaultTileColors(value),
    });
    this.updateSrc();
    if (this.isTransition) {
      this.set({
        Transition: {
          X: 0,
          Y: 0,
          IsFloating: false,
        },
      });
    }
  }

  set Colors(colors) {
    this.set({
      colors,
    });
    this.updateImage();
  }

  get Colors() {
    return this.colors;
  }

  async updateSrc() {
    const name = this.getImageKey();
    let src = null;
    if (this.hasImage()) {
      src = await getImage({
        name,
        encode: true,
      });
    }
    this.set({
      src,
    });
  }

  getTypeKey() {
    return Tiles.getKey(this.Type);
  }

  hasImage() {
    return this.Type !== Tiles.None;
  }

  async updateImage() {
    let image = "";
    if (this.hasImage()) {
      const key = this.getImageKey();
      const colors = this.getColors();
      image = await replaceColor({
        image: key,
        targetColors: collect(colors, "Target"),
        replaceColors: collect(colors, "Value"),
      });
    }
    this.set({
      image,
    });
  }

  /**
   * The image key is slightly different when we're dealing with a Transition, as we need to use the
   * Transparent image instead.
   * @returns {String}
   * We have this method in here, so it can be overridden in sub-classes, like in Cell
   */
  getImageKey() {
    return this.isTransition ? "Transparent" : this.getTypeKey();
  }

  getColors(flatten) {
    const colors = this.Colors.filter((color) => !!color.Value);
    return flatten ? colors.reduce((value, color) => {
      const config = color.getConfig();
      if (config) {
        value = value.concat(config);
      }
      return value;
    }, []) : colors;
  }

  getConfig() {
    const config = {
      X: this.cell.x,
      Y: this.cell.y,
    };
    const { Name } = this.cell;
    if (Name) {
      config.Name = Name;
    }
    const colors = this.getColors(true);
    if (!isEmpty(colors)) {
      config.Colors = colors;
    }
    if (this.isTransition) {
      const removeFields = [];
      const transition = this.Transition.getData({
        exclude: ["AccentColor", "GroundColor", "cells", "totalRows", "totalColumns"],
      });
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
      removeFields.forEach((field) => delete transition[field]);
      config.Transition = transition;
    }
    return config;
  }
}
