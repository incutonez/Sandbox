import { Type } from "class-transformer";
import { IsArray, IsString } from "class-validator";
import { Enemy } from "ui/classes/models/Enemy.js";
import { Grid } from "ui/classes/models/Grid.js";
import { Item } from "ui/classes/models/Item.js";
import { Tile } from "ui/classes/models/Tile.js";
import { IsRequired } from "@/models/decorators";
import { ViewModel } from "@/models/ViewModel";
import { ZeldaTileGrid } from "@/models/ZeldaTileGrid";

export class ZeldaTileCell extends ViewModel {
  @IsArray()
  coordinates: number[] = [];

  @IsRequired()
  @IsString()
  name = "";

  @Type(() => ZeldaTileGrid)
  grid = ZeldaTileGrid.create();
  getDefaultFields() {
  	return [{
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
  	}, {
  		name: "enemy",
  		type: Enemy,
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

  getConfig({ Tiles, Items, Enemies }) {
  	const { tile, item, enemy } = this;
  	if (tile.hasImage()) {
  		const tileType = tile.getTypeKey();
  		const config = tile.getConfig();
  		const found = Tiles.find(({ Type }) => Type === tileType);
  		if (found) {
  			found.Children.push(config);
  		}
  		else {
  			Tiles.push({
  				Type: tileType,
  				Children: [config],
  			});
  		}
  	}
  	if (item.hasImage()) {
  		Items.push(item.getConfig());
  	}
  	if (enemy.hasImage()) {
  		Enemies.push(enemy.getConfig());
  	}
  }
}
