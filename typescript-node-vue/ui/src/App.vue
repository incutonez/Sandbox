<template>
  <Users msg="Welcome to Your Vue.js + TypeScript App" />
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import Users from './components/Users.vue';

export default {
  extends: Vue,
  components: {
    Users
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
