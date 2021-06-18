<template>
  <FlexContainer v-bind="$props"
                 :border="border"
                 extra-cls="grid-container"
                 :direction="FlexDirections.COLUMN">
    <FlexContainer class="grid-row grid-header"
                   :border="false">
      <JefGridColumn v-for="(column, colIdx) in columnsCfg"
                     :key="colIdx"
                     :column="column"
                     :border="getColumnBorder(colIdx, column)"
                     @sort="onSortColumn"
                     @hide="onHideColumn"
                     @show="onShowColumn" />
    </FlexContainer>
    <FlexContainer :grow="1"
                   :border="false"
                   :align="FlexAlignments.AUTO"
                   :direction="FlexDirections.COLUMN"
                   :class="gridBodyCls">
      <FlexContainer v-for="(record, index) in store"
                     :key="index"
                     class="grid-row grid-row-data"
                     :record="record"
                     :border="false"
                     @click="onClickRow">
        <JefGridCell v-for="(cell, rowIdx) in columnsCfg"
                     :key="rowIdx"
                     :record="record"
                     :border="getColumnBorder(rowIdx, cell)"
                     :column="cell" />
      </FlexContainer>
      <LoadingMask :hidden="!viewLoading" />
    </FlexContainer>
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Store from '@/classes/Store';
import ColumnTypes from '@/statics/ColumnTypes';
import {TableCls} from '@/statics/TableCls';
import ITableCls from '@/interfaces/ITableCls';
import IEnum from '@/interfaces/IEnum';
import IColumn from '@/interfaces/IColumn';
import Model from '@/classes/Model';
import JefGridCell from '@/components/grid/Cell.vue';
import JefGridColumn from '@/components/grid/Column.vue';
import Sorter from '@/classes/Sorter';
import FlexContainer from '@/components/base/FlexContainer.vue';
import {FlexAlignments, FlexDirections, TextAlignments} from '@/statics/Flex';
import LoadingMask from '@/components/base/LoadingMask.vue';
import utilities from '@/utilities';

const DefaultColumnConfig: IColumn = {
  type: ColumnTypes.String,
  text: '',
  cls: [],
  field: '',
  rowSpan: 1,
  colSpan: 1,
  isAssociation: false,
  isParent: false,
  sortable: true,
  isSorted: false,
  // TODO: I don't think this is necessary here... it only matters in the cell, but we define it on the column config
  formatter: utilities.identityFn,
  flex: 1,
  shrink: 1,
  basis: 0,
  width: 0,
  cellCls: '',
  align: TextAlignments.LEFT,
  direction: FlexDirections.ROW,
  hidden: false,
  border: 'b r',
  cellBorder: 'r'
};

interface IData {
  ColumnTypes: IEnum;
  TableCls: ITableCls;
  selectedRow: HTMLElement | null;
  columnsCfg: IColumn[];
}

export default defineComponent({
  name: 'JefGrid',
  components: {
    LoadingMask,
    FlexContainer,
    JefGridColumn,
    JefGridCell
  },
  extends: FlexContainer,
  props: {
    border: {
      type: [String, Boolean],
      default: 'r b l'
    },
    columns: {
      type: Array as () => IColumn[],
      default: () => {
        return [];
      }
    },
    store: {
      type: Store,
      default: () => {
        return new Store(Model);
      }
    },
    multiSort: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ColumnTypes: ColumnTypes,
      TableCls: TableCls,
      selectedRow: null,
      columnsCfg: []
    } as IData;
  },
  computed: {
    viewLoading(): boolean {
      return this.store.loading;
    },
    gridBodyCls(): string {
      return this.viewLoading ? 'loading-mask' : '';
    }
  },
  watch: {
    columns: {
      immediate: true,
      handler(columns) {
        this.columnsCfg = this.getDefaultColumns(columns);
      }
    },
    store: {
      immediate: true,
      handler(newStore, oldStore) {
        if (oldStore) {
          oldStore.off('sort', this.onSortStore);
        }
        if (newStore) {
          newStore.on('sort', this.onSortStore);
        }
      }
    }
  },
  methods: {
    getColumnBorder(index: number, column: IColumn) {
      // If we're at the very last column, don't add the default border right
      return index + 1 === this.columnsCfg.length ? 'b' : column.border;
    },
    getDefaultColumns(columns: IColumn[], isNested?: boolean) {
      const out: IColumn[] = [];
      const sorters = this.store.sorters;
      columns.forEach((column) => {
        let children = column.columns;
        if (children) {
          column.sortable = false;
          column.align = column.align || FlexAlignments.CENTER;
          children = this.getDefaultColumns(children, true);
        }
        if (isNested) {
          column.border = utilities.isEmpty(column.border) ? 'r' : column.border;
        }
        // Match column's sorter with any defined sorters in the store
        for (let i = 0; i < sorters.length; i++) {
          const sorter = sorters[i];
          if (sorter.field === column.field) {
            column.sorter = sorter;
            break;
          }
        }
        out.push(utilities.merge({
          columns: children
        }, DefaultColumnConfig, column));
      });
      return out;
    },
    syncColumnsSort(columns: IColumn[]) {
      const sorters = this.store.sorters;
      columns.forEach((column) => {
        const sorter = column.sorter;
        // We have a sorter defined, so let's see if it exists in the store's sorters
        if (sorter) {
          // Column's sorter was removed, so let's update
          column.isSorted = sorters.indexOf(sorter) !== -1;
        }
        else if (column.columns) {
          this.syncColumnsSort(column.columns);
        }
        else {
          column.isSorted = false;
        }
      });
    },
    onSortStore() {
      this.syncColumnsSort(this.columnsCfg);
    },
    // We pass the reference back to the parent, so we can update its value in the proper fashion
    onHideColumn(column: IColumn) {
      column.hidden = true;
    },
    onShowColumn(column: IColumn) {
      column.hidden = false;
    },
    onSortColumn(column: IColumn) {
      let sorter = column.sorter;
      if (sorter) {
        const shouldClear = sorter.changeDirection();
        if (shouldClear) {
          column.isSorted = false;
          this.store.removeSorter(sorter);
          return;
        }
      }
      else {
        column.sorter = new Sorter({
          field: column.field,
          direction: 'ASC'
        });
      }
      if (column.isSorted) {
        this.store.doSort(this.store.sorters);
      }
      else if (column.sorter) {
        column.isSorted = true;
        // TODO: Issue on sort... if first row is expanded, it sticks to whatever's sorted at top
        this.store.addSorter(column.sorter, !this.multiSort);
      }
    },
    onClickRow(event: Event) {
      const Target: HTMLTableCellElement = event.target as HTMLTableCellElement;
      // TODO: Would we ever have to worry about event.target not being the td?
      if (this.selectedRow) {
        this.selectedRow.classList.remove(TableCls.ACTIVE);
      }
      this.selectedRow = Target.parentElement;
      this.selectedRow?.classList.add(TableCls.ACTIVE);
    }
  }
});
</script>

<style lang="scss">
.grid-row {
  &.grid-row-data {
    .grid-cell {
      height: $grid-cell-height;
    }

    &:hover {
      background-color: darken($grid-header-background-color, 5%) !important;
    }
  }

  &.expand-row .grid-cell.expandable {
    display: block;
    border-top: $panel-border-width $panel-border-style $panel-border-color;
  }

  .grid-cell-icon {
    font-size: $grid-cell-font-size;
    line-height: $grid-cell-height;
    cursor: pointer;
  }

  .grid-header {
    position: sticky;
    top: 0;
    background-color: $grid-header-background-color;
    font-weight: $grid-header-font-weight;

    .grid-cell {
      color: $grid-header-font-color;
      height: $grid-header-height;
    }

    .sort-icon {
      margin: 0 2px 0 0;
    }

    &.grid-header-sortable {
      cursor: pointer;
    }

    .grid-header-child:hover {
      background-color: darken($grid-header-background-color, 5%);
    }
  }

  .grid-cell-hidden {
    display: none !important;
  }

  /* In order to maximize row lines, only display one line for a cell */
  .grid-cell {
    padding: $grid-cell-padding;
    color: $grid-cell-font-color;
    font-size: $grid-cell-font-size;
    @include ellipsize();

    &.expandable {
      display: none;
    }
  }
}
</style>
