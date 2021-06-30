import IKeyValue from '@/interfaces/IKeyValue';
import Styles from '@/statics/Styles';

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
  CROSS: 'times',
  SQUARE: 'square',
  REFRESH: 'redo',
  EDIT: 'pen',
  DELETE: 'trash',
  CHEVRON_DOWN: 'chevron-down'
};

for (const key in Icons) {
  Icons[key] = `${FA} ${FA}-${Icons[key]}`;
}

Icons.getActionIcon = (config: IKeyValue) => {
  return {
    cmp: 'JefButton',
    handlers: config.handlers,
    props: {
      iconOnly: true,
      icon: config.icon,
      disabled: config.disabled
    }
  };
};

export default Icons;
