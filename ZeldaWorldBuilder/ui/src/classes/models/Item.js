import { Items } from "ui/classes/enums/Items.js";
import { ImageType } from "ui/Image.js";
import { WorldObject } from "ui/classes/models/WorldObject.js";

/**
 * @property {String} image
 * @property {String} src
 * @property {Cell} cell
 * @property {Number} type
 */
export class Item extends WorldObject {
  enumCollection = Items;
  imageType = ImageType.Items;

  /* TODO: Potentially implement colors that can change for the items, but that would involve
   * genericizing the items.png asset to have colors that are common */

  getConfig() {
    return {
      X: this.cell.x,
      Y: this.cell.y,
      Config: {
        Type: this.getTypeKey(),
      },
    };
  }

  setDefaultValues() {
    this.Colors = [];
  }
}
