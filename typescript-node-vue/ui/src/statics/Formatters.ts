import Icons from '@/statics/Icons';
import Styles from '@/statics/Styles';

interface IProps {
  iconName: string;
}

interface IBoolIcon {
  cmp: string;
  props: IProps;
}

function boolIcon(value: boolean): IBoolIcon {
  return {
    cmp: 'Icon',
    props: {
      iconName: value ? `${Icons.CHECK} ${Styles.FONT_GREEN}` : `${Icons.TIMES} ${Styles.FONT_RED}`
    }
  };
}

export default {
  boolIcon: boolIcon,
  boolIconTrue(value: boolean): IBoolIcon | string {
    return value ? boolIcon(value) : '';
  },
  mmddyyyy(value: string | Date): string {
    if (!(value instanceof Date)) {
      value = new Date(value);
    }
    return `${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getDate().toString().padStart(2, '0')}/${value.getFullYear()}`;
  }
};