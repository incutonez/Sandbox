import { Tile } from "ui/classes/models/Tile.js";
import { Model } from "@incutonez/shared";
import { Grid } from "ui/classes/models/Grid.js";

export class Cell extends Model {
  getDefaultFields() {
    return [{
      name: "Coordinates",
      type: Array,
    }, {
      name: "Name",
      type: String,
    }, {
      name: "grid",
      type: Grid,
    }, {
      name: "tile",
      type: Tile,
      defaultValue: {
        cell: this,
      },
    }];
  }

  reset() {
    this.tile.reset();
  }

  getIndex() {
    return this.grid.cells.indexOf(this);
  }

  get id() {
    return `${this.x}_${this.y}`;
  }

  get x() {
    return this.Coordinates[0];
  }

  get y() {
    return this.Coordinates[1];
  }
}
