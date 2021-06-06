<template>
  <ol class="grid-container">
    <li class="grid-row grid-header">
      <JefGridColumn v-for="(column, colIdx) in columnsCfg"
                     :key="colIdx"
                     :column="column"
                     @sortColumn="onSortColumn" />
    </li>
    <li v-for="(record, index) in store"
        :key="index"
        class="grid-row"
        :record="record"
        @click="onClickRow">
      <JefGridCell v-for="(cell, rowIdx) in columnsCfg"
                   :key="rowIdx"
                   :record="record"
                   :column="cell" />
    </li>
  </ol>
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
  formatter: _.identity
};

interface IData {
  ColumnTypes: IEnum;
  TableCls: ITableCls;
  selectedRow: HTMLElement | null;
  columnsCfg: IColumn[];
}

export default defineComponent({
  name: 'JefGrid',
  components: {JefGridColumn, JefGridCell},
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
    height: {
      type: String,
      default: '200px'
    },
    width: {
      type: String,
      default: '200px'
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
    cmpStyles(): string {
      return `width: ${this.width};`;
    },
    bodyStyles(): string {
      return `max-height: ${this.height}; overflow: auto;`;
    },
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
    getColumnsMarkup(columns: IColumn[], parent?: IColumn) {
      let value = '';
      columns.forEach((column) => {
        if (column.columns) {
          value += `<div><div class="grid-cell">${column.text}</div>`;
          value += this.getColumnsMarkup(column.columns, column);
          value += '</div>';
        }
        else if (parent) {
          if (!value) {
            value = '<div class="grid-nested">';
          }
          value += `<div class="grid-cell">${column.text}</div>`;
        }
        else {
          value += `<div class="grid-cell">${column.text}</div>`;
        }
      });
      if (parent) {
        value += '</div>';
      }
      return value;
    },
    getDefaultColumns(columns: IColumn[]): any {
      const out: any = [];
      columns.forEach((column) => {
        out.push(_.merge({
          columns: column.columns ? this.getDefaultColumns(column.columns) : null
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
      /**
       * TODO:
       * - Add sorting
       * - Add filtering
       * - Add dialog class that can take an items config
       * - Add editing records
       * - Remove expander if the row doesn't have expandable data
       * - Add header/title class
       * - Potentially figure out how to get header to stick... position: sticky doesn't really work
       * - How to add a template within a template... e.g. <Grid><Column></Column></Grid>
       */
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
ol.grid-container {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.grid-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));

  &.expand-row .grid-cell .expandable {
    display: block;
  }

  &.grid-header {
    position: sticky;
    top: 0;
    background-color: white;
  }

  &:first-child > div {
    border-top: 1px solid gray;
  }

  & > .grid-cell:first-child {
    border-left: 1px solid gray;
  }

  .grid-nested {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  }

  /* In order to maximize row lines, only display one line for a cell */
  .grid-cell {
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    padding: 2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .expandable {
      display: none;
    }
  }
}
</style>
