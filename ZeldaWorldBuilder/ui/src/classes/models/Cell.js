import { Tile } from "ui/classes/models/Tile.js";
import {
  isEmpty,
  Model,
} from "@incutonez/shared";
import { Grid } from "ui/classes/models/Grid.js";
import { Item } from "ui/classes/models/Item.js";

/**
 * @property {Array} Coordinates
 * @property {String} Name
 * @property {Grid} grid
 * @property {Tile} tile
 */
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
    }, {
      name: "item",
      type: Item,
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

  getConfig({ tiles, traversed }) {
    if (this.tile.hasImage()) {
      const { Type: tileType } = this.tile;
      const nodes = this.grid.findAdjacentNodes(this, traversed);
      if (!isEmpty(nodes)) {
        const found = tiles[tileType];
        if (found) {
          found.push(nodes);
        }
        else {
          tiles[tileType] = [nodes];
        }
      }
    }
  }
}
