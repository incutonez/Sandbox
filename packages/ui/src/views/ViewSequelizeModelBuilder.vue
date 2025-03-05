<script setup lang="ts">
import { computed, ref, unref, watch } from "vue";
import { BaseButton, BaseTabs, FieldCheckbox, FieldComboBox, FieldLabel, FieldText, FieldTextArea } from "@incutonez/core-ui";
import {
	camelCase,
	downloadFile,
	isEmpty,
	isObject,
	makePlural,
	makeSingular,
	snakeCase,
	splitCapitalize,
} from "@incutonez/core-ui/utils";
import { downloadZip } from "client-zip";
import HighlightTypeScript from "@/components/HighlightTypeScript.vue";

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

const SequelizeImport = createImport(["Column", "Model", "Table"], "sequelize-typescript");
const SrcImport = createImport("ModelInterface", "src/types");
const PrimaryKeyImport = createImport("PrimaryKeyGuid", "src/db/decorators");
const downloadSingleFile = ref(true);
const inputValue = ref("");
const outputValue = ref<IOutput[]>([]);
const validInput = ref<TInput>();
const modelName = ref("");
const modelSuffix = ref("Model");
const sequelizeTabs = ref<string[]>([]);
const selectedSequelizeTab = ref("");
const outputOptions = [{
	name: "Sequelize",
	id: "sequelize",
}, {
	name: "Class",
	id: "class",
}, {
	name: "Interface",
	id: "interface",
}];
const selectedOutputOption = ref(outputOptions[0]);
const isPlain = computed(() => selectedOutputOption.value.id !== "sequelize");
const selectedContent = computed(() => {
	const $selectedFile = unref(selectedSequelizeTab);
	const found = outputValue.value.find(({ model }) => model === $selectedFile);
	return found?.code;
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

function makeClass(fields: string[], model: string, imports: string[]) {
	const code: string[] = [];
	const $isPlain = unref(isPlain);
	const modelCapital = splitCapitalize(makeSingular(model)) + (modelSuffix.value ?? "");
	if (!downloadSingleFile.value) {
		if (!$isPlain) {
			imports.push(SequelizeImport, SrcImport);
		}
		if (imports.length) {
			code.push(`${imports.join("\n")}\n\n`);
		}
	}
	if ($isPlain) {
		code.push(`export ${selectedOutputOption.value.id} ${modelCapital} {
\t${fields.join("\n\t")}
}`);
	}
	else {
		code.push(`export type I${modelCapital} = ModelInterface<${modelCapital}>;

@Table({
\ttableName: "${makePlural(model.toLowerCase())}",
\ttimestamps: false,
})
export class ${modelCapital} extends Model {
${fields.join("\n\n")}
}`);
	}
	return {
		code: code.join(""),
		model: modelCapital,
	};
}

function makeField({ nullable, key, type, fk, primaryKey, hasOne, hasMany }: IModelField): string {
	const column = [];
	const nullableSymbol = nullable ? "?" : "";
	if (isPlain.value) {
		return `${camelCase(key)}${nullableSymbol}: ${type};`;
	}
	key = snakeCase(key);
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
		let associationKey = key.toLowerCase();
		associationKey = associationKey.endsWith("_id") ? associationKey : `${associationKey}_id`;
		const idField = makeField({
			type: "string",
			key: associationKey,
			fk: type,
		});
		column.push(`${idField}\n\n\t@BelongsTo(() => ${type}, "${associationKey}")`);
	}
	else {
		column.push("\t@Column");
	}
	return `${column.join("\n")}
\tdeclare ${key}${nullableSymbol}: ${type};`;
}

function createImport(values: string | string[], path?: string) {
	if (Array.isArray(values)) {
		values = values.join(", ");
	}
	if (isEmpty(path)) {
		path = `./${values}`;
	}
	return `import { ${values} } from "${path}";`;
}

function makeModel(input?: TInput, model?: string) {
	const output: IOutput[] = [];
	if (input && model) {
		const imports: string[] = [];
		const fields: string[] = [];
		for (let key in input) {
			let hasMany = false;
			let hasOne = false;
			const value = input[key];
			const nullable = value === undefined || value === null;
			let type = nullable ? "unknown" : typeof value;
			if (Array.isArray(value)) {
				const firstItem = value[0];
				if (isObject(firstItem)) {
					const response = makeModel(value[0], key);
					type = response[0]?.model ?? "unknown[]";
					hasMany = true;
					if (response.length) {
						output.push(...response);
						imports.push(createImport(type));
					}
				}
				else if (firstItem === null || firstItem === undefined) {
					type = "unknown[]";
				}
				else {
					type = `${typeof firstItem}[]`;
				}
			}
			else if (isObject(value)) {
				if (key.endsWith("Id")) {
					key = key.substring(0, key.lastIndexOf("Id"));
				}
				const response = makeModel(value as TInput, key);
				hasOne = true;
				type = response[0].model;
				imports.push(createImport(type));
				output.push(...response);
			}
			const primaryKey = key === "id";
			if (primaryKey) {
				imports.push(PrimaryKeyImport);
			}
			fields.push(makeField({
				type,
				nullable,
				hasMany,
				hasOne,
				key,
				primaryKey,
			}));
		}
		output.unshift(makeClass(fields, model, imports));
	}
	return output;
}

function onClickConvert() {
	const results = makeModel(validInput.value, modelName.value);
	outputValue.value = results;
	sequelizeTabs.value = results.map(({ model }) => model);
	selectedSequelizeTab.value = sequelizeTabs.value[0];
}

async function onClickDownload() {
	let contents: Blob;
	let extension: string;
	if (downloadSingleFile.value) {
		extension = "ts";
		let code = isPlain.value ? "" : [SequelizeImport, SrcImport, PrimaryKeyImport].join("\n") + "\n\n";
		code += outputValue.value.reduce((output, item) => `${output}` + item.code + "\n\n", "");
		contents = new Blob([code], {
			type: "text/plain",
		});
	}
	else {
		extension = "zip";
		contents = await downloadZip(outputValue.value.map(({ code, model }) => {
			return {
				input: code,
				name: `${model}.ts`,
			};
		})).blob();
	}
	downloadFile(contents, "models", extension);
}

function onClickCopyModel() {
	const $selectedContent = unref(selectedContent);
	if ($selectedContent) {
		navigator.clipboard.writeText($selectedContent);
	}
}
</script>

<template>
	<article class="size-full flex flex-col p-4 space-y-4">
		<section class="flex space-x-4">
			<FieldText
				v-model="modelName"
				label="Model Name"
				input-width="w-48"
			/>
			<FieldText
				v-model="modelSuffix"
				label="Model Suffix"
				input-width="w-32"
			/>
			<FieldComboBox
				v-model="selectedOutputOption"
				label="Output Type"
				:value-only="false"
				:options="outputOptions"
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
			<section class="flex flex-col space-y-4">
				<BaseButton
					text="Convert"
					:disabled="!validInput || !modelName"
					@click="onClickConvert"
				/>
				<BaseButton
					text="Download"
					:disabled="!outputValue.length"
					@click="onClickDownload"
				/>
				<FieldCheckbox
					v-model="downloadSingleFile"
					label="Single File"
				/>
			</section>
			<section class="flex flex-col flex-1 h-full max-h-full overflow-hidden">
				<FieldLabel
					:text="selectedOutputOption.name"
					position="top"
				/>
				<BaseTabs
					v-if="sequelizeTabs.length"
					v-model:selected="selectedSequelizeTab"
					class="basis-0 grow"
					:tabs="sequelizeTabs"
				>
					<template #content>
						<section class="sticky top-0 left-0 flex w-full h-0">
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
