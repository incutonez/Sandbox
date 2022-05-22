import { Model } from "@incutonez/shared";
import { Cell } from "ui/classes/models/Cell.js";
import { Items } from "ui/classes/enums/Items.js";
import {
  getImage,
  ImageType,
} from "ui/Image.js";

export class Item extends Model {
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
      defaultValue: Items.None,
    }];
    /* TODOJEF: Potentially implement colors that can change for the items, but that would involve
     * genericizing the items.png asset to have colors that are common */
  }

  // TODO: Common method, but Tile has a minor difference
  reset() {
    this.set({
      Type: Items.None,
    });
  }

  /**
   * This is intentionally not a true getter because of https://stackoverflow.com/q/28950760/1253609
   * @returns {Enum}
   */
  // TODO: Common method
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
  // TODO: Common method, but Tile has a minor difference
  set Type(value) {
    this.set({
      type: value,
    });
    this.updateSrc();
  }

  // TODO: Common method, but the enum store is different
  getTypeKey() {
    return Items.getKey(this.Type);
  }

  /**
   * The image key is slightly different when we're dealing with a Transition, as we need to use the
   * Transparent image instead.
   * @returns {String}
   * We have this method in here, so it can be overridden in sub-classes, like in Cell
   */
  // TODO: Common method, but Tile has a minor difference
  getImageKey() {
    return this.getTypeKey();
  }

  // TODO: Common method
  async updateSrc() {
    const name = this.getImageKey();
    let src = null;
    if (this.hasImage()) {
      src = await getImage({
        name,
        type: ImageType.Items,
        encode: true,
      });
    }
    this.set({
      src,
      image: src,
    });
  }

  hasImage() {
    return this.Type !== Items.None;
  }

  getConfig() {
    return {
      X: this.cell.x,
      Y: this.cell.y,
      Config: {
        Type: this.getTypeKey(),
      },
    };
  }
}
