<template>
	<PrimeButton
		:label="text"
		:disabled="disabled"
		:size="size ?? 'small'"
		:plain="unstyled"
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

export interface IButton {
	text?: string;
	disabled?: boolean;
	size?: "small" | "large";
	unstyled?: boolean;
}

defineProps<IButton>();
const slots = defineSlots<ButtonSlots>();
</script>
