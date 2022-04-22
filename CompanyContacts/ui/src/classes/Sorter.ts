import ISorter from "ui/interfaces/ISorter";
import utilities from "ui/utilities";

interface Sorter extends ISorter {
}

const ASC = "ASC";
const DESC = "DESC";

class Sorter {
  clearCount = 1;

  constructor(config: ISorter) {
    this.field = config.field;
    this.id = config.id;
    this.direction = config.direction;
    this.func = config.func;
    this.clearThreshold = utilities.isDefined(config.clearThreshold) ? config.clearThreshold : 2;
  }

  isAsc() {
    return this.direction === ASC;
  }

  isDesc() {
    return this.direction === DESC;
  }

  changeDirection(): boolean {
    if (this.clearCount === this.clearThreshold) {
      this.clearCount = 0;
      return true;
    }
    this.direction = this.direction === ASC ? DESC : ASC;
    this.clearCount++;
    return false;
  }
}

export default Sorter;
