<template>
  <th :class="clsFm"
      role="columnheader"
      scope="col">
    {{ text }}
  </th>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ColumnTypes from '@/statics/ColumnTypes';
import {MDClasses} from '@/statics/MaterialDesign';

export default defineComponent({
  name: 'Column',
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
    text: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: ColumnTypes.String
    },
    field: {
      type: String,
      default: ''
    }
  },
  computed: {
    clsFm: function(): string {
      let cls = this.cls;
      cls.push(MDClasses.TABLE_COLUMN);
      switch (this.type) {
        case ColumnTypes.String:
          break;
        case ColumnTypes.Number:
          cls.push(MDClasses.TABLE_COLUMN_NUMERIC);
          break;
      }
      return cls.join(' ');
    }
  }
});
</script>
