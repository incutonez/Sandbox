<template>
  <tr class="mdc-data-table__row">
    <Cell v-for="(column, index) in columns"
          :key="index"
          :column="column"
          :record="record" />
  </tr>
</template>

<script>
import Cell from './Cell';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Row',
  components: {
    Cell
  },
  props: {
    record: {
      type: Object
    },
    columns: {
      type: Array
    }
  }
});
</script>

<style scoped>

</style>
