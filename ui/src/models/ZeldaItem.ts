﻿import { Items } from "@/enums/zelda/Items";
import { ZeldaTileCell } from "@/models/ZeldaTileCell";
import { IZeldaWorldObjectConfig, ZeldaWorldObject } from "@/models/ZeldaWorldObject";

export interface IZeldaItemConfig extends IZeldaWorldObjectConfig {
	Config: {
		Type?: string;
	}
}

export class ZeldaItem extends ZeldaWorldObject {
	/* TODO: Potentially implement colors that can change for the items, but that would involve
   * genericizing the items.png asset to have colors that are common */

	get enumCollection() {
  	return Items;
	}

	get imageType() {
  	return "Items";
	}

	getConfig(): IZeldaItemConfig {
		const { cell = ZeldaTileCell.create() } = this;
		const itemType = this.getTypeKey();
		return {
			X: cell.x,
			Y: cell.y,
			Config: {
				Type: itemType,
			},
		};
	}

	setDefaultValues() {
  	this.Colors = [];
	}
}
