import { Model } from "@incutonez/shared";

export class Enum extends Model {
  getTrackChanges() {
    return false;
  }

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
