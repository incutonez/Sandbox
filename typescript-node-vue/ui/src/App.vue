<template>
  <Contacts />
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import Contacts from '@/components/Contacts.vue';

export default {
  components: {
    Contacts
  },
  extends: Vue
};
</script>

<style lang="scss">
@use "App";
</style>
