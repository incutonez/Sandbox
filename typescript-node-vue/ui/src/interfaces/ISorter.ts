interface Sorter {
  id: string;
  field: string;
  direction: string;
  func?: () => void;
}

class Sorter {
  id = '';
  field = '';
  direction = 'ASC';

  constructor(config: any = {}) {
    Object.assign(this, config);
    if (!this.id) {
      this.id = `sorter-${this.field}`;
    }
  }
}

export default Sorter;
