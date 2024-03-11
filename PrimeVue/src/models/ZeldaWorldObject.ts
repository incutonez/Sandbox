import { IsArray, IsObject, IsString } from "class-validator";
import Jimp from "jimp";
import { ZeldaTiles, ZeldaTilesNone } from "@/enums/ZeldaTiles";
import { ModelTransform } from "@/models/decorators";
import { ViewModel } from "@/models/ViewModel";
import { ZeldaTargetColor } from "@/models/ZeldaTargetColor";
import { ZeldaTileCell } from "@/models/ZeldaTileCell";
import { type IOption } from "@/types/components";
import { isEmpty, pluck } from "@/utils/common";
import { getImage, replaceColor } from "@/utils/zelda";

export interface IZeldaWorldObjectConfig {
	Type?: string;
	X: number;
	Y: number;
	Colors?: string[];
}

export class ZeldaWorldObject extends ViewModel {
  @IsString()
  image? = "";

  @IsString()
  src?: string | Jimp = "";

  @ModelTransform(ZeldaTileCell)
  cell = ZeldaTileCell.create();

  @IsObject()
  type?: IOption = {};

  @IsArray()
  @ModelTransform(ZeldaTargetColor)
  colors: ZeldaTargetColor[] = [];

  get enumCollection() {
  	return ZeldaTiles;
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
  	this.updateSrc();
  }

  set Colors(colors) {
  	this.colors = colors;
  	this.updateImage();
  }

  get Colors() {
  	return this.colors;
  }

  async updateImage() {
  	let image: string | undefined;
  	if (this.hasImage()) {
  		const key = this.getImageKey();
  		const colors = this.getColors();
  		image = await replaceColor({
  			image: key,
  			type: this.imageType,
  			targetColors: pluck(colors, "Target"),
  			replaceColors: pluck(colors, "Value"),
  		});
  	}
  	this.image = image;
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
  	this.Type = undefined;
  }

  getTypeKey(type = this.Type) {
  	return this.enumCollection.find((item) => item === type)?.name;
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
  	return !(isEmpty(this.Type) || this.Type === ZeldaTilesNone);
  }

  async updateSrc() {
  	const name = this.getImageKey();
  	let src;
  	if (this.hasImage()) {
  		src = await getImage({
  			name,
  			type: this.imageType,
  			encode: true,
  		});
  	}
  	this.src = src;
  }
}
