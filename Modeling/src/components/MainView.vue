<template>
	<article class="flex gap-x-4">
		<article class="flex flex-col gap-y-4">
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
			<section class="flex flex-col gap-y-4">
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
		</article>
		<article class="flex flex-col gap-y-4">
			<section class="self-start flex flex-col gap-x-2 items-center">
				<FieldLabel text="Valid" />
				<!-- https://stackoverflow.com/a/54406264/1253609 Need to Unicode version of the green check, so we append XFE0E after-->
				<span
					v-if="isValid"
					class="text-xl text-green-500"
				>&#10004;&#xfe0e;</span>
				<span
					v-else
					class="text-xl text-red-500"
				>&#10006;&#xfe0e;</span>
			</section>
			<section>
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
	</article>
</template>

<script setup lang="ts">
import FieldBase from "@/components/FieldBase.vue";
import FieldDisplay from "@/components/FieldDisplay.vue";
import FieldLabel from "@/components/FieldLabel.vue";
import { injectPersonProvider } from "@/personProvider.ts";

const { record, isValid } = injectPersonProvider();
</script>
