import { WorldObject } from "ui/classes/models/WorldObject.js";
import { Enemies } from "ui/classes/enums/NPCs.js";
import { ImageType } from "ui/Image.js";
import { isEmpty } from "@incutonez/shared";
import { WorldColors } from "ui/classes/enums/WorldColors.js";

function makeTargets(item) {
  return {
    Target: item,
  };
}
const WhiteBlack = [WorldColors.WhitePure, WorldColors.Black].map(makeTargets);
const WhiteBlackRed = [WorldColors.WhitePure, WorldColors.Black, WorldColors.RedPure].map(makeTargets);

/**
 * @property {String} image
 * @property {String} src
 * @property {Cell} cell
 * @property {Number} type
 * @property {Number} Speed
 */
export class Enemy extends WorldObject {
  /* TODO: Potentially implement colors that can change for the bosses, but that would involve
   * genericizing the bosses dir asset to have colors that are common */
  getDefaultFields() {
    return super.getDefaultFields().concat([{
      name: "Speed",
      type: Number,
      defaultValue: null,
    }]);
  }

  get imageType() {
    return ImageType.Enemies;
  }

  get enumCollection() {
    return Enemies;
  }

  getDefaultColors(type) {
    let colors = WhiteBlackRed;
    switch (type) {
      case Enemies.Gel:
      case Enemies.Keese:
      case Enemies.Zol:
        colors = WhiteBlack;
        break;
      default:
        break;
    }
    return colors;
  }

  // TODOJEF: Impl enemy colors
  // TODOJEF: Can certain enemies based on the selection... e.g. if a Blue Octorok is selected,
  // the health and colors are pre-generated and that's what's used when showing the selection, but
  // the user can change the values

  getConfig() {
    const config = {
      Type: this.getTypeKey(),
      X: this.cell.x,
      Y: this.cell.y,
    };
    const colors = this.getColors(true);
    if (!isEmpty(colors)) {
      config.Colors = colors;
    }
    const { Speed } = this;
    if (!isEmpty(Speed)) {
      config.Speed = Speed;
    }
    return config;
  }
}
