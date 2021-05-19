import ISorter from '@/interfaces/ISorter';

interface Sorter extends ISorter {
}

class Sorter {
  id = '';
  field = '';
  direction = 'ASC';

  constructor(config: any = {}) {
    Object.assign(this, config);
  }
}

export default Sorter;
