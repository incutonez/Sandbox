<template>
  <UsersGrid height="200px"
             width="70%" />
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import UsersGrid from '@/components/UsersGrid.vue';

export default {
  components: {
    UsersGrid
  },
  extends: Vue
};
</script>

<style lang="scss">
@use "App";
</style>
