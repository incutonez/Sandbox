<template>
  <article
    v-if="isImg"
    class="overflow-hidden rounded-full"
  >
    <img
      class="h-full"
      :src="imgSrc"
      alt="Avatar"
    >
  </article>
  <article
    v-else
    class="flex place-content-center overflow-hidden rounded-full border border-gray-400 text-gray-400"
  >
    <IconPerson />
  </article>
</template>

<script setup lang="ts">
import IconPerson from "@/components/IconPerson.vue";
import { computed } from "vue";

const isImg = randomBool();
const imgSrc = computed(() => {
  if (randomBool()) {
    return "https://fastly.picsum.photos/id/40/4106/2806.jpg?hmac=MY3ra98ut044LaWPEKwZowgydHZ_rZZUuOHrc3mL5mI";
  }
  else if (randomBool()) {
    return "https://fastly.picsum.photos/id/59/2464/1632.jpg?hmac=uTfe6jCzLvCzANvJgtpo-a0fKhO8BvjpwLNYX3lqx_Q";
  }
  return "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68";
});

function randomBool() {
  return Math.random() < 0.5;
}
</script>
