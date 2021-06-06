<template>
  <div>
    <template v-if="showTitle">
      <span>{{ title }}</span>
    </template>
    <template v-if="showTools">
      <slot name="tools" />
    </template>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'JefTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    showTitle() {
      return !!this.title;
    },
    showTools() {
      return !!this.$slots.tools;
    }
  }
});
</script>
