<template>
  <td :class="clsFm">
    {{ value }}
  </td>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';

export default defineComponent({
  name: 'Cell',
  props: {
    /**
     * @property
     * This gets applied to the th tag in the class property
     */
    cls: {
      type: Array,
      default: () => {
        return [];
      }
    },
    column: {
      type: Object,
      default: () => {
        return {};
      }
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
      return this.record[this.column.field];
    },
    clsFm(): any {
      const Cls = this.cls;
      switch (this.column.type) {
        case ColumnTypes.String:
          break;
        case ColumnTypes.Number:
          break;
      }
      return Cls.join(' ');
    }
  }
});
</script>

<style scoped
       lang="scss">

</style>
