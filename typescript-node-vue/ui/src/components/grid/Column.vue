<template>
  <template v-if="column.columns">
    <FlexContainer :direction="FlexDirections.COLUMN"
                   :grow="column.flex"
                   :align="FlexAlignments.AUTO"
                   border="b r">
      <div :class="extraCls">
        {{ column.text }}
      </div>
      <FlexContainer :grow="1"
                     border="t">
        <JefGridColumn v-for="(col, colIdx) in column.columns"
                       :key="colIdx"
                       :column="col"
                       :border="colIdx + 1 === column.columns.length ? false : 'r'"
                       @sortColumn="onSortChildColumn" />
      </FlexContainer>
    </FlexContainer>
  </template>
  <template v-else>
    <FlexItem :extra-cls="extraCls"
              :border="border"
              :grow="column.flex"
              @click="onClickColumn">
      {{ column.text }}
      <Icon v-if="column.isSorted"
            :icon-name="sortIcon" />
    </FlexItem>
  </template>
</template>

<script lang="ts">
import IColumn from '../../interfaces/IColumn';
import {defineComponent} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';
import Icons from '@/statics/Icons';
import Icon from '@/components/Icon.vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import {FlexAlignments, FlexDirections} from '@/statics/Flex';
import FlexItem from '@/components/base/FlexItem.vue';

export default defineComponent({
  name: 'JefGridColumn',
  components: {FlexItem, FlexContainer, Icon},
  props: {
    column: {
      type: Object as () => IColumn,
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
      FlexAlignments: FlexAlignments
    };
  },
  computed: {
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
      const cls = ['grid-cell grid-header'];
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
