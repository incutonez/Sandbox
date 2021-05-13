<template>
  <td class="mdc-data-table__cell">{{ value }}</td>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Cell',
  props: {
    colIdx: {
      type: Number,
      default: 0
    },
    rowIdx: {
      type: Number,
      default: 0
    },
    field: {
      type: String,
      default: ''
    },
    record: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    value(): any {
      return this.record[this.field];
    }
  }
});
</script>

<style scoped
       lang="scss">

</style>
