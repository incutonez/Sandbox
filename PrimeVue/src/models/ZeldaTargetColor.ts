import { IsObject } from "class-validator";
import { ModelInterface, ViewModel } from "@/models/ViewModel";
import { type IZeldaEnum } from "@/types/components";

export type IZeldaTargetColor = ModelInterface<ZeldaTargetColor>;

export class ZeldaTargetColor extends ViewModel {
  @IsObject()
  Target: IZeldaEnum = {};

  @IsObject()
  Value?: IZeldaEnum = {};

  getConfig() {
  	const { Target, Value } = this;
  	if (Target === Value || !Value) {
  		return;
  	}
  	return [Target.name, Value.name] as string[];
  }
}
