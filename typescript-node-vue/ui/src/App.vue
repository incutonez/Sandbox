<template>
  <UsersTable height="200px"
              width="70%" />
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import UsersTable from '@/components/UsersTable.vue';

export default {
  components: {
    UsersTable
  },
  extends: Vue
};
</script>

<style lang="scss">
@use "App";
</style>
