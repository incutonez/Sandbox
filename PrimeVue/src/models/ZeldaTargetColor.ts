import { IsObject } from "class-validator";
import { ViewModel } from "@/models/ViewModel";
import { type IOption } from "@/types/components";

export class ZeldaTargetColor extends ViewModel {
  @IsObject()
  Target: IOption = {};

  @IsObject()
  Value: IOption = {};

  getConfig() {
  	const { Target, Value } = this;
  	if (Target === Value || !Value) {
  		return;
  	}
  	return [Target.name, Value.name] as string[];
  }
}
