import Icons from "ui/statics/Icons";
import Styles from "ui/statics/Styles";
import utilities from "ui/utilities";
import { IFieldValue } from "ui/interfaces/Components";
import IKeyValue from "@jef/shared/interfaces/IKeyValue";

interface IProps {
  iconName: string;
}

interface IBoolIcon {
  cmp: string;
  props: IProps;
}

function boolIcon(value: boolean): IBoolIcon {
  return {
    cmp: "Icon",
    props: {
      iconName: value ? `${Icons.CHECK} ${Styles.FONT_GREEN}` : `${Icons.CROSS} ${Styles.FONT_RED}`,
    },
  };
}

// Accessing this is only made possible by logic done in main.ts
const Enums = window.Enums;
const Formatters: IKeyValue = {
  dashIfNull(value: any, record: any, nextFormatter?: string): string {
    if (utilities.isEmpty(value)) {
      return "-";
    }
    return nextFormatter ? Formatters[nextFormatter](value) : value;
  },
  boolIcon: boolIcon,
  boolIconTrue(value: boolean): IBoolIcon | string {
    return value ? boolIcon(value) : "";
  },
  mmddyyyy(value: string | Date): string {
    if (!(value instanceof Date)) {
      value = new Date(value);
    }
    return `${(value.getMonth() + 1).toString().padStart(2, "0")}/${value.getDate().toString().padStart(2, "0")}/${value.getFullYear()}`;
  },
  positionType(value: number): IFieldValue {
    const found = Enums.PositionTypes.findRecord("Value", value);
    return found && found.get("Description");
  },
};

export default Formatters;