import { WorldColors } from "ui/classes/enums/WorldColors.js";
import { Model } from "@incutonez/shared";

export class Color extends Model {
  get backgroundStyle() {
    if (this.id === WorldColors.None) {
      return "";
    }
    return `background-color: #${this.id};`;
  }
}
