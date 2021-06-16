<template>
  <div class="navigation">
    <RouterLink :to="{name: 'home'}"
                style="margin-right: 10px;">
      Home
    </RouterLink>
    <RouterLink :to="{name: 'contacts'}"
                style="margin-right: 10px;">
      Contacts
    </RouterLink>
    <RouterLink :to="{name: 'companies'}"
                style="margin-right: 10px;">
      Companies
    </RouterLink>
    <RouterLink :to="{name: 'applications'}">
      Applications
    </RouterLink>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import {RouterLink} from 'vue-router';

export default defineComponent({
  name: 'Navigation',
  components: {
    RouterLink
  }
});
</script>

<style scoped>
.navigation {
  grid-area: t;
  text-align: center;
}
</style>
