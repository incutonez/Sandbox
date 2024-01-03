<template>
	<article class="flex flex-col gap-y-2">
		<section class="flex gap-x-2">
			<FieldBase
				v-model="record.firstName"
				label="First Name"
				required
			/>
			<FieldBase
				v-model="record.lastName"
				label="Last Name"
				required
			/>
		</section>
		<section class="flex flex-col gap-y-2">
			<FieldBase
				v-model="record.address.lineOne"
				label="Line One"
				required
			/>
			<FieldBase
				v-model="record.address.lineTwo"
				label="Line Two"
			/>
			<section class="flex gap-x-2">
				<FieldBase
					v-model="record.address.city"
					label="City"
					required
				/>
				<FieldBase
					v-model="record.address.state"
					label="State"
					required
				/>
				<FieldBase
					v-model="record.address.zipCode"
					label="Zip"
					required
				/>
			</section>
		</section>
		<section class="self-end flex gap-x-2">
			<FieldDisplay
				label-align="left"
				label="Valid"
				:value="isValid"
			/>
			<button
				class="bg-gray-300 hover:bg-gray-400 py-1 px-2 rounded"
				@click="onClickValidate"
			>
				Validate
			</button>
		</section>
	</article>
	<article class="flex">
		<section class="pl-4">
			<FieldDisplay
				label="Full Address"
				:value="record.name"
			/>
			<FieldDisplay :value="record.address.lineOne" />
			<FieldDisplay
				v-if="record.address.lineTwo"
				:value="record.address.lineTwo"
			/>
			<section class="flex justify-start">
				<FieldDisplay :value="record.address.city" />, &nbsp;
				<FieldDisplay :value="record.address.state" />
				&nbsp;
				<FieldDisplay :value="record.address.zipCode" />
			</section>
		</section>
	</article>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import FieldBase from "@/components/FieldBase.vue";
import FieldDisplay from "@/components/FieldDisplay.vue";
import { PersonModel } from "@/typebox/PersonModel.ts";

const isValid = ref(false);
const record = reactive(PersonModel.create({
		firstName: "John",
		lastName: "Test",
	}));

function onClickValidate() {
	isValid.value = record.isValid();
}
</script>
