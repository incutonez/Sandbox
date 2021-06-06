<template>
  <FlexTest />
  <!--  <UsersGrid>-->
  <!--    <template #title>-->
  <!--      TEST-->
  <!--    </template>-->
  <!--  </UsersGrid>-->
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import UsersGrid from '@/components/UsersGrid.vue';
import FlexTest from '@/components/FlexTest.vue';

export default {
  components: {
    FlexTest
  },
  extends: Vue
};
</script>

<style lang="scss">
@use "App";
</style>
