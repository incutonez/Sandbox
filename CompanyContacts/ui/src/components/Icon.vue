<template>
  <i :class="iconName" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Icon",
  props: {
    iconName: {
      type: String,
      default: "",
    },
  },
});
</script>
