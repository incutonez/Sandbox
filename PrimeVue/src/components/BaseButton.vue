<template>
	<PrimeButton
		:label="text"
		:disabled="disabled"
		:size="size"
		:plain="plain"
		:unstyled="unstyled"
	>
		<!-- Expose all slots from parent component -->
		<template
			v-for="(_, slot) of $slots"
			#[slot]="scope"
		>
			<slot
				:name="slot as keyof typeof slots"
				v-bind="scope ?? {}"
			/>
		</template>
	</PrimeButton>
</template>

<script setup lang="ts">
import PrimeButton, { ButtonSlots } from "primevue/button";
import { IBaseButton } from "@/types/components.ts";

withDefaults(defineProps<IBaseButton>(), {
	size: "large",
	text: undefined,
});
const slots = defineSlots<ButtonSlots>();
</script>
