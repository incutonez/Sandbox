<template>
  <div class="jef-grid"
       :style="gridStyles">
    <div :class="MDClasses.TABLE_CONTAINER">
      <table :class="`${MDClasses.TABLE} ${MDClasses.TABLE_FIXED_HEADER}`">
        <thead>
          <tr :class="MDClasses.TABLE_COLUMN_CONTAINER">
            <Column v-for="(column, index) in columns"
                    :key="index"
                    :type="column.type"
                    :cls="column.cls"
                    :text="column.text"
                    :field="column.field" />
          </tr>
        </thead>
        <tbody :class="MDClasses.TABLE_CONTENT">
          <Row v-for="(record, index) in store"
               :key="index"
               :record="record"
               :columns="columns" />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, h} from 'vue';
import Column from '@/components/grid/Column.vue';
import Row from '@/components/grid/Row.vue';
import Store from '@/classes/Store';
import ColumnTypes from '@/statics/ColumnTypes';
import {MDClasses} from '@/statics/MaterialDesign';

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
    }
  },
  data() {
    return {
      ColumnTypes: ColumnTypes,
      MDClasses: MDClasses
    };
  },
  computed: {
    gridStyles() {
      return 'height: 200px; overflow: auto;';
    }
  }
});
</script>

<style scoped
       lang="scss">
::v-deep * {
  @import "Grid";
}
</style>
