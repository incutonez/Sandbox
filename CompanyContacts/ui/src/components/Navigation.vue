<template>
  <div class="navigation">
    <RouterLink
      :to="{name: 'home'}"
      style="margin-right: 10px;"
    >
      Home
    </RouterLink>
    <RouterLink
      :to="{name: 'contactSearch'}"
      style="margin-right: 10px;"
    >
      Contacts
    </RouterLink>
    <RouterLink
      :to="{name: 'companySearch'}"
      style="margin-right: 10px;"
    >
      Companies
    </RouterLink>
    <RouterLink :to="{name: 'applicationSearch'}">
      Applications
    </RouterLink>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "Navigation",
  components: {
    RouterLink,
  },
});
</script>

<style scoped>
.navigation {
  grid-area: t;
  text-align: center;
}
</style>
