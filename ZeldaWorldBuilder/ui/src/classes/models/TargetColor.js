import { WorldColors } from "ui/classes/enums/WorldColors.js";
import {
  isArray,
  isObject,
  Model,
} from "@incutonez/shared";

const IsHex = /^[0-9a-f]+$/i;
export class TargetColor extends Model {
  get fields() {
    return [{
      // This is actually the value from WorldColors (it's a hex value)
      name: "Target",
      type: String,
    }, {
      // This is actually the value from WorldColors (it's a hex value)
      name: "Value",
      type: String,
    }];
  }

  constructor(Target, Value) {
    if (isObject(Target)) {
      ({ Target, Value } = Target);
    }
    else if (isArray(Target)) {
      [Target, Value] = Target;
    }
    // Convert to our hex values, as that's how it's used in the app
    if (Target && !IsHex.test(Target)) {
      Target = WorldColors.getValue(Target);
    }
    if (Value && !IsHex.test(Value)) {
      Value = WorldColors.getValue(Value);
    }
    super({
      Target,
      Value,
    });
  }

  getConfig() {
    const { Target, Value } = this;
    if (Target === Value || !Value) {
      return;
    }
    return [WorldColors.getKey(Target), WorldColors.getKey(Value)];
  }
}
