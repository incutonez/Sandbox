﻿import { IsArray, IsString } from "class-validator";
import { IsRequired, ModelTransform } from "@/models/decorators";
import { Parent, ViewModel } from "@/models/ViewModel";
import { ZeldaEnemy } from "@/models/ZeldaEnemy";
import { ZeldaItem } from "@/models/ZeldaItem";
import { ILoadData } from "@/models/ZeldaScreen";
import { ZeldaTile } from "@/models/ZeldaTile";

export class ZeldaTileCell extends ViewModel {
  @IsArray()
  Coordinates: number[] = [];

  @IsRequired()
  @IsString()
  Name = "";

	@ModelTransform(() => ZeldaTile)
	tile = ZeldaTile.create();

	@ModelTransform(() => ZeldaItem)
	item = ZeldaItem.create();

	@ModelTransform(() => ZeldaEnemy)
	enemy = ZeldaEnemy.create();

	init() {
		this.tile.cell = this;
		this.item.cell = this;
		this.enemy.cell = this;
	}

	reset() {
  	this.tile.reset();
	}

	/* TODO: Potentially don't lean on there being a parent and just return the x, y coords as a string and
	 * have the grid do a lookup to find that cell with that string key */
	getIndex() {
  	return this[Parent]?.cells.indexOf(this);
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

	getConfig({ Tiles = [], Items = [], Enemies = [] }: ILoadData) {
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
  				Type: tileType!,
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
