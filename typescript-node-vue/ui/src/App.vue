<template>
  <Users height="200px"
         width="50%" />
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import Users from './components/Users.vue';

export default {
  components: {
    Users
  },
  extends: Vue
};
</script>

<style lang="scss">
@use "App";
</style>
