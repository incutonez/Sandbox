const FA = 'fa';

function getIcon(icon: string) {
  return `${FA} ${FA}-${icon}`;
}

export default {
  SORT_DEFAULT_ASC: getIcon('sort-amount-down-alt'),
  SORT_DEFAULT_DESC: getIcon('sort-amount-down'),
  SORT_STRING_ASC: getIcon('sort-alpha-down'),
  SORT_STRING_DESC: getIcon('sort-alpha-down-alt'),
  SORT_NUMBER_ASC: getIcon('sort-numeric-down'),
  SORT_NUMBER_DESC: getIcon('sort-numeric-down-alt'),
  PLUS: getIcon('plus'),
  MINUS: getIcon('minus')
};
