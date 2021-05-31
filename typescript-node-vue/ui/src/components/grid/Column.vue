<template>
  <template v-if="column.columns">
    <div>
      <div class="grid-cell">
        {{ column.text }}
      </div>
      <div class="grid-nested">
        <JefGridColumn v-for="(col, colIdx) in column.columns"
                       :key="colIdx"
                       :column="col"
                       @sortColumn="onSortChildColumn" />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="grid-cell"
         @click="onClickColumn">
      {{ column.text }}
      <Icon v-if="column.isSorted"
            :icon-name="sortIcon" />
    </div>
  </template>
</template>

<script lang="ts">
import IColumn from '../../interfaces/IColumn';
import {defineComponent} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';
import Icons from '@/statics/Icons';
import Icon from '@/components/Icon.vue';

export default defineComponent({
  name: 'JefGridColumn',
  components: {Icon},
  props: {
    column: {
      type: Object as () => IColumn,
      default: () => {
        return {};
      }
    }
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
