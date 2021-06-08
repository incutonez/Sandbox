import Icons from '@/statics/Icons';
import Icon from '@/components/Icon.vue';
import Styles from '@/statics/Styles';

function boolIcon(value: boolean) {
  return {
    cmp: 'Icon',
    props: {
      iconName: value ? `${Icons.CHECK} ${Styles.FONT_GREEN}` : `${Icons.TIMES} ${Styles.FONT_RED}`
    }
  };
}

export default {
  boolIcon: boolIcon,
  boolIconTrue(value: boolean) {
    return value ? boolIcon(value) : '';
  },
  mmddyyyy(value: string | Date) {
    if (!(value instanceof Date)) {
      value = new Date(value);
    }
    return `${(value.getMonth() + 1).toString().padStart(2, '0')}/${value.getDate().toString().padStart(2, '0')}/${value.getFullYear()}`;
  }
};
