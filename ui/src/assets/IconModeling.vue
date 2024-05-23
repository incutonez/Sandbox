<template>
	<article class="flex flex-col items-center justify-center">
		<IconCube
			class="-mt-px h-4 fill-red-500"
			:class="cls"
		/>
		<section class="relative -mt-1.5 flex h-4 w-full">
			<IconCube
				class="absolute left-0 -ml-0.5 h-4 w-4 fill-sky-500"
				:class="cls"
			/>
			<IconCube
				class="absolute left-2.5 h-4 w-4 fill-green-500"
				:class="cls"
			/>
		</section>
	</article>
</template>

<script setup lang="ts">
import IconCube from "@/assets/IconCube.vue";

interface IProps {
	cls?: string;
}

withDefaults(defineProps<IProps>(), {
	cls: "",
});
</script>
