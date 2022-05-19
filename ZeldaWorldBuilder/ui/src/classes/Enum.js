import { Model } from "@incutonez/shared";

export class Enum extends Model {
  getDefaultFields() {
    return [{
      name: "id",
      type: Number,
    }, {
      name: "value",
      type: String,
    }];
  }
}
