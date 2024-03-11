import { IsArray, IsBoolean, IsInt, IsNumber, IsString } from "class-validator";
import { findRecordByName, getIdByName, getNameById } from "@/enums/helper";
import { ZeldaItems } from "@/enums/ZeldaItems";
import { ZeldaTiles } from "@/enums/ZeldaTiles";
import { ZeldaWorldColors, ZeldaWorldColorsBrown, ZeldaWorldColorsTan } from "@/enums/ZeldaWorldColors";
import { ModelTransform } from "@/models/decorators";
import { ViewModel } from "@/models/ViewModel";
import { IZeldaEnemyConfig } from "@/models/ZeldaEnemy";
import { IZeldaItemConfig } from "@/models/ZeldaItem";
import { getDefaultTileColors, IZeldaTileMeta } from "@/models/ZeldaTile";
import { ZeldaTileCell } from "@/models/ZeldaTileCell";
import { isEmpty, removeItem } from "@/utils/common";

export interface ILoadData {
	Tiles?: IZeldaTileMeta[];
	Items?: IZeldaItemConfig[];
	Enemies?: IZeldaEnemyConfig[];
}

export class ZeldaTileGrid extends ViewModel {
  @IsNumber()
  X = 0;

  @IsNumber()
  Y = 0;

	@IsString()
  AccentColor = ZeldaWorldColorsBrown.id;

	@IsString()
	GroundColor = ZeldaWorldColorsTan.id;

	@IsBoolean()
	IsCastle = false;

	// This is used for when we have something that's not part of the Overworld, like a shop or castle
	@IsBoolean()
	IsFloating = false;

	// This value refers to an enum in ScreenTemplates
	@IsString()
	Template = "";

	@IsArray()
	@ModelTransform(ZeldaTileCell)
	cells: ZeldaTileCell[] = [];

	@IsInt()
	totalRows = 0;

	@IsInt()
	totalColumns = 0;

	@IsString()
	_name = "";

	set Name(value) {
  	this._name = value;
	}

	get Name() {
  	let { _name } = this;
  	if (!_name) {
  		_name = `${this.X}${this.Y}`;
  	}
  	return _name;
	}

	initialize() {
  	const config: ZeldaTileCell[] = [];
  	for (let row = 0; row < this.totalRows; row++) {
  		for (let column = 0; column < this.totalColumns; column++) {
  			config.push(ZeldaTileCell.create({
  				Coordinates: [column, row],
  				grid: this,
  			}));
  		}
  	}
		this.cells = config;
	}

	/**
   * This method is used when loading from a file
   * @param {Object} data
   * This looks like the data object that's used in C#
   * TODO: Should probably create a UI model for that
   */
	async loadFileData(data: ILoadData = {}) {
  	const { Tiles = [], Items = [], Enemies = [] } = data;
  	// Loop through the entire grid to find and update any children in the data
  	for (const cell of this.cells) {
  		let found = false;
  		const { x, y } = cell;
  		for (const tile of Tiles) {
  			for (const child of tile.Children) {
  				if (child.X === x && child.Y === y) {
  					found = true;
  					const Type = ZeldaTiles.find((item) => item.id === tile.Type);
  					const tileColors = getDefaultTileColors(Type!);
  					const { Colors } = child;
  					if (Colors) {
  						for (let i = 0; i < Colors.length; i += 2) {
  							const target = getIdByName(ZeldaWorldColors, Colors[i]);
  							const foundColor = tileColors.find((color) => color.Target === target);
  							if (foundColor) {
  								foundColor.Value = getIdByName(ZeldaWorldColors, Colors[i + 1]);
  							}
  						}
  					}
  					cell.tile.set({
  						Type,
  						Transition: child.Transition,
  						Colors: tileColors,
  					});
					  removeItem(tile.Children, child);
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
  		for (const item of Items) {
  			if (item.X === x && item.Y === y) {
  				found = true;
					removeItem(Items, item);
  				cell.item.set({
  					Type: findRecordByName(ZeldaItems, item.Config.Type),
  				});
  				break;
  			}
  		}
  		if (!found) {
  			cell.item.reset();
  		}
  		// Unset, as we're using for next loop
  		found = false;
  		for (const value of Enemies) {
  			if (value.X === x && value.Y === y) {
  				found = true;
  				removeItem(Enemies, value);
  				cell.enemy.set({
  					Health: value.Health,
  					HealthModifier: value.HealthModifier,
  					Speed: value.Speed,
  					TouchDamage: value.TouchDamage,
  					WeaponDamage: value.WeaponDamage,
  					Type: findRecordByName(Enemies, value.Type),
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

	getCell(x: number, y: number) {
  	return this.cells[y * this.totalColumns + x];
	}

	getAdjacentNodes(node: ZeldaTileCell) {
  	const { x, y } = node;
  	const nodes = [this.getCell(x - 1, y), this.getCell(x + 1, y), this.getCell(x, y - 1), this.getCell(x, y + 1)];
  	const tileType = node.tile.Type;
  	// Some of the nodes from above might be undefined or not have the same type, so let's filter those out
  	return nodes.filter((record) => record?.tile.TileType === tileType);
	}

	findAdjacentNodes(startNode: ZeldaTileCell = this.cells[0], traversedNodes: ZeldaTileCell[] = []) {
  	const nodes: ZeldaTileCell[] = [];
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
  	const Tiles: IZeldaTileMeta[] = [];
  	const Items: IZeldaItemConfig[] = [];
  	const Enemies: IZeldaEnemyConfig[] = [];
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
  		GroundColor: getNameById(ZeldaWorldColors, this.GroundColor),
  		AccentColor: getNameById(ZeldaWorldColors, this.AccentColor),
  		Tiles,
  		Items,
  		Enemies,
  	};
	}
}
