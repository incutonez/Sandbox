<template>
  <th :class="clsFm"
      scope="col"
      :rowspan="initialConfig.rowSpan"
      :colspan="initialConfig.colSpan"
      @click="onClickColumn">
    {{ initialConfig.text }}
    <Icon v-if="isSorted"
          :icon-name="sortIcon" />
  </th>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';
import IColumn from '@/interfaces/IColumn';
import _ from 'lodash';
import ISorter from '@/interfaces/ISorter';
import Icons from '@/statics/Icons';
import Icon from '@/components/Icon.vue';

const DefaultConfig: IColumn = {
  type: ColumnTypes.String,
  text: '',
  cls: [],
  field: '',
  rowSpan: 1,
  colSpan: 1,
  isAssociation: false,
  isParent: false,
  isSortable: true
};

export default defineComponent({
  name: 'Column',
  components: {
    Icon
  },
  props: {
    config: {
      type: Object as () => IColumn,
      default: () => {
        return {};
      }
    }
  },
  data: () => {
    return {
      isSorted: false,
      initialConfig: {} as IColumn
    };
  },
  watch: {
    config: {
      immediate: true,
      handler(newValue) {
        const Config = _.merge({}, DefaultConfig, newValue);
        // Can't sort array associations
        if (Config.isAssociation) {
          Config.isSortable = false;
        }
        this.initialConfig = Config;
      }
    }
  },
  computed: {
    clsFm(): string {
      const Config = this.initialConfig;
      const cls = Config.cls;
      switch (Config.type) {
        case ColumnTypes.String:
          break;
        case ColumnTypes.Number:
          break;
      }
      return cls.join(' ');
    },
    sortIcon() {
      let icon = '';
      const Config = this.initialConfig;
      const direction = this.initialConfig.sorter?.direction;
      switch (Config.type) {
        case ColumnTypes.String:
          icon = direction === 'ASC' ? Icons.SORT_STRING_ASC : Icons.SORT_STRING_DESC;
          break;
        case ColumnTypes.Number:
          icon = direction === 'ASC' ? Icons.SORT_NUMBER_ASC : Icons.SORT_NUMBER_DESC;
          break;
        default:
          icon = direction === 'ASC' ? Icons.SORT_DEFAULT_ASC : Icons.SORT_DEFAULT_DESC;
          break;
      }
      return icon;
    }
  },
  methods: {
    onClickColumn() {
      if (this.initialConfig.isSortable) {
        let sorter = this.initialConfig.sorter;
        if (sorter) {
          sorter.direction = sorter.direction === 'ASC' ? 'DESC' : 'ASC';
        }
        else {
          this.initialConfig.sorter = new ISorter({
            field: this.initialConfig.field,
            direction: 'ASC'
          });
        }
        this.$emit('sortColumn', this);
      }
    }
  }
});
</script>
