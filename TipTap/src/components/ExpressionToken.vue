<template>
  <NodeViewWrapper
    class="mx-2 rounded-full px-2 py-0.5 text-base text-white"
    :class="wrapperClasses"
  >
    <EditorContent
      :editor="editor"
      :contenteditable="isTokenNumber"
      @click.stop
      @keydown="onKeyDown"
    />
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { StarterKit } from "@tiptap/starter-kit";
import { EditorContent, NodeViewProps, NodeViewWrapper, useEditor } from "@tiptap/vue-3";
import { isNumber, isOperator } from "@/globals.ts";
import { IToken } from "@/interfaces.ts";

const props = defineProps<NodeViewProps>();
const token = computed<IToken>(() => props.node.attrs.token);
const isTokenNumber = computed(() => token.value.type === "number");
const editor = useEditor({
  extensions: [StarterKit],
  editable: isTokenNumber.value,
  onUpdate() {
    token.value.value = editor.value?.getText() ?? "";
  },
});
const wrapperClasses = computed(() => {
  return {
    "bg-green-600": !isTokenNumber.value,
    "bg-blue-400": isTokenNumber.value,
  };
});

// TODOJEF: https://github.com/ueberdosis/tiptap/issues/1899#issuecomment-1209930542
function setContents() {
  editor.value?.chain().focus().setContent(token.value.value).run();
}

function onKeyDown(event: KeyboardEvent) {
  if (isNumber.test(event.key) || !isOperator.test(event.key)) {
    event.stopPropagation();
  }
}

watch(() => token.value.value, () => setContents());
onMounted(() => setContents());
</script>
