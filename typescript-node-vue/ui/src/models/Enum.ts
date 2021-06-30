import Model from '@/classes/Model';
import IEnum from '@/interfaces/IEnum';

interface Enum extends IEnum {

}

class Enum extends Model {
  static proxy = {
    type: 'memory'
  };
}

export default Enum;
