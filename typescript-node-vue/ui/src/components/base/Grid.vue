<template>
  <FlexContainer v-bind="$props"
                 border="r b l"
                 extra-cls="grid-container"
                 :direction="FlexDirections.COLUMN">
    <FlexItem class="grid-row grid-header"
              :grow="0">
      <JefGridColumn v-for="(column, colIdx) in columnsCfg"
                     :key="colIdx"
                     :column="column"
                     @sortColumn="onSortColumn" />
    </FlexItem>
    <FlexItem v-for="(record, index) in store"
              :key="index"
              :grow="0"
              class="grid-row grid-row-data"
              :record="record"
              @click="onClickRow">
      <JefGridCell v-for="(cell, rowIdx) in columnsCfg"
                   :key="rowIdx"
                   :record="record"
                   :column="cell" />
    </FlexItem>
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
import _ from 'lodash';
import JefGridCell from '@/components/grid/Cell.vue';
import JefGridColumn from '@/components/grid/Column.vue';
import Sorter from '@/classes/Sorter';
import FlexItem from '@/components/base/FlexItem.vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import {FlexAlignments, FlexDirections, TextAlignments} from '@/statics/Flex';

const DefaultColumnConfig: IColumn = {
  type: ColumnTypes.String,
  text: '',
  cls: [],
  field: '',
  rowSpan: 1,
  colSpan: 1,
  isAssociation: false,
  isParent: false,
  isSortable: true,
  isSorted: false,
  // TODO: I don't think this is necessary here... it only matters in the cell, but we define it on the column config
  formatter: _.identity,
  flex: 1,
  shrink: 1,
  basis: 0,
  width: 0,
  cellCls: '',
  align: TextAlignments.LEFT,
  direction: FlexDirections.ROW
};

interface IData {
  ColumnTypes: IEnum;
  TableCls: ITableCls;
  selectedRow: HTMLElement | null;
  columnsCfg: IColumn[];
}

export default defineComponent({
  name: 'JefGrid',
  components: {FlexContainer, FlexItem, JefGridColumn, JefGridCell},
  extends: FlexContainer,
  props: {
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
      columnsCfg: [],
      FlexDirections: FlexDirections
    } as IData;
  },
  computed: {
    rowCfg(): IColumn[] {
      return this.getRowConfig(this.columnsCfg);
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
    getDefaultColumns(columns: IColumn[]) {
      const out: IColumn[] = [];
      columns.forEach((column) => {
        let children = column.columns;
        if (children) {
          column.isSortable = false;
          column.align = column.align || FlexAlignments.CENTER;
          children = this.getDefaultColumns(children);
        }
        out.push(_.merge({
          columns: children
        }, DefaultColumnConfig, column));
      });
      return out;
    },
    onSortStore() {
      this.store.sorters.forEach((sorter) => {
        // const column = this.$refs[`column-${sorter.field}`] as typeof JefColumn;
        // TODO: Fix??  The problem is that when you add an initial sorter when creating the store,
        // it's not the same instance that a column would have when it gets sorted
        // column.sorter = sorter;
        // column.isSorted = true;
      });
    },
    getRowConfig(columns: IColumn[]) {
      let Config: IColumn[] = [];
      columns.forEach((column) => {
        if (column.columns) {
          column.isSortable = false;
          Config = [...Config, ...this.getRowConfig(column.columns)];
        }
        else {
          // TODO: Potentially do the merging of default column properties here?  Or add formatter?
          Config.push(column);
        }
      });
      return Config;
    },
    onSortColumn(column: IColumn) {
      let sorter = column.sorter;
      if (sorter) {
        sorter.direction = sorter.direction === 'ASC' ? 'DESC' : 'ASC';
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
  &.grid-row-data:hover {
    background-color: darken($grid-header-background-color, 5%);
  }

  &.expand-row .grid-cell .expandable {
    display: block;
  }

  &.grid-header {
    position: sticky;
    top: 0;
    background-color: #FFFFFF;
  }

  /* In order to maximize row lines, only display one line for a cell */
  .grid-cell {
    padding: $grid-cell-padding;
    color: $grid-cell-font-color;
    font-size: $grid-cell-font-size;
    @include ellipsize();

    &.grid-header {
      background-color: $grid-header-background-color;
      font-weight: $grid-header-font-weight;

      .grid-header-text {
        @include ellipsize();
      }

      &.grid-header-parent {
        text-align: center;
      }

      &:hover {
        background-color: darken($grid-header-background-color, 5%);

        &.grid-header-sortable {
          cursor: pointer;
        }
      }
    }

    .expandable {
      display: none;
    }
  }
}
</style>
