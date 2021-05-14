<template>
  <tr :class="clsFm">
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
      type: Object,
      default: () => {
        return {};
      }
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    cls: {
      type: String,
      default: ''
    }
  },
  computed: {
    clsFm() {
      return this.cls;
    }
  }
});
</script>

<style scoped>

</style>
