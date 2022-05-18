import { Model } from "ui/classes/models/Model.js";
import { WorldColors } from "ui/classes/enums/WorldColors.js";
import { Tiles } from "ui/classes/enums/Tiles.js";
import { isEmpty } from "@incutonez/shared";
import { TargetColor } from "ui/classes/models/TargetColor.js";
import { Cell } from "ui/classes/models/Cell.js";

class Grid extends Model {
  Name = "";
  X = 0;
  Y = 0;
  /**
   * @type {WorldColors}
   */
  AccentColor = WorldColors.Brown;
  /**
   * @type {WorldColors}
   */
  GroundColor = WorldColors.Tan;
  IsCastle = false;
  /**
   * This is used for when we have something that's not part of the Overworld, like a shop or castle
   * @type {boolean}
   */
  IsFloating = false;
  /**
   * @type {ScreenTemplates}
   */
  Template = null;
  /**
   * @type {Cell[]}
   */
  cells = [];
  totalRows = 0;
  totalColumns = 0;

  constructor(args) {
    super(args);
    this.set(args);
  }

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
              cell.TileType = Tiles.getValue(tile.Type);
              const { Colors } = child;
              if (Colors) {
                const tileColors = [];
                for (let i = 0; i < Colors.length; i += 2) {
                  tileColors.push(new TargetColor(Colors[i], Colors[i + 1]));
                }
                cell.TileColors = tileColors;
              }
              cell.Transition = child.Transition;
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
    const { x, y, TileType: type } = node;
    const nodes = [this.getCell(x - 1, y),
      this.getCell(x + 1, y),
      this.getCell(x, y - 1),
      this.getCell(x, y + 1)];
    // Some of the nodes from above might be undefined or not have the same type, so let's filter those out
    return nodes.filter((record) => record?.TileType === type);
  }

  getTileConfigs() {
    const tiles = {};
    const traversed = [];
    for (const cell of this.cells) {
      const { TileType: cellType } = cell;
      if (cellType === Tiles.None) {
        continue;
      }
      const nodes = this.findAdjacentNodes(cell, traversed);
      if (isEmpty(nodes)) {
        continue;
      }
      const found = tiles[cellType];
      if (found) {
        found.push(nodes);
      }
      else {
        tiles[cellType] = [nodes];
      }
    }
    const output = [];
    // TODOJEF: Might be able to optimize this by combining it in the loop above
    for (const tilesKey in tiles) {
      let tileType;
      let data = [];
      tiles[tilesKey].forEach((nodes, index) => {
        if (index === 0) {
          tileType = nodes[0].getTileKey();
        }
        data = data.concat(nodes.map((node) => node.getConfig()));
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
    let nodes = [];
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
        nodes = nodes.concat(subNodes);
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
