import {defineComponent, h} from 'vue';
import Column from '@/components/grid/Column.vue';
import Cell from '@/components/grid/Cell.vue';
import Store from '@/classes/Store';

const Grid = defineComponent({
  name: 'Grid',
  components: {
    Column,
    Cell
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
    }
  },
  data() {
    return {
      Columns: [],
      ColumnOrder: []
    };
  },
  methods: {
    generateRows() {
      const Rows: any = [];
      console.log('rendering');
      this.store.forEach((row: any) => {
        const Cells: any = [];
        this.ColumnOrder.forEach((column: any, index: number) => {
          Cells.push(h(Cell, {
            field: column,
            record: row,
            column: this.Columns[index]
          }));
        });
        Rows.push(h('tr', {
          class: 'mdc-data-table__row'
        }, Cells));
      });
      return Rows;
    }
  },
  render() {
    const Columns: any = [];
    const ColumnOrder: any = [];
    this.columns.forEach((column: any) => {
      Columns.push(h(Column, column));
      ColumnOrder.push(column.field);
    });
    this.Columns = Columns;
    this.ColumnOrder = ColumnOrder;
    const Rows: any = this.generateRows();
    return h('div', {
      class: 'mdc-data-table'
    }, [
      h('div', {
        class: 'mdc-data-table__table-container'
      }, [
        h('table', {
          class: 'mdc-data-table__table'
        }, [
          h('thead', [
            h('tr', {
              class: 'mdc-data-table__header-row'
            }, Columns)
          ]),
          h('tbody', {
            class: 'mdc-data-table__content'
          }, Rows)
        ])
      ])
    ]);
  }
});

export default Grid;
