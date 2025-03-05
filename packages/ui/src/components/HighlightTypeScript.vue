<script setup lang="ts">
import { ref, watch } from "vue";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";

interface IProps {
	value?: string;
}

const props = defineProps<IProps>();
const displayValue = ref("");
hljs.registerLanguage("typescript", typescript);

watch(() => props.value, (value) => {
	if (value) {
		displayValue.value = hljs.highlight(value, {
			language: "typescript",
		}).value;
	}
}, {
	immediate: true,
});
</script>

<template>
	<article>
		<pre
			class="text-sm"
			v-html="displayValue"
		/>
	</article>
</template>
