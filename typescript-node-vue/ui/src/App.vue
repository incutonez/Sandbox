<template>
  <div class="app-main">
    <div class="navigation"
         style="text-align: center;">Navigation Menu
    </div>
    <div class="main-content">
      <Contacts />
    </div>
    <div class="footer"
         style="text-align: center;">Footer
    </div>
  </div>
</template>

<script lang="ts">
// Shadowing this Fiddle https://fiddle.sencha.com/#view/editor&fiddle/3e5m
import {Vue} from 'vue-class-component';
import Contacts from '@/components/Contacts.vue';
import '@fontsource/open-sans';

export default {
  components: {
    Contacts
  },
  extends: Vue
};
</script>

<style lang="scss">
@import "App";
</style>
