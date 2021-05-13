import {defineComponent} from 'vue';

enum ColumnTypes {
  String = 1,
  Number = 2,
  Object = 3,
  Array = 4
}

export default defineComponent({
  name: 'column',
  props: {
    /**
     * @property
     * This gets applied to the th tag in the class property
     */
    cls: {
      type: [Array, String],
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: ColumnTypes.String
    },
    field: {
      type: String,
      default: ''
    }
  },
  computed: {
    clsFm: function(): string {
      let cls = this.cls;
      if (!Array.isArray(cls)) {
        cls = cls.split(' ');
      }
      switch (this.type) {
        case ColumnTypes.String:
          break;
        case ColumnTypes.Number:
          cls.push('mdc-data-table__header-cell--numeric');
          break;
      }
      return cls.join(' ');
    }
  }
});
