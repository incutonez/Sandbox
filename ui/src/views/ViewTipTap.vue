<template>
	<EditorContent
		:editor="editor"
		class="m-1 flex flex-wrap gap-2 rounded border border-gray-400 p-2"
		@keydown.stop="onKeyDown"
	/>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, unref, watch } from "vue";
import { StarterKit } from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import FieldExpressionNode from "@/views/tipTap/FieldExpressionNode";
import { isNumber, isOperator } from "@/views/tipTap/globals";
import { IToken, TTokenType } from "@/views/tipTap/types";

// TODOJEF: Complete this... use ideas from https://discuss.prosemirror.net/t/gapcursor-with-custom-components/5773
const tokens = reactive<IToken[]>([]);
const editor = useEditor({
	extensions: [StarterKit, FieldExpressionNode],
	editorProps: {
		attributes: {
			class: "w-full",
		},
	},
});
const content = computed(() => tokens.map((token) => {
	const type = "FieldExpression";
	// TODOJEF: Add ExpressionVariable and ExpressionFunction
	return {
		type,
		attrs: {
			token,
		},
	};
}));

function addToken(token: IToken) {
	const $editor = unref(editor);
	if ($editor) {
		const pos = $editor.state.selection.anchor;
		if (pos < tokens.length) {
			tokens.splice(pos, 0, token);
		}
		else {
			tokens.push(token);
		}
	}
}

function onKeyDown({ key }: KeyboardEvent) {
	let type: TTokenType | undefined;
	if (isNumber.test(key)) {
		type = "number";
	}
	else if (isOperator.test(key)) {
		type = "operator";
	}
	if (type) {
		addToken({
			type,
			value: key,
			label: key,
		});
	}
}

function setContent() {
	const $editor = unref(editor);
	const $content = unref(content);
	if ($editor) {
		// First, wipe out the content, so we start from scratch
		$editor.commands.setContent("");
		$editor.chain().focus().setContent($content.length ? $content : "").run();
	}
}

watch(content, () => setContent());
onMounted(() => setContent());
</script>

<style lang="scss">
.ProseMirror {
  @apply flex;
  outline: none;
  *:focus-visible {
    outline: none;
  }
}
</style>
