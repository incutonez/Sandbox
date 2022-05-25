import { WorldColors } from "ui/classes/enums/WorldColors.js";
import { Tiles } from "ui/classes/enums/Tiles.js";
import {
  FieldType,
  isEmpty,
  Model,
} from "@incutonez/shared";
import { Cell } from "ui/classes/models/Cell.js";
import { getDefaultTileColors } from "ui/classes/models/Tile.js";
import { Items } from "ui/classes/enums/Items.js";

/**
 * @property {String} Name
 * @property {Number} X
 * @property {Number} Y
 * @property {String} AccentColor
 * @property {String} GroundColor
 * @property {Boolean} IsCastle
 * @property {Boolean} IsFloating
 * @property {String} Template
 * @property {Collection<Cell>} cells
 * @property {Number} totalRows
 * @property {Number} totalColumns
 */
export class Grid extends Model {
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
      type: String,
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
    const { Tiles: tiles = [], Items: items = [], Enemies: enemies = [] } = data;
    // Loop through the entire grid to find and update any children in the data
    for (const cell of this.cells) {
      let found = false;
      const { x, y } = cell;
      for (const tile of tiles) {
        for (const child of tile.Children) {
          if (child.X === x && child.Y === y) {
            found = true;
            const type = Tiles.getValue(tile.Type);
            const tileColors = getDefaultTileColors(type);
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
            tile.Children.remove(child);
            break;
          }
        }
        if (found) {
          break;
        }
      }
      if (!found) {
        cell.tile.reset();
      }
      // Unset, as we're using for next loop
      found = false;
      for (const item of items) {
        if (item.X === x && item.Y === y) {
          found = true;
          items.remove(item);
          cell.item.set({
            Type: Items.getValue(item.Config.Type),
          });
          break;
        }
      }
      if (!found) {
        cell.item.reset();
      }
      // Unset, as we're using for next loop
      found = false;
      for (const value of enemies) {
        if (value.X === x && value.Y === y) {
          found = true;
          enemies.remove(value);
          cell.enemy.set({
            Type: Items.getValue(value.Type),
          });
          break;
        }
      }
      if (!found) {
        cell.enemy.reset();
      }
      // Unset, as we're using for next loop
      found = false;
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
    const Tiles = [];
    const Items = [];
    const Enemies = [];
    for (const cell of this.cells) {
      cell.getConfig({
        Tiles,
        Items,
        Enemies,
      });
    }
    return {
      X: this.X,
      Y: this.Y,
      Name: this.Name,
      GroundColor: WorldColors.getKey(this.GroundColor),
      AccentColor: WorldColors.getKey(this.AccentColor),
      Tiles,
      Items,
      Enemies,
    };
  }
}
