import IKeyValue from "@incutonez/companycontactsshared/interfaces/IKeyValue";

const FA = "fa";
const Icons = {
  CHECK: "check",
  CHEVRON_DOWN: "chevron-down",
  CROSS: "times",
  DELETE: "trash",
  EDIT: "pen",
  MINUS: "minus",
  PLUS: "plus",
  REFRESH: "redo",
  SORT_DEFAULT_ASC: "sort-amount-down-alt",
  SORT_DEFAULT_DESC: "sort-amount-down",
  SORT_NUMBER_ASC: "sort-numeric-down",
  SORT_NUMBER_DESC: "sort-numeric-down-alt",
  SORT_STRING_ASC: "sort-alpha-down",
  SORT_STRING_DESC: "sort-alpha-down-alt",
  SQUARE: "square",
};
/* We do this because we don't want to have to create an interface for Icons above... that's too
 * tedious.  Instead, we set it as a plain object and get its type below, then we just reassign
 * here as an IKeyValue */
const output: IKeyValue = Icons;

for (const key in Icons) {
  output[key] = `${FA} ${FA}-${output[key]}`;
}

output.getActionIcon = (config: IKeyValue) => {
  return {
    cmp: "JefButton",
    handlers: config.handlers,
    props: {
      iconOnly: true,
      icon: config.icon,
      disabled: config.disabled,
    },
  };
};

export type IIcons = typeof Icons;
export default output;
