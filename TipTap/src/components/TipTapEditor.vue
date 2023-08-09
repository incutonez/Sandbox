<template>
  <EditorContent :editor="editor" @keydown="onKeyDown" />
</template>

<script setup lang="ts">
import {EditorContent, useEditor} from "@tiptap/vue-3";
import {StarterKit} from "@tiptap/starter-kit";
import {reactive, watch} from "vue";
import TipTapCmp from "./TipTapCmp";

interface IToken {
  value: string;
  label: string;
}

const tokens = reactive([])
const editor = useEditor({
  extensions: [
    StarterKit,
    TipTapCmp
  ],
})

function addToken(token: IToken) {
  const pos = editor.value.state.selection.anchor;
  if (pos < tokens.length) {
    tokens.splice(pos, 0, token);
  }
  else {
    tokens.push(token);
  }
}

function onKeyDown(event: Event) {
  addToken({
    value: event.key,
    label: event.key
  })
  event.preventDefault()
}

watch(tokens, () => {
  editor.value?.commands.setContent(tokens.map((token) => {
    return {
      type: 'TipTapComponent',
      attrs: {
        token
      }
    }
  }))
})
</script>

<style lang="scss">
.ProseMirror {
  @apply flex;
}
</style>
