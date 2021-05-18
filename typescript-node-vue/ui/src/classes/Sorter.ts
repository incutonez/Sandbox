interface ISorter {
  id: string;
  field: string;
  direction: string;
  func: () => void;
}

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
