<template>
	<PrimeButton
		:label="text"
		:disabled="disabled"
		:size="size"
		:plain="plain"
		:unstyled="unstyled"
		:loading="loading"
	>
		<template #icon>
			<slot name="icon">
				<Component
					:is="icon"
					class="mr-0.5 size-4"
					:class="iconCls"
				/>
			</slot>
		</template>
	</PrimeButton>
</template>

<script setup lang="ts">
import { VNode } from "vue";
import PrimeButton from "primevue/button";
import { IBaseButton } from "@/types/components";

withDefaults(defineProps<IBaseButton>(), {
	size: "large",
	text: undefined,
	icon: undefined,
	iconCls: undefined,
});
defineSlots<{
	icon(): VNode;
}>();
</script>
