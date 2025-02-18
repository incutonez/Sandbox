<script setup lang="ts">
import { computed, ref, watch } from "vue";
import pluralize from "pluralize";
import BaseButton from "@/components/BaseButton.vue";
import BaseTabs from "@/components/BaseTabs.vue";
import FieldLabel from "@/components/FieldLabel.vue";
import FieldText from "@/components/FieldText.vue";
import FieldTextArea from "@/components/FieldTextArea.vue";
import HighlightTypeScript from "@/components/HighlightTypeScript.vue";
import { capitalCase, isObject, snakeCase } from "@/utils/common";

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

const inputValue = ref("");
const outputValue = ref<string[]>([]);
const validInput = ref<TInput>();
const modelName = ref("");
const sequelizeTabs = ref<string[]>([]);
const selectedSequelizeTab = ref("");
const selectedContent = computed(() => {
	const found = sequelizeTabs.value.indexOf(selectedSequelizeTab.value);
	return found !== -1 ? outputValue.value[found] : "";
});

watch(inputValue, ($inputValue) => validInput.value = safeParse($inputValue));

function safeParse(value: string) {
	try {
		return JSON.parse(value);
	}
	catch (ex) {
		return !ex;
	}
}

function makeColumn(field: IModelField) {
	const column = [];
	if (field.fk) {
		column.push(`@ForeignKey(() => ${field.fk})`);
	}
	if (field.primaryKey) {
		column.push("@PrimaryKeyGuid()");
	}
	else if (field.hasMany) {
		column.push(`@HasMany(() => ${field.type}, "id")`);
		field.type += "[]";
	}
	else if (field.hasOne) {
		column.push(`@BelongsTo(() => ${field.type}, "${field.key}_id")`);
	}
	else {
		column.push("@Column");
	}
	const nullable = field.nullable ? "?" : "";
	return `\t${column.join("\n\t")}
\tdeclare ${field.key}${nullable}: ${field.type};`;
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
				fields.push(makeColumn({
					type: "string",
					key: `${key.toLowerCase()}_id`,
					fk: type,
				}));
			}
			fields.push(makeColumn({
				type,
				nullable,
				hasMany,
				hasOne,
				key: snakeCase(key),
				primaryKey: key === "id",
			}));
		}
		const modelCapital = capitalCase(pluralize.singular(model)) + "Model";
		output.unshift({
			code: `import { Column, Model, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "src/db/decorators";
import { ModelInterface } from "src/types";

export type I${modelCapital} = ModelInterface<${modelCapital}>;

@Table({
\ttableName: "${pluralize(model.toLowerCase(), 2)}",
\ttimestamps: false,
})
export class ${modelCapital} extends Model {
${fields.join("\n\n")}
}`,
			model: modelCapital,
		});
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
</script>

<template>
	<article class="size-full flex flex-col p-4 space-y-4">
		<FieldText
			v-model="modelName"
			label="Model Name"
			input-width="w-48"
		/>
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
					text="Sequelize"
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
