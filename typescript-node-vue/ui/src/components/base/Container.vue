<template>
  <header v-if="showTitle">
    <slot name="title" />
  </header>

  <main v-if="showItems">
    <slot name="items" />
  </main>

  <footer v-if="showFooter">
    <slot name="footer" />
  </footer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'JefContainer',
  computed: {
    showTitle() {
      console.log('showTitle', this.$slots.title);
      return !!this.$slots.title;
    },
    showItems() {
      return !!this.$slots.items;
    },
    showFooter() {
      return !!this.$slots.footer;
    }
  },

  mounted() {
    console.log('Container', this.$slots.title);
  },

  methods: {
    initSlots(slots: any, scope: any) {
      console.log(slots.title, this.$slots.title);
    }
  }
});
</script>

<style scoped>

</style>
