<template>
  <NodeViewWrapper class="w-auto border border-blue-400 rounded-full mx-2">
    {{token.value}}
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import {NodeViewProps, NodeViewWrapper} from "@tiptap/vue-3";
import {computed} from "vue";

const props = defineProps<NodeViewProps>()
const token = computed(() =>props.node.attrs.token)
console.log(props)
</script>

<style scoped>

</style>
