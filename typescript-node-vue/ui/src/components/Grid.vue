<template>
  <div class="jef-grid"
       :style="gridStyles">
    <table :class="`${TableCls.ROOT} ${TableCls.STRIPED} ${TableCls.HOVER} ${TableCls.DARK} ${TableCls.BORDERED} ${TableCls.SMALL}`">
      <thead>
        <tr>
          <Column v-for="(column, index) in columns"
                  :key="index"
                  :type="column.type"
                  :cls="column.cls"
                  :text="column.text"
                  :field="column.field" />
          <th></th>
        </tr>
      </thead>
      <tbody :style="bodyStyles">
        <Row v-for="(record, index) in store"
             :key="index"
             :record="record"
             :columns="columns"
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

export default defineComponent({
  name: 'Grid',
  components: {
    Column,
    Row
  },
  props: {
    columns: {
      type: Array,
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
    }
  },
  methods: {
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
  tbody {
    display: block;
  }

  thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  thead th:last-child {
    width: 17px;
  }
}
</style>
