<template>
  <div class="jef-grid"
       :style="gridStyles">
    <table :class="`${TableCls.ROOT} ${TableCls.STRIPED} ${TableCls.HOVER} ${TableCls.DARK} ${TableCls.BORDERED} ${TableCls.SMALL}`">
      <thead>
        <tr v-for="(columnCfg, parentIdx) in columnsCfg"
            :key="parentIdx">
          <Column v-for="(column, index) in columnCfg"
                  :key="index"
                  :config="column" />
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
    rowCfg(): any {
      return this.getRowConfig(this.columns);
    },
    columnsCfg(): Array<Array<IColumn>> {
      const max = this.peekColumns(this.columns, 0);
      return this.getColumnsCfg([], this.columns, 0, max);
    }
  },
  methods: {
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

<style scoped
       lang="scss">
.jef-grid {
  table > thead > tr > th {
    vertical-align: middle;
  }

  //tbody {
  //  display: block;
  //}
  //
  //thead, tbody tr {
  //  display: table;
  //  width: 100%;
  //  table-layout: fixed;
  //}
  //
  //thead th:last-child {
  //  width: 17px;
  //}
  //* ::v-deep .expandable {
  //  display: none;
  //}
}
</style>
