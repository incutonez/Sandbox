import { IsArray, IsObject, IsString } from "class-validator";
import { Tiles } from "@/enums/zelda/Tiles";
import { ModelTransform } from "@/models/decorators";
import { ViewModel } from "@/models/ViewModel";
import { ZeldaTargetColor } from "@/models/ZeldaTargetColor";
import { ZeldaTileCell } from "@/models/ZeldaTileCell";
import { type IZeldaEnum } from "@/types/components";
import { isEmpty } from "@/utils/common";
import { replaceColors } from "@/utils/zelda";

export interface IZeldaWorldObjectConfig {
	Type?: string;
	X: number;
	Y: number;
	Colors?: string[];
}

export class ZeldaWorldObject extends ViewModel {
  @IsString()
  src?: string = "";

  @ModelTransform(() => ZeldaTileCell)
  cell?: ZeldaTileCell;

  @IsObject()
  type: IZeldaEnum = {};

  @IsArray()
  @ModelTransform(() => ZeldaTargetColor)
  colors: ZeldaTargetColor[] = [];

  get enumCollection() {
  	return Tiles;
  }

  get imageType() {
  	return "Tiles";
  }

  /**
   * @abstract
   */
  setDefaultValues() { }

  /**
   * This is intentionally not a true getter because of https://stackoverflow.com/q/28950760/1253609
   */
  get Type() {
  	return this.type;
  }

  /**
   * This is a little tricky... we call an underlying method because we don't want to have to
   * make a custom setter in our sub-class... we just want to override the logic that is used.  This
   * is due to having to redefine both the set AND get if you change one or the other.
   * Ref: https://stackoverflow.com/q/28950760/1253609
   */
  set Type(value) {
  	this.type = value;
  	this.setDefaultValues();
  }

  set Colors(colors) {
  	this.colors = colors;
  	this.updateImage();
  }

  get Colors() {
  	return this.colors;
  }

  async updateImage() {
  	if (this.hasImage()) {
  		this.src = await replaceColors({
			  colors: this.Colors,
			  imageEnum: this.Type,
  		});
  	}
  }

  getColors(flatten = false) {
  	const colors = this.Colors.filter((color) => !!color.Value);
  	if (flatten) {
  		return colors.reduce((value: string[], color) => {
  			const config = color.getConfig();
  			if (config) {
  				value = value.concat(config);
  			}
  			return value;
  		}, []);
  	}
  	return colors;
  }

  reset() {
  	this.Type = {};
  }

  getTypeKey(type = this.Type) {
  	const { id } = type;
  	return this.enumCollection.find((item) => item.id === id)?.name;
  }

  /**
   * The image key is slightly different when we're dealing with a Transition, as we need to use the
   * Transparent image instead.
   * We have this method in here, so it can be overridden in sub-classes, like in Cell
   */
  getImageKey() {
  	return this.getTypeKey();
  }

  hasImage() {
  	return !isEmpty(this.Type);
  }

  updateSrc() {
  	this.src = this.Type?.imageSrc;
  }
}
