import { WorldColors } from "ui/classes/enums/WorldColors.js";
import { Model } from "ui/classes/models/Model.js";

class Color extends Model {
  constructor(args) {
    super(args);
    this.set(args);
  }

  get backgroundStyle() {
    if (this.id === WorldColors.None) {
      return "";
    }
    return `background-color: #${this.id};`;
  }
}

export {
  Color,
};
