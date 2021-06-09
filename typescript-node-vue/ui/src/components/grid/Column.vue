<template>
  <FlexContainer :direction="FlexDirections.COLUMN"
                 :grow="column.width ? 0 : column.flex"
                 :border="border"
                 :pack="FlexJustifications.CENTER"
                 :class="extraCls"
                 :background-color="false"
                 :width="column.width"
                 @click="onClickColumn">
      <span :style="`text-align: ${column.align};`"
            class="grid-cell">
        {{ column.text }}
        <Icon v-if="column.isSorted"
              :icon-name="sortIcon" />
      </span>
    <template v-if="column.columns">
      <FlexContainer border="t">
        <JefGridColumn v-for="(col, index) in column.columns"
                       :key="index"
                       :border="index + 1 === column.columns.length ? false : 'r'"
                       :column="col"
                       @sortColumn="onSortChildColumn" />
      </FlexContainer>
    </template>
  </FlexContainer>
</template>

<script lang="ts">
import IColumn from '../../interfaces/IColumn';
import {defineComponent, PropType} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';
import Icons from '@/statics/Icons';
import Icon from '@/components/Icon.vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import {FlexAlignments, FlexDirections, FlexJustifications} from '@/statics/Flex';

export default defineComponent({
  name: 'JefGridColumn',
  components: {
    FlexContainer,
    Icon
  },
  props: {
    column: {
      type: Object as PropType<IColumn>,
      default: () => {
        return {};
      }
    },
    border: {
      type: [String, Boolean],
      default: 'b r'
    }
  },
  data() {
    return {
      FlexDirections: FlexDirections,
      FlexAlignments: FlexAlignments,
      FlexJustifications: FlexJustifications
    };
  },
  computed: {
    parentColumn() {
      if (this.column.columns) {
        const clone: IColumn = Object.assign({}, this.column);
        delete clone.columns;
        clone.direction = FlexDirections.COLUMN;
        return clone;
      }
      return null;
    },
    sortIcon() {
      let icon = '';
      const direction = this.column.sorter?.direction;
      switch (this.column.type) {
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
    },
    extraCls() {
      const cls = ['grid-header'];
      if (this.column.isSortable) {
        cls.push('grid-header-sortable');
      }
      return cls.join(' ');
    }
  },
  methods: {
    onSortChildColumn(column: IColumn) {
      this.$emit('sortColumn', column);
    },
    onClickColumn() {
      if (this.column.isSortable) {
        this.$emit('sortColumn', this.column);
      }
    }
  }
});
</script>

<style scoped>

</style>
