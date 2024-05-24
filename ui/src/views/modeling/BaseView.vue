<template>
	<article class="flex gap-x-4 p-4">
		<article class="flex flex-col gap-y-4">
			<section class="flex gap-x-2">
				<FieldText
					v-model="record.firstName"
					label="First Name"
					required
					label-position="top"
				/>
				<FieldText
					v-model="record.lastName"
					label="Last Name"
					required
					label-position="top"
				/>
			</section>
			<section class="flex flex-col gap-y-4">
				<FieldText
					v-model="record.address.lineOne"
					label="Line One"
					required
					label-position="top"
				/>
				<FieldText
					v-model="record.address.lineTwo"
					label="Line Two"
					label-position="top"
				/>
				<section class="flex gap-x-2">
					<FieldText
						v-model="record.address.city"
						label="City"
						required
						label-position="top"
					/>
					<FieldText
						v-model="record.address.state"
						label="State"
						required
						label-position="top"
					/>
					<FieldText
						v-model="record.address.zipCode"
						label="Zip"
						required
						label-position="top"
					/>
				</section>
			</section>
		</article>
		<article class="flex flex-col gap-y-4">
			<section class="flex flex-col items-center gap-x-2 self-start">
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
					label-position="top"
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
import FieldDisplay from "@/components/FieldDisplay.vue";
import FieldLabel from "@/components/FieldLabel.vue";
import FieldText from "@/components/FieldText.vue";
import { injectPersonProvider } from "@/views/modeling/personProvider";

const { record, isValid } = injectPersonProvider();
</script>
