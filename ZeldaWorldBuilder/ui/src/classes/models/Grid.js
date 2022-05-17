import { Model } from "ui/classes/models/Model.js";
import { WorldColors } from "ui/classes/enums/WorldColors.js";
import { Tile } from "ui/classes/models/Tile.js";
import { Tiles } from "ui/classes/enums/Tiles.js";
import { isEmpty } from "@incutonez/shared";
import { v4 as uuidv4 } from "uuid";

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
  /**
   * @type {Tile[]}
   */
  Tiles = [];
  Enemies = [];
  Characters = [];
  Items = [];
  IsCastle = false;
  IsFloating = false;
  /**
   * @type {ScreenTemplates}
   */
  Template = null;
  cells = null;
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
        config.push(new Tile({
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
      for (const cell of this.cells) {
        const { x, y } = cell;
        let found;
        for (const tile of tiles) {
          for (const child of tile.Children) {
            if (child.X === x && child.Y === y) {
              found = {
                colors: child.ReplaceColors,
                tile: tile.Tile,
              };
              break;
            }
          }
          if (found) {
            break;
          }
        }
        if (found) {
          cell.Tile = Tiles.getValue(found.tile);
          if (found.colors) {
            const targetColors = [];
            for (let i = 0; i < found.colors.length; i += 2) {
              // TODOJEF: Clean this up... should be a way of putting this in the Tile class
              targetColors.push({
                Target: WorldColors.getValue(found.colors[i]),
                Value: WorldColors.getValue(found.colors[i + 1]),
                id: uuidv4(),
              });
            }
            cell.updateType(targetColors);
          }
        }
        else {
          cell.reset();
        }
      }
    }
  }

  getCell(x, y) {
    return this.cells[y * this.totalColumns + x];
  }

  getAdjacentNodes(node) {
    const { x, y, Type: type } = node;
    const nodes = [this.getCell(x - 1, y),
      this.getCell(x + 1, y),
      this.getCell(x, y - 1),
      this.getCell(x, y + 1)];
    // Some of the nodes from above might be undefined or not have the same type, so let's filter those out
    return nodes.filter((record) => record?.Type === type);
  }

  getTileConfigs() {
    const tiles = {};
    const traversed = [];
    for (const cell of this.cells) {
      const { Type: cellType } = cell;
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
        Tile: tileType,
        Children: data,
      });
    }
    return output;
  }

  /**
   * Algorithm is a modification of depth-first search
   * @param {Tile} startNode
   * @param {Tile[]} traversedNodes
   * @returns {Tile[]} nodes
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
