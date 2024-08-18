<script setup lang="ts">
import IconStar from "@/assets/IconStar.vue";
import IconStarEmpty from "@/assets/IconStarEmpty.vue";

interface IRowSkill {
	skill: string;
	rating: number;
}

defineProps<IRowSkill>();
</script>

<template>
	<section class="space-y-0.5 md:flex md:items-center md:space-y-0">
		<section class="max-w-full">
			{{ skill }}
		</section>
		<section class="flex md:ml-auto">
			<div
				v-for="value in rating"
				:key="value"
				class="w-6"
			>
				<IconStar class="size-4" />
			</div>
			<div
				v-for="value in (5 - rating)"
				:key="value"
				class="w-6"
			>
				<IconStarEmpty class="size-4" />
			</div>
		</section>
	</section>
</template>

<style scoped lang="scss">

</style>
