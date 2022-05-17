import { Model } from "ui/classes/models/Model.js";
import { WorldColors } from "ui/classes/enums/WorldColors.js";
import {
  isArray,
  isObject,
} from "@incutonez/shared";

const IsHex = /^[0-9a-f]+$/i;
export class TargetColor extends Model {
  Target = null;
  Value = null;

  constructor(Target, Value) {
    super();
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
    this.Target = Target;
    this.Value = Value;
  }

  getConfig() {
    return [WorldColors.getKey(this.Target), WorldColors.getKey(this.Value)];
  }
}
