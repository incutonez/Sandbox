<template>
  <FlexContainer :direction="FlexDirections.COLUMN"
                 :grow="column.width ? 0 : column.flex"
                 :border="border"
                 :class="extraCls"
                 :background-color="false"
                 :width="column.width"
                 @click="onClickColumn">
    <FlexContainer :border="false"
                   :pack="column.align"
                   :align="FlexAlignments.CENTER"
                   :background-color="false"
                   :grow="1"
                   class="grid-header-child">
      <span class="grid-cell">
        {{ column.text }}
      </span>
      <Icon v-if="column.isSorted"
            class="sort-icon"
            :icon-name="sortIcon" />
    </FlexContainer>
    <template v-if="column.columns">
      <FlexContainer border="t">
        <JefGridColumn v-for="(col, index) in column.columns"
                       :key="index"
                       :border="index + 1 === column.columns.length ? false : 'r'"
                       :column="col"
                       @sort="onSortChildColumn" />
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
  emits: [
    'sort'
  ],
  data() {
    return {
      FlexDirections: FlexDirections,
      FlexAlignments: FlexAlignments,
      FlexJustifications: FlexJustifications
    };
  },
  computed: {
    sortIcon() {
      let icon = '';
      const isAsc = this.column.sorter?.isAsc();
      switch (this.column.type) {
        case ColumnTypes.String:
          icon = isAsc ? Icons.SORT_STRING_ASC : Icons.SORT_STRING_DESC;
          break;
        case ColumnTypes.Number:
          icon = isAsc ? Icons.SORT_NUMBER_ASC : Icons.SORT_NUMBER_DESC;
          break;
        default:
          icon = isAsc ? Icons.SORT_DEFAULT_ASC : Icons.SORT_DEFAULT_DESC;
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
      this.emitSort(column);
    },
    onClickColumn() {
      if (this.column.isSortable) {
        this.emitSort(this.column);
      }
    },
    emitSort(column: IColumn) {
      this.$emit('sort', column);
    }
  }
});
</script>

<style scoped>

</style>
