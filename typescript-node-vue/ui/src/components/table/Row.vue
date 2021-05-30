<template>
  <tr :class="clsFm">
    <JefCell v-for="(column, index) in columns"
             :key="index"
             :column="column"
             :record="record" />
  </tr>
</template>

<script>
import {defineComponent} from 'vue';
import JefCell from '@/components/table/Cell';

export default defineComponent({
  name: 'JefRow',
  components: {
    JefCell
  },
  props: {
    record: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // TODO: This should be looping over the actual fields, not columns... need to flatten this
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

<style scoped
       lang="scss">
.expand-row::v-deep(.expandable) {
  display: block;
}
</style>
