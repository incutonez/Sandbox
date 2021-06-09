import ISorter from '@/interfaces/ISorter';

interface Sorter extends ISorter {
}

class Sorter {
  constructor(config: ISorter) {
    this.field = config.field;
    this.id = config.id;
    this.direction = config.direction;
    this.func = config.func;
  }

  isAsc() {
    return this.direction === 'ASC';
  }

  isDesc() {
    return this.direction === 'DESC';
  }
}

export default Sorter;
