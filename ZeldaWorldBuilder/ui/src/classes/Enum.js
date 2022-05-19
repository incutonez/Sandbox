import { Model } from "@incutonez/shared";

export class Enum extends Model {
  get fields() {
    return [{
      name: "id",
      type: Number,
    }, {
      name: "value",
      type: String,
    }];
  }
}
