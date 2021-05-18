<template>
  <div class="jef-grid"
       :style="gridStyles">
    <table :class="`${TableCls.ROOT} ${TableCls.STRIPED} ${TableCls.HOVER} ${TableCls.DARK} ${TableCls.BORDERED} ${TableCls.SMALL}`">
      <thead>
        <tr v-for="(columnCfg, parentIdx) in columnsCfg"
            :key="parentIdx">
          <Column v-for="(column, index) in columnCfg"
                  :key="index"
                  :config="column"
                  :ref="column.isParent ? `column-parent-${index}` : `column-${column.field || index}`"
                  @sortColumn="onSortColumn" />
        </tr>
      </thead>
      <tbody :style="bodyStyles">
        <Row v-for="(record, index) in store"
             :key="index"
             :record="record"
             :columns="rowCfg"
             @click="onClickRow" />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Column from '@/components/grid/Column.vue';
import Row from '@/components/grid/Row.vue';
import Store from '@/classes/Store';
import ColumnTypes from '@/statics/ColumnTypes';
import {TableCls} from '@/statics/TableCls';
import ITableCls from '@/interfaces/ITableCls';
import IEnum from '@/interfaces/IEnum';
import IColumn from '@/interfaces/IColumn';

export default defineComponent({
  name: 'Grid',
  components: {
    Column,
    Row
  },
  props: {
    columns: {
      type: Array as () => Array<IColumn>,
      default: () => {
        return [];
      }
    },
    store: {
      type: Store,
      default: () => {
        return new Store();
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
    return new class {
      ColumnTypes: IEnum = ColumnTypes;
      TableCls: ITableCls = TableCls;
      selectedRow: HTMLElement | null = null;
    }();
  },
  computed: {
    gridStyles(): string {
      return `width: ${this.width};`;
    },
    bodyStyles(): string {
      return `max-height: ${this.height}; overflow: auto;`;
    },
    rowCfg(): IColumn[] {
      return this.getRowConfig(this.columns);
    },
    columnsCfg(): Array<Array<IColumn>> {
      const max = this.peekColumns(this.columns, 0);
      return this.getColumnsCfg([], this.columns, 0, max);
    }
  },
  watch: {
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
    onSortStore() {
      this.store.sorters.forEach((sorter) => {
        const column = this.$refs[`column-${sorter.field}`] as typeof Column;
        column.isSorted = true;
      });
    },
    // TODO: Try and combine with building columns?
    peekColumns(columns: IColumn[], currentLevel: number): number {
      let max = currentLevel;
      if (columns) {
        columns.forEach((column) => {
          let response = 0;
          if (column.columns) {
            response = this.peekColumns(column.columns, currentLevel + 1);
          }
          if (response > max) {
            max = response;
          }
        });
      }
      return max;
    },
    getRowConfig(columns: IColumn[]) {
      let Config: IColumn[] = [];
      columns.forEach((column) => {
        if (column.columns) {
          Config = [...Config, ...this.getRowConfig(column.columns)];
        }
        else {
          Config.push(column);
        }
      });
      return Config;
    },
    getColumnsCfg(output: IColumn[][], columns: IColumn[], level: number, depth: number) {
      if (columns) {
        if (!output[level]) {
          output[level] = [];
        }
        columns.forEach((column) => {
          if (column.columns) {
            this.getColumnsCfg(output, column.columns, level + 1, depth);
            column.colSpan = column.columns.length;
            column.isParent = true;
            column.isSortable = false;
          }
          else if (level !== depth) {
            column.rowSpan = depth - level + 1;
          }
          // TODO: Maybe clone it here and delete the columns property?
          output[level].push(column);
        });
      }
      return output;
    },
    onSortColumn(column: typeof Column) {
      if (column.isSorted) {
        this.store.doSort(this.store.sorters);
      }
      else {
        // TODO: Issue on sort... if first row is expanded, it sticks to whatever's sorted at top
        this.store.addSorter(column.initialConfig.sorter, !this.multiSort);
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

<style scoped
       lang="scss">
.jef-grid {
  table > thead > tr > th {
    vertical-align: middle;
  }
}
</style>
