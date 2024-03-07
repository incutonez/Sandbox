<template>
	<article class="flex flex-col items-center justify-center">
		<IconTriangleFill
			class="h-1/2"
			:class="cls"
		/>
		<section class="flex h-1/2">
			<IconTriangleFill
				class="h-full w-1/2"
				:class="cls"
			/>
			<IconTriangleFill
				class="h-full w-1/2"
				:class="cls"
			/>
		</section>
	</article>
</template>

<script setup lang="ts">
import IconTriangleFill from "@/assets/IconTriangleFill.vue";

interface IProps {
	cls?: string;
}

withDefaults(defineProps<IProps>(), {
	cls: "fill-yellow-500",
});
</script>
