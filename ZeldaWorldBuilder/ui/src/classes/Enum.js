// We use the relative pathing here, so our copyEnums script can make use of this class
import { Model } from "../classes/models/Model.js";

export class Enum extends Model {
  id = "";
  value = "";

  constructor(data) {
    super();
    this.set(data);
  }
}
