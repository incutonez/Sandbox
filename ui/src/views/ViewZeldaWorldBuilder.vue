<template>
	<div class="flex h-full space-x-4 p-4">
		<article class="flex min-w-44 flex-col space-y-4">
			<section class="flex space-x-2">
				<FieldTreeBox
					v-model:selected="selectedScreen"
					:model-value="selectedScreen?.key"
					:options="overworldRecords"
					:value-only="false"
					label-align="top"
					label="Screens"
					option-label="Name"
					class="flex-1"
				/>
				<BaseButton
					:icon="IconAdd"
					title="Add Screen"
					@click="onClickNewButton"
				/>
			</section>
			<FieldCheckbox
				v-model="showGridLines"
				label="Grid Lines"
			/>
			<BaseCard
				title="Screen Coordinates"
				class="bp-2 vertical"
			>
				<FieldText
					v-model="gridRecord.Name"
					label="Name"
				/>
				<section class="flex space-x-2">
					<FieldNumber
						v-model="gridRecord.X"
						label="X"
						label-width="auto"
						input-width="w-12"
						width="w-28"
					/>
					<FieldNumber
						v-model="gridRecord.Y"
						label="Y"
						label-width="auto"
						input-width="w-12"
						width="w-28"
					/>
				</section>
				<FieldCheckbox
					v-model="gridRecord.OriginTopLeft"
					label="Origin Top Left"
				/>
				<FieldNumber
					v-model="gridRecord.CellSize"
					label="Cell Size"
				/>
			</BaseCard>
			<BaseCard
				title="Colors"
				class="bp-2 vertical"
			>
				<FieldWorldColors
					v-model="gridRecord.GroundColor"
					label="Ground"
					label-cls="w-12"
					width="w-28"
				/>
				<FieldWorldColors
					v-model="gridRecord.AccentColor"
					label="Accent"
					label-cls="w-12"
					width="w-28"
				/>
			</BaseCard>
			<section class="ml-auto">
				<BaseButton
					text="Save"
					class="default mr-2 rounded"
					@click="onClickSaveBtn"
				/>
				<BaseButton
					text="Load"
					class="default rounded"
					@click="onClickLoadBtn"
				/>
				<input
					v-show="false"
					ref="fileInputEl"
					type="file"
					@change="onChangeLoadFile"
				>
			</section>
		</article>
		<TileGrid
			v-model:selected-cell="selectedCell"
			:cells="selectedScreen?.cells"
			:total-columns="gridRecord.totalColumns"
			:total-rows="gridRecord.totalRows"
			:style="getCellColor()"
			:class="gridCls"
			@replace-cell="onReplaceCell"
		/>
		<article class="flex flex-col">
			<section class="w-72 flex-1 space-y-2 overflow-auto">
				<template v-if="selectedTile">
					<BaseCard
						class="vertical bp-2"
						title="Tile"
					>
						<div class="flex justify-between">
							<FieldComboBox
								v-model="selectedTile.Type"
								:options="Tiles"
								:value-only="false"
								option-label="displayName"
								label-position="top"
								label="Type"
								class="mr-2 flex-1"
							/>
							<div
								v-show="showColors"
								class="size-16 bg-blue-100"
							>
								<img
									v-if="selectedTile.src"
									:src="selectedTile.src"
									class="size-full"
									alt="Tile Image"
								>
							</div>
						</div>
						<template v-if="showColors">
							<hr>
							<FieldLabel
								text="Replace Colors"
								position="top"
								class="uppercase"
								size="medium"
								separator=""
							/>
							<FieldWorldColors
								v-for="tileColor in selectedTile.Colors"
								:key="tileColor.Target.id"
								v-model="tileColor.Value"
								:label="tileColor.Target.displayName"
								:value-only="false"
								@update:model-value="onUpdateTileColor"
							/>
						</template>
						<BaseCard
							v-if="isTransition && selectedTile.Transition"
							title="Transition Properties"
							class="vertical bp-2"
						>
							<FieldNumber
								v-model="selectedTile.Transition.X"
								label="X Offset"
								width="w-24"
							/>
							<FieldNumber
								v-model="selectedTile.Transition.Y"
								label="Y Offset"
								width="w-24"
							/>
							<FieldDisplay
								v-if="selectedTile.isDoor"
								:value="selectedTile.Transition.Name"
								label="Name"
							/>
							<FieldComboBox
								v-if="selectedTile.isDoor"
								v-model="selectedTile.Transition.Template"
								label="Template"
								required
								option-value="value"
								:options="ScreenTemplates"
							/>
							<FieldCheckbox
								v-model="selectedTile.Transition.IsFloating"
								label="Floating"
							/>
						</BaseCard>
					</BaseCard>
					<BaseCard
						title="Item"
						:expanded="false"
						class="vertical bp-2"
					>
						<div
							v-if="selectedItem"
							class="flex justify-between"
						>
							<FieldComboBox
								v-model="selectedItem.Type"
								:options="Items"
								:value-only="false"
								label="Type"
								label-position="top"
								class="mr-2 flex-1"
							/>
							<div class="flex size-16 justify-center bg-blue-100">
								<img
									v-if="selectedItem.src"
									:src="selectedItem.src"
									class="h-full"
									alt="Item Image"
								>
							</div>
						</div>
					</BaseCard>
					<BaseCard
						v-if="selectedEnemy"
						title="Enemy"
						:expanded="false"
						class="vertical bp-2"
					>
						<div class="flex items-center justify-between">
							<div class="mr-2 flex flex-1 flex-col justify-between space-y-2">
								<FieldComboBox
									v-model="selectedEnemy.Type"
									:options="Enemies"
									:value-only="false"
									label="Type"
									label-cls="w-12"
								/>
								<FieldNumber
									v-model="selectedEnemy.Speed"
									label="Speed"
									label-cls="w-12"
								/>
							</div>
							<div class="flex size-16 justify-center bg-blue-100">
								<img
									v-if="selectedEnemy.src"
									:src="selectedEnemy.src"
									class="h-full"
									alt="Item Image"
								>
							</div>
						</div>
						<template v-if="selectedEnemy.hasImage()">
							<hr>
							<FieldLabel
								text="Replace Colors"
								position="top"
								class="uppercase"
								size="medium"
								separator=""
							/>
							<FieldWorldColors
								v-for="tileColor in selectedEnemy.Colors"
								:key="tileColor.Target.id"
								v-model="tileColor.Value"
								:value-only="false"
								:label="tileColor.Target.displayName"
								@update:model-value="onUpdateEnemyColor"
							/>
						</template>
						<hr>
						<FieldLabel
							text="Health"
							position="top"
							class="uppercase"
							size="medium"
							separator=""
						/>
						<FieldNumber
							v-model="selectedEnemy.Health"
							label="Value"
							label-cls="w-16"
						/>
						<FieldNumber
							v-model="selectedEnemy.HealthModifier"
							label="Modifier"
							label-cls="w-16"
						/>
						<hr>
						<FieldLabel
							text="Damage"
							position="top"
							class="uppercase"
							size="medium"
							separator=""
						/>
						<FieldNumber
							v-model="selectedEnemy.TouchDamage"
							label="Touch"
							label-cls="w-14"
						/>
						<FieldNumber
							v-model="selectedEnemy.WeaponDamage"
							label="Weapon"
							label-cls="w-14"
						/>
					</BaseCard>
				</template>
			</section>
		</article>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, unref, watch } from "vue";
import IconAdd from "@/assets/IconAdd.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseCard from "@/components/BaseCard.vue";
import FieldCheckbox from "@/components/FieldCheckbox.vue";
import FieldComboBox from "@/components/FieldComboBox.vue";
import FieldDisplay from "@/components/FieldDisplay.vue";
import FieldLabel from "@/components/FieldLabel.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import FieldText from "@/components/FieldText.vue";
import FieldTreeBox from "@/components/FieldTreeBox.vue";
import { findRecord } from "@/enums/helper";
import { Items } from "@/enums/zelda/Items";
import { Enemies } from "@/enums/zelda/NPCs";
import { ScreenTemplates } from "@/enums/zelda/ScreenTemplates";
import { Tiles } from "@/enums/zelda/Tiles";
import { WorldColors, WorldColorsNone } from "@/enums/zelda/WorldColors";
import { Parent } from "@/models/ViewModel";
import { ZeldaScreen } from "@/models/ZeldaScreen";
import { ZeldaTileCell } from "@/models/ZeldaTileCell";
import { ITreeOption } from "@/types/components";
import { makeArray } from "@/utils/common";
import { provideCellCopy } from "@/views/zeldaWorldBuilder/cellCopy";
import FieldWorldColors from "@/views/zeldaWorldBuilder/FieldWorldColors.vue";
import TileGrid from "@/views/zeldaWorldBuilder/TileGrid.vue";

/**
 * TODOJEF:
 * - I think I need to rework the JSON output... it should output the entire world in a single JSON, and load it that way...
 * -- This is because I think it'll eventually get shoved into a DB
 * - Add special properties for Transitions
 * - Should rename Door to ShopDoor, as it's a little special
 * - Optimize the export... right now, it does all individual cells... should be able to group by type
 * - Load into Unity game to see it working
 * - Finish other TODOJEFs
 * - Add special properties to Tiles... will need to wire this up in Unity code
 * -- Like CanBreak, CanBurn, CanBomb
 */
const fileInputEl = ref<HTMLInputElement>();
const selectedCell = ref<ZeldaTileCell>();
const showGridLines = ref(true);
const overworldRecords = reactive<ITreeOption<ZeldaScreen>[]>([]);
const selectedScreen = ref<ITreeOption<ZeldaScreen>>();
const gridRecord = ref(addGridRecord());
const isTransition = computed(() => selectedCell.value?.tile.isTransition);
const selectedTile = computed(() => selectedCell.value?.tile);
const selectedItem = computed(() => selectedCell.value?.item);
const selectedEnemy = computed(() => selectedCell.value?.enemy);
const showColors = computed(() => !isTransition.value && selectedTile.value?.hasImage());
const gridCls = computed(() => {
	return {
		"grid-origin-top-left": gridRecord.value.OriginTopLeft,
		"grid-show-lines": showGridLines.value,
	};
});

function addGridRecord(config = {}) {
	const record = ZeldaScreen.create({
		totalRows: 11,
		totalColumns: 16,
		...config,
	}, {
		init: true,
	});
	selectedScreen.value = {
		key: record.Name,
		label: record.Name,
		data: record,
	};
	overworldRecords.push(selectedScreen.value);
	return record;
}

function getCellColor() {
	const found = findRecord(WorldColors, gridRecord.value.GroundColor);
	if (found === WorldColorsNone || !found) {
		return "";
	}
	return `background-color: #${found.id};`;
}

function onUpdateTileColor() {
	selectedTile.value?.updateImage();
}

function onUpdateEnemyColor() {
	selectedEnemy.value?.updateImage();
}

function onReplaceCell({ indices, replacement }: { indices: number | number[], replacement: ZeldaTileCell }) {
	indices = makeArray(indices);
	// Make sure we update the selection with the replacement
	selectedCell.value = replacement;
	const $gridRecord = unref(gridRecord);
	indices.forEach((idx) => {
		const record = $gridRecord.cells[idx];
		const clone = replacement.clone({
			options: {
				init: true,
			},
		});
		clone.Coordinates = record.Coordinates;
		// Replace the parent, as it gets cloned incorrectly
		clone[Parent] = $gridRecord!;
		$gridRecord.cells[idx] = clone;
	});
}

function onClickLoadBtn() {
	fileInputEl.value?.click();
}

function onChangeLoadFile() {
	const reader = new FileReader();
	reader.addEventListener("load", () => {
		gridRecord.value.loadFileData(JSON.parse(reader.result as string));
	});
	const [file] = fileInputEl.value?.files ?? [];
	if (file) {
		reader.readAsText(file);
	}
}

// TODOJEF: Need to make this save all files to overworld or redesign the files, so we can have 1 overworld file
function onClickSaveBtn() {
	// TODO: Move this logic to a utility function
	const contents = new Blob([JSON.stringify(gridRecord.value.getConfig())], {
		type: "application/json",
	});
	const tempEl = document.createElement("a");
	tempEl.download = `${gridRecord.value.X}${gridRecord.value.Y}.json`;
	tempEl.href = window.URL.createObjectURL(contents);
	tempEl.click();
}

function onClickNewButton() {
	addGridRecord({
		Name: "TEMPORARY NAME",
	});
}

watch(selectedScreen, ($selectedScreen) => {
	selectedCell.value = undefined;
	gridRecord.value = $selectedScreen!.data!;
});

watch(() => gridRecord.value?.OriginTopLeft, () => {
	gridRecord.value?.cells.forEach((cell) => cell.Coordinates = [cell.x, 10 - cell.y]);
});

provideCellCopy();
</script>
