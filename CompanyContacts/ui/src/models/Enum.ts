import IEnum from "ui/interfaces/IEnum";
import Model from "ui/classes/Model";

interface Enum extends IEnum {

}

class Enum extends Model {
  static proxy = {
    type: "memory",
  };

  get fields() {
    return [];
  }
}

export default Enum;
