import { Model } from "ui/classes/models/Model.js";
import {
  getImage,
  replaceColor,
} from "ui/Image.js";
import {
  collect,
  isEmpty,
} from "ui/utilities.js";
import { Store } from "ui/classes/Store.js";
import { TargetColor } from "ui/classes/models/TargetColor.js";
import { Tiles } from "ui/classes/enums/Tiles.js";
import { WorldColors } from "ui/classes/enums/WorldColors.js";

const TransitionTypes = [Tiles.Transition, Tiles.Door];
export class Cell extends Model {
  /**
   * @type {Number[]}
   */
  Coordinates = [];
  Name = null;
  /**
   * @type {Grid}
   */
  Transition = null;
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
   * @type {Enum}
   */
  tileType = Tiles.None;
  /**
   * @type {Object[]} TileColors
   * @property {WorldColors} TileColors.Target
   * This is the value that we're wanting to replace
   * @property {WorldColors} TileColors.Value
   * This is the value that we'll be using to replace with
   */
  tileColors = null;

  constructor(args) {
    super();
    this.set(args);
  }

  reset() {
    this.TileType = Tiles.None;
    this.Transition = null;
  }

  get isTileDoor() {
    return this.TileType === Tiles.Door;
  }

  get isTileTransition() {
    return TransitionTypes.indexOf(this.TileType) !== -1;
  }

  async updateTileSrc() {
    const key = this.getTileImageKey();
    let tileSrc = null;
    if (this.hasTileImage()) {
      tileSrc = await getImage(key, true);
    }
    this.tileSrc = tileSrc;
  }

  /**
   * The image key is slightly different when we're dealing with a Transition, as we need to use the
   * Transparent image instead.
   * @returns {String}
   * We have this method in here, so it can be overridden in sub-classes, like in Cell
   */
  getTileImageKey() {
    return this.isTileTransition ? "Transparent" : this.getTileKey();
  }

  /**
   * @abstract
   * This method is meant to be implemented in the sub-class
   * @returns {[]}
   */
  getDefaultTileColors() {
    let colors = [];
    /**
     * TODOJEF: I really should standardize these colors
     * - 1 color => White
     * - 2 colors => White, Black
     * - 3 colors => White, Black, Blue
     * - 4 colors => White, Black, Blue, Red
     */
    switch (this.TileType) {
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
        break;
    }
    return colors;
  }

  /**
   * This is intentionally not a true getter because of https://stackoverflow.com/q/28950760/1253609
   * @returns {Enum}
   */
  get TileType() {
    return this.tileType;
  }

  /**
   * This is a little tricky... we call an underlying method because we don't want to have to
   * make a custom setter in our sub-class... we just want to override the logic that is used.  This
   * is due to having to redefine both the set AND get if you change one or the other.
   * Ref: https://stackoverflow.com/q/28950760/1253609
   * @param {Enum} value
   */
  set TileType(value) {
    this.tileType = value;
    this.updateTileSrc();
    this.TileColors = this.getDefaultTileColors();
    if (this.isTileTransition) {
      this.Transition = this.Transition || {
        X: 0,
        Y: 0,
        IsFloating: false,
      };
    }
  }

  set TileColors(value) {
    if (value) {
      value = value.isStore ? value : new Store(value, TargetColor);
    }
    this.tileColors = value;
    this.updateTileImage();
  }

  get TileColors() {
    return this.tileColors;
  }

  get exclude() {
    return ["grid", "tileSrc"];
  }

  getIndex() {
    return this.grid.cells.indexOf(this);
  }

  getTileColors(flatten) {
    const colors = this.TileColors.filter((color) => !!color.Value);
    return flatten ? colors.reduce((value, color) => value.concat(color.getConfig()), []) : colors;
  }

  get x() {
    return this.Coordinates[0];
  }

  get y() {
    return this.Coordinates[1];
  }

  getTileKey() {
    return Tiles.getKey(this.TileType);
  }

  hasTileImage() {
    return this.TileType !== Tiles.None;
  }

  async updateTileImage() {
    let tileImage = "";
    if (this.hasTileImage()) {
      const key = this.getTileImageKey();
      const tileColors = this.getTileColors();
      tileImage = await replaceColor({
        image: key,
        targetColors: collect(tileColors, "Target"),
        replaceColors: collect(tileColors, "Value"),
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
    const colors = this.getTileColors(true);
    if (!isEmpty(colors)) {
      config.Colors = colors;
    }
    if (this.isTileTransition) {
      const { Transition } = this;
      if (this.isTileDoor) {
        Transition.Name ??= `${Transition.Template}${Transition.X}${Transition.Y}`;
      }
      config.Transition = Transition;
    }
    return config;
  }
}
