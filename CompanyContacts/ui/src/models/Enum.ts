import IEnum from '@/interfaces/IEnum';
import Model from '@/classes/Model';

interface Enum extends IEnum {

}

class Enum extends Model {
  static proxy = {
    type: 'memory'
  };

  get fields() {
    return [];
  }
}

export default Enum;
