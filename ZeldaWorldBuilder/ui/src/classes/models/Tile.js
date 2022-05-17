import { Tiles } from "ui/classes/enums/Tiles.js";
import { Model } from "ui/classes/models/Model.js";
import { WorldColors } from "ui/classes/enums/WorldColors.js";
import {
  collect,
  isEmpty,
} from "ui/utilities.js";
import {
  getImage,
  replaceColor,
} from "ui/Image.js";
import { TargetColor } from "ui/classes/models/TargetColor.js";
import { Store } from "ui/classes/Store.js";

const TransitionTypes = [Tiles.Transition, Tiles.Door];
export class Tile extends Model {
  /**
   * @type {Object[]} TargetColors
   * @property {WorldColors} TargetColors.Target
   * This is the value that we're wanting to replace
   * @property {WorldColors} TargetColors.Value
   * This is the value that we'll be using to replace with
   */
  TargetColors = null;
  /**
   * @type {Number[]}
   */
  Coordinates = [];
  /**
   * @type {Grid}
   */
  Transition = null;
  Rotation = 0;
  FlipX = false;
  FlipY = false;
  Name = null;
  /**
   * @type {Tile[]}
   */
  Children = [];
  /**
   * @type {Grid}
   */
  grid = null;
  /**
   * @type {String}
   * This is the actual image that shows in the grid... it contains all the appropriate colors
   */
  tileImage = null;
  /**
   * @type {String}
   * This is the raw image without any colors applied to it... it's used in the cell editor
   */
  tileSrc = null;
  /**
   * @type {Tiles}
   */
  type = Tiles.None;

  constructor(args) {
    super();
    this.set(args);
  }

  get exclude() {
    return ["grid", "tileSrc"];
  }

  reset() {
    this.Type = Tiles.None;
    this.Transition = null;
  }

  get Type() {
    return this.type;
  }

  set Type(value) {
    this.type = value;
    this.updateType();
  }

  isDoor() {
    return this.Type === Tiles.Door;
  }

  isTransition() {
    return TransitionTypes.indexOf(this.Type) !== -1;
  }

  getTileKey() {
    return Tiles.getKey(this.Type);
  }

  /**
   * The image key is slightly different when we're dealing with a Transition, as we need to use the
   * Transparent image instead.
   * @returns {String}
   */
  getImageKey() {
    return this.isTransition() ? "Transparent" : this.getTileKey();
  }

  async updateType(targetColors = this.TargetColors) {
    const key = this.getImageKey();
    if (this.isTransition()) {
      this.Transition = this.Transition || {
        X: 0,
        Y: 0,
        IsFloating: false,
      };
    }
    let tileSrc = null;
    if (this.hasImage()) {
      tileSrc = await getImage(key, true);
    }
    this.tileSrc = tileSrc;
    this.setTargetColors(targetColors);
  }

  get x() {
    return this.Coordinates[0];
  }

  get y() {
    return this.Coordinates[1];
  }

  getColors(flatten) {
    const colors = this.TargetColors.filter((color) => !!color.Value);
    return flatten ? colors.reduce((value, color) => value.concat(color.getConfig()), []) : colors;
  }

  getIndex() {
    return this.grid.cells.indexOf(this);
  }

  setTargetColors(targetColors) {
    if (!targetColors) {
      let colors = [];
      /**
       * TODOJEF: I really should standardize these colors
       * - 1 color => White
       * - 2 colors => White, Black
       * - 3 colors => White, Black, Blue
       * - 4 colors => White, Black, Blue, Red
       */
      switch (this.Type) {
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
          colors = [WorldColors.PureWhite, WorldColors.PureBlue, WorldColors.PureRed];
          break;
        case Tiles.WallHoleX:
        case Tiles.WallHoleY:
          colors = [WorldColors.PureWhite, WorldColors.Black, WorldColors.PureBlue, WorldColors.PureRed];
          break;
        case Tiles.Fire:
        case Tiles.FireAlt:
          colors = [WorldColors.FireOuter, WorldColors.FireInner, WorldColors.PureWhite];
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
          colors = [WorldColors.PureWhite, WorldColors.PureBlue, WorldColors.Black];
          break;
        case Tiles.GroundTile:
          colors = [WorldColors.PureWhite, WorldColors.PureRed, WorldColors.Black];
          break;
        case Tiles.Door:
          colors = [new TargetColor(WorldColors.White, WorldColors.Black)];
          break;
        case Tiles.SandBottom:
        case Tiles.SandCenter:
          colors = [WorldColors.PureWhite];
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
          colors = [WorldColors.PureWhite, WorldColors.PureBlue];
          break;
        case Tiles.Bush:
        default:
          colors = [WorldColors.PureWhite, WorldColors.Black];
      }
      targetColors = colors;
    }
    this.TargetColors = targetColors.isStore ? targetColors : new Store(targetColors, TargetColor);
    this.updateTileImage();
  }

  hasImage() {
    return this.Type !== Tiles.None;
  }

  async updateTileImage() {
    let tileImage = "";
    if (this.hasImage()) {
      const key = this.getImageKey();
      const targetColors = this.getColors();
      tileImage = await replaceColor({
        image: key,
        targetColors: collect(targetColors, "Target"),
        replaceColors: collect(targetColors, "Value"),
      });
    }
    this.tileImage = tileImage;
  }

  getConfig() {
    const config = {
      X: this.x,
      Y: this.y,
    };
    const { Name } = this;
    if (Name) {
      config.Name = Name;
    }
    const colors = this.getColors(true);
    if (!isEmpty(colors)) {
      config.Colors = colors;
    }
    if (this.isTransition()) {
      const { Transition } = this;
      if (this.isDoor()) {
        Transition.Name ??= `${Transition.Template}${Transition.X}${Transition.Y}`;
      }
      config.Transition = Transition;
    }
    return config;
  }
}
