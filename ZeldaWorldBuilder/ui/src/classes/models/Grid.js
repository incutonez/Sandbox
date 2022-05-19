import { WorldColors } from "ui/classes/enums/WorldColors.js";
import { Tiles } from "ui/classes/enums/Tiles.js";
import {
  FieldType,
  isEmpty,
  Model,
} from "@incutonez/shared";
import { Cell } from "ui/classes/models/Cell.js";
import { getDefaultColors } from "ui/classes/models/Tile.js";

class Grid extends Model {
  getDefaultFields() {
    return [{
      name: "Name",
      type: String,
    }, {
      name: "X",
      type: Number,
    }, {
      name: "Y",
      type: Number,
    }, {
      // This value refers to an enum in WorldColors
      name: "AccentColor",
      type: String,
      defaultValue: WorldColors.Brown,
    }, {
      // This value refers to an enum in WorldColors
      name: "GroundColor",
      type: String,
      defaultValue: WorldColors.Tan,
    }, {
      name: "IsCastle",
      type: Boolean,
    }, {
      // This is used for when we have something that's not part of the Overworld, like a shop or castle
      name: "IsFloating",
      type: Boolean,
    }, {
      // This value refers to an enum in ScreenTemplates
      name: "Template",
      type: Number,
      defaultValue: null,
    }, {
      name: "cells",
      type: FieldType.Collection,
      model: Cell,
    }, {
      name: "totalRows",
      type: Number,
    }, {
      name: "totalColumns",
      type: Number,
    }];
  }

  /**
   * @param {Number} rows
   * @param {Number} columns
   * @returns {Grid} record
   */
  static initialize(rows, columns) {
    const config = [];
    const record = new this();
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        config.push(new Cell({
          Coordinates: [column, row],
          grid: record,
        }));
      }
    }
    record.set({
      cells: config,
      totalRows: rows,
      totalColumns: columns,
    });
    return record;
  }

  /**
   * This method is used when loading from a file
   * @param {Object} data
   * This looks like the data object that's used in C#
   * TODO: Should probably create a UI model for that
   */
  async loadFileData(data = {}) {
    const { Tiles: tiles } = data;
    if (!isEmpty(tiles)) {
      // Loop through the entire grid to find and update any children in the data
      for (const cell of this.cells) {
        let found = false;
        const { x, y } = cell;
        for (const tile of tiles) {
          for (const child of tile.Children) {
            if (child.X === x && child.Y === y) {
              found = true;
              const type = Tiles.getValue(tile.Type);
              const tileColors = getDefaultColors(type);
              const { Colors } = child;
              if (Colors) {
                for (let i = 0; i < Colors.length; i += 2) {
                  const target = WorldColors.getValue(Colors[i]);
                  const found = tileColors.find((color) => color.Target === target);
                  if (found) {
                    found.Value = WorldColors.getValue(Colors[i + 1]);
                  }
                }
              }
              cell.tile.set({
                Type: type,
                Transition: child.Transition,
                Colors: tileColors,
              });
              break;
            }
          }
          if (found) {
            break;
          }
        }
        if (!found) {
          cell.reset();
        }
      }
    }
  }

  getCell(x, y) {
    return this.cells[y * this.totalColumns + x];
  }

  getAdjacentNodes(node) {
    const { x, y } = node;
    const nodes = [this.getCell(x - 1, y),
      this.getCell(x + 1, y),
      this.getCell(x, y - 1),
      this.getCell(x, y + 1)];
    const tileType = node.tile.Type;
    // Some of the nodes from above might be undefined or not have the same type, so let's filter those out
    return nodes.filter((record) => record?.tile.TileType === tileType);
  }

  getTileConfigs() {
    const tiles = {};
    const traversed = [];
    for (const cell of this.cells) {
      if (!cell.tile.hasImage()) {
        continue;
      }
      const { Type: tileType } = cell.tile;
      const nodes = this.findAdjacentNodes(cell, traversed);
      if (isEmpty(nodes)) {
        continue;
      }
      const found = tiles[tileType];
      if (found) {
        found.push(nodes);
      }
      else {
        tiles[tileType] = [nodes];
      }
    }
    const output = [];
    // TODOJEF: Might be able to optimize this by combining it in the loop above
    for (const tilesKey in tiles) {
      let tileType;
      const data = [];
      tiles[tilesKey].forEach((nodes, index) => {
        if (index === 0) {
          tileType = nodes[0].tile.getTypeKey();
        }
        data.push(...nodes.map((node) => node.tile.getConfig()));
      });
      output.push({
        Type: tileType,
        Children: data,
      });
    }
    return output;
  }

  /**
   * Algorithm is a modification of depth-first search
   * @param {Cell} startNode
   * @param {Cell[]} traversedNodes
   * @returns {Cell[]} nodes
   */
  findAdjacentNodes(startNode = this.cells[0], traversedNodes = []) {
    const nodes = [];
    const adjacentNodes = this.getAdjacentNodes(startNode);
    if (traversedNodes.indexOf(startNode) === -1) {
      traversedNodes.push(startNode);
      nodes.push(startNode);
    }
    for (const adjacentNode of adjacentNodes) {
      if (!traversedNodes.find((node) => node === adjacentNode)) {
        const subNodes = this.findAdjacentNodes(adjacentNode, traversedNodes);
        if (isEmpty(subNodes)) {
          continue;
        }
        nodes.push(...subNodes);
      }
    }
    return nodes;
  }

  // In my case, adjacent depends on the coordinates... e.g. 0,0 has 0,1 and 1,0
  getConfig() {
    return {
      X: this.X,
      Y: this.Y,
      Name: this.Name,
      GroundColor: WorldColors.getKey(this.GroundColor),
      AccentColor: WorldColors.getKey(this.AccentColor),
      Tiles: this.getTileConfigs(),
    };
  }
}

export {
  Grid,
};
