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
	<tr>
		<td class="max-w-full">
			{{ skill }}
		</td>
		<td
			v-for="value in rating"
			:key="value"
			class="w-6"
		>
			<IconStar class="size-4" />
		</td>
		<td
			v-for="value in (5 - rating)"
			:key="value"
			class="w-6"
		>
			<IconStarEmpty class="size-4" />
		</td>
	</tr>
</template>

<style scoped lang="scss">

</style>
