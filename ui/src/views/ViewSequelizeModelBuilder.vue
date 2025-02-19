<script setup lang="ts">
import { computed, ref, watch } from "vue";
import pluralize from "pluralize";
import BaseButton from "@/components/BaseButton.vue";
import BaseTabs from "@/components/BaseTabs.vue";
import FieldCheckbox from "@/components/FieldCheckbox.vue";
import FieldLabel from "@/components/FieldLabel.vue";
import FieldText from "@/components/FieldText.vue";
import FieldTextArea from "@/components/FieldTextArea.vue";
import HighlightTypeScript from "@/components/HighlightTypeScript.vue";
import { camelCase, capitalCase, isObject, snakeCase } from "@/utils/common";

interface IModelField {
	key: string;
	type: string;
	fk?: string;
	hasMany?: boolean;
	hasOne?: boolean;
	nullable?: boolean;
	primaryKey?: boolean;
}

type TInput = Record<string, unknown> | false;
interface IOutput {
	code: string;
	model: string;
}

const isViewModel = ref(false);
const inputValue = ref("");
const outputValue = ref<string[]>([]);
const validInput = ref<TInput>();
const modelName = ref("");
const outputType = ref("Sequelize");
const sequelizeTabs = ref<string[]>([]);
const selectedSequelizeTab = ref("");
const selectedContent = computed(() => {
	const found = sequelizeTabs.value.indexOf(selectedSequelizeTab.value);
	return found !== -1 ? outputValue.value[found] : "";
});

watch(inputValue, ($inputValue) => {
	let parsed = safeParse($inputValue);
	if (Array.isArray(parsed)) {
		parsed = parsed[0];
	}
	validInput.value = parsed;
});

function safeParse(value: string) {
	try {
		return JSON.parse(value);
	}
	catch (ex) {
		return !ex;
	}
}

function makeClass(fields: string[], model: string) {
	let code;
	let modelCapital;
	if (isViewModel.value) {
		modelCapital = capitalCase(pluralize.singular(model)) + "ViewModel";
		code = `export class ${modelCapital} {
\t${fields.join("\n\t")}
}`;
	}
	else {
		modelCapital = capitalCase(pluralize.singular(model)) + "Model";
		code = `import { Column, Model, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { ModelInterface } from "src/types";

export type I${modelCapital} = ModelInterface<${modelCapital}>;

@Table({
\ttableName: "${pluralize(model.toLowerCase(), 2)}",
\ttimestamps: false,
})
export class ${modelCapital} extends Model {
${fields.join("\n\n")}
}`;
	}
	return {
		code,
		model: modelCapital,
	};
}

function makeField({ nullable, key, type, fk, primaryKey, hasOne, hasMany }: IModelField): string {
	const column = [];
	key = isViewModel.value ? camelCase(key) : snakeCase(key);
	const nullableSymbol = nullable ? "?" : "";
	if (isViewModel.value) {
		return `${key}${nullableSymbol}: ${type};`;
	}
	if (fk) {
		column.push(`\t@ForeignKey(() => ${fk})`);
	}
	if (primaryKey) {
		column.push("\t@PrimaryKeyGuid()");
	}
	else if (hasMany) {
		column.push(`\t@HasMany(() => ${type}, "id")`);
		type += "[]";
	}
	else if (hasOne) {
		const idField = makeField({
			type: "string",
			key: `${key.toLowerCase()}_id`,
			fk: type,
		});
		column.push(`${idField}\n\n\t@BelongsTo(() => ${type}, "${key}_id")`);
	}
	else {
		column.push("\t@Column");
	}
	return `${column.join("\n")}
\tdeclare ${key}${nullableSymbol}: ${type};`;
}

function makeModel(input?: TInput, model?: string) {
	const output: IOutput[] = [];
	if (input && model) {
		const fields: string[] = [];
		for (const key in input) {
			let hasMany = false;
			let hasOne = false;
			const value = input[key];
			const nullable = value === undefined || value === null;
			let type = nullable ? "unknown" : typeof value;
			if (Array.isArray(value)) {
				const response = makeModel(value[0], key);
				hasMany = true;
				type = response[0].model;
				output.push(...response);
			}
			else if (isObject(value)) {
				const response = makeModel(value as TInput, key);
				hasOne = true;
				type = response[0].model;
				output.push(...response);
			}
			fields.push(makeField({
				type,
				nullable,
				hasMany,
				hasOne,
				key,
				primaryKey: key === "id",
			}));
		}
		output.unshift(makeClass(fields, model));
	}
	return output;
}

function onClickConvert() {
	const output: string[] = [];
	const models: string[] = [];
	const results = makeModel(validInput.value, modelName.value);
	results.forEach(({ code, model }) => {
		models.push(model);
		output.push(code);
	});
	outputValue.value = output;
	sequelizeTabs.value = models;
	selectedSequelizeTab.value = sequelizeTabs.value[0];
}

function onClickCopyModel() {
	navigator.clipboard.writeText(selectedContent.value);
}

watch(isViewModel, ($isViewModel) => outputType.value = $isViewModel ? "View Model" : "Sequelize");
</script>

<template>
	<article class="size-full flex flex-col p-4 space-y-4">
		<section class="flex space-x-4">
			<FieldText
				v-model="modelName"
				label="Model Name"
				input-width="w-48"
			/>
			<FieldCheckbox
				v-model="isViewModel"
				label="View Model"
			/>
		</section>
		<section class="flex-1 flex space-x-4 items-center">
			<FieldTextArea
				v-model="inputValue"
				label="JSON"
				class="flex-1 h-full"
				label-position="top"
				input-classes="h-full"
			/>
			<BaseButton
				text="Convert"
				:disabled="!validInput || !modelName"
				@click="onClickConvert"
			/>
			<section class="flex flex-col flex-1 h-full max-h-full overflow-hidden">
				<FieldLabel
					:text="outputType"
					position="top"
				/>
				<BaseTabs
					v-if="sequelizeTabs.length"
					v-model:selected="selectedSequelizeTab"
					class="basis-0 grow"
					:tabs="sequelizeTabs"
				>
					<template #content>
						<section class="sticky top-0 flex w-full h-0">
							<BaseButton
								text="Copy"
								class="ml-auto"
								@click="onClickCopyModel"
							/>
						</section>
						<HighlightTypeScript
							class="flex-1"
							:value="selectedContent"
						/>
					</template>
				</BaseTabs>
			</section>
		</section>
	</article>
</template>
