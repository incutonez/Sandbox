import IKeyValue from '@/interfaces/IKeyValue';

const FA = 'fa';
const Icons: IKeyValue = {
  SORT_DEFAULT_ASC: 'sort-amount-down-alt',
  SORT_DEFAULT_DESC: 'sort-amount-down',
  SORT_STRING_ASC: 'sort-alpha-down',
  SORT_STRING_DESC: 'sort-alpha-down-alt',
  SORT_NUMBER_ASC: 'sort-numeric-down',
  SORT_NUMBER_DESC: 'sort-numeric-down-alt',
  PLUS: 'plus',
  MINUS: 'minus',
  CHECK: 'check',
  TIMES: 'times',
  SQUARE: 'square'
};

for (const key in Icons) {
  Icons[key] = `${FA} ${FA}-${Icons[key]}`;
}

export default Icons;
