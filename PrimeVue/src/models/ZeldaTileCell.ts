import { IsArray, IsString } from "class-validator";
import { IsRequired, ModelTransform } from "@/models/decorators";
import { ViewModel } from "@/models/ViewModel";
import { ZeldaEnemy } from "@/models/ZeldaEnemy";
import { ZeldaItem } from "@/models/ZeldaItem";
import { ILoadData, ZeldaScreen } from "@/models/ZeldaScreen";
import { ZeldaTile } from "@/models/ZeldaTile";

export class ZeldaTileCell extends ViewModel {
  @IsArray()
  Coordinates: number[] = [];

  @IsRequired()
  @IsString()
  Name = "";

  @ModelTransform(() => ZeldaScreen)
  grid?: ZeldaScreen;

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

	getIndex() {
  	return this.grid?.cells.indexOf(this);
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
