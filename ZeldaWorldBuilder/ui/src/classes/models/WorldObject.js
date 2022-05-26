import {
  FieldType,
  isEmpty,
  Model,
} from "@incutonez/shared";
import { Cell } from "ui/classes/models/Cell.js";
import {
  getImage,
  ImageType,
  replaceColor,
} from "ui/Image.js";
import { collect } from "ui/utilities.js";
import { TargetColor } from "ui/classes/models/TargetColor.js";
import { Tiles } from "ui/classes/enums/Tiles.js";

export class WorldObject extends Model {
  // TODO: Common method, but Tile has a minor difference
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
      defaultValue: null,
    }, {
      name: "colors",
      type: FieldType.Collection,
      model: TargetColor,
    }];
  }

  get enumCollection() {
    return Tiles;
  }

  get imageType() {
    return ImageType.Tiles;
  }

  /**
   * @abstract
   */
  setDefaultValues() { }

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
    });
    this.setDefaultValues();
    this.updateSrc();
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

  async updateImage() {
    let image = "";
    if (this.hasImage()) {
      const key = this.getImageKey();
      const colors = this.getColors();
      image = await replaceColor({
        image: key,
        type: this.imageType,
        targetColors: collect(colors, "Target"),
        replaceColors: collect(colors, "Value"),
      });
    }
    this.set({
      image,
    });
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

  reset() {
    this.set({
      Type: null,
    });
  }

  getTypeKey() {
    return this.enumCollection?.getKey(this.Type);
  }

  /**
   * The image key is slightly different when we're dealing with a Transition, as we need to use the
   * Transparent image instead.
   * @returns {String}
   * We have this method in here, so it can be overridden in sub-classes, like in Cell
   */
  getImageKey() {
    return this.getTypeKey();
  }

  hasImage() {
    return !(isEmpty(this.Type) || this.Type === this.enumCollection?.None);
  }

  async updateSrc() {
    const name = this.getImageKey();
    let src = null;
    if (this.hasImage()) {
      src = await getImage({
        name,
        type: this.imageType,
        encode: true,
      });
    }
    this.set({
      src,
    });
  }
}
