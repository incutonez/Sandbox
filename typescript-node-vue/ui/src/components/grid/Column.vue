<template>
  <th :class="clsFm"
      scope="col"
      :rowspan="initialConfig.rowSpan"
      :colspan="initialConfig.colSpan">
    {{ initialConfig.text }}
  </th>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';
import IColumn from '@/interfaces/IColumn';
import _ from 'lodash';

const DefaultConfig: IColumn = {
  type: ColumnTypes.String,
  text: '',
  cls: [],
  field: '',
  rowSpan: 1,
  colSpan: 1
};

export default defineComponent({
  name: 'Column',
  props: {
    config: {
      type: Object as () => IColumn,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    initialConfig(): IColumn {
      return _.merge({}, DefaultConfig, this.config);
    },
    clsFm(): string {
      const Config = this.initialConfig;
      let cls = Config.cls;
      switch (Config.type) {
        case ColumnTypes.String:
          break;
        case ColumnTypes.Number:
          break;
      }
      return cls.join(' ');
    }
  }
});
</script>
