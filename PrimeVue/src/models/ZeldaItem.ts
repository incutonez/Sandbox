﻿import { ZeldaItems } from "@/enums/ZeldaItems";
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
  	return ZeldaItems;
	}

	get imageType() {
  	return "Items";
	}

	getConfig(): IZeldaItemConfig {
  	return {
  		X: this.cell.x,
  		Y: this.cell.y,
  		Config: {
  			Type: this.getTypeKey(),
  		},
  	};
	}

	setDefaultValues() {
  	this.Colors = [];
	}
}
