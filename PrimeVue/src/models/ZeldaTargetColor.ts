import { IsObject } from "class-validator";
import { ModelInterface, ViewModel } from "@/models/ViewModel";
import { type IOption } from "@/types/components";

export type IZeldaTargetColor = ModelInterface<ZeldaTargetColor>;

export class ZeldaTargetColor extends ViewModel {
  @IsObject()
  Target: IOption = {};

  @IsObject()
  Value?: IOption = {};

  getConfig() {
  	const { Target, Value } = this;
  	if (Target === Value || !Value) {
  		return;
  	}
  	return [Target.name, Value.name] as string[];
  }
}
