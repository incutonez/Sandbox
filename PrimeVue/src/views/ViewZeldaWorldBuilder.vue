<template>
	<div class="flex h-full space-x-4 p-4">
		<div class="flex min-w-44 flex-col">
			<FieldComboBox
				v-model="selectedScreen"
				:options="overworldRecords"
				:value-only="false"
				label-align="top"
				label="Screens"
				option-label="Name"
				option-value="Name"
			/>
			<BaseButton
				text="New"
				class="default mt-1 self-start rounded"
				@click="onClickNewButton"
			/>
		</div>
		<TileGrid
			v-model:selected-cell="selectedCell"
			:cells="selectedScreen?.cells"
			:total-columns="gridRecord.totalColumns"
			:total-rows="gridRecord.totalRows"
			:show-grid-lines="showGridLines"
			:get-cell-color="getCellColor"
			@replace-cell="onReplaceCell"
		/>
		<div class="min-w-72 space-y-2 overflow-auto">
			<div class="flex justify-between">
				<FieldCheckbox
					v-model="showGridLines"
					label="Grid Lines"
				/>
				<div>
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
				</div>
			</div>
			<BaseCard
				title="Screen Coordinates"
				class="bp-2 vertical"
			>
				<FieldDisplay
					:value="gridRecord.Name"
					label-position="left"
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
			</BaseCard>
			<BaseCard
				title="Colors"
				class="bp-2 vertical"
			>
				<FieldComboBox
					v-model="gridRecord.GroundColor"
					label="Ground"
					label-width="auto"
					:options="ZeldaWorldColors"
					width="w-28"
				/>
				<FieldComboBox
					v-model="gridRecord.AccentColor"
					label="Accent"
					label-width="auto"
					:options="ZeldaWorldColors"
					width="w-28"
				/>
			</BaseCard>
			<BaseCard
				v-if="selectedCell && selectedTile"
				:key="selectedCell.id"
				title="Cell"
				class="vertical"
			>
				<BaseCard
					class="vertical bp-2"
					title="Tile"
				>
					<div class="flex justify-between">
						<FieldComboBox
							v-model="selectedTile.Type"
							:options="ZeldaTiles"
							:value-only="false"
							label="Type"
							label-width="auto"
						/>
						<div
							v-show="showColors"
							class="h-16 w-16 bg-blue-100"
						>
							<img
								v-if="selectedTile.src"
								:src="selectedTile.src"
								class="h-full w-full"
								alt="Tile Image"
							>
						</div>
					</div>
					<BaseCard
						v-show="showColors"
						title="Replace Colors"
						class="vertical bp-2"
					>
						<FieldComboBox
							v-for="tileColor in selectedTile.Colors"
							:key="tileColor.Target.id"
							v-model="tileColor.Value"
							:label="tileColor.Target.name"
							:options="ZeldaWorldColors"
							:value-only="false"
							@update:model-value="onUpdateTileColor"
						/>
					</BaseCard>
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
							:options="ZeldaScreenTemplates"
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
							:options="ZeldaItems"
							label="Type"
							label-width="auto"
						/>
						<div class="flex h-16 w-16 justify-center bg-blue-100">
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
					<div class="flex justify-between">
						<div class="flex flex-col justify-between">
							<FieldComboBox
								v-model="selectedEnemy.Type"
								:options="ZeldaEnemies"
								label="Type"
								label-width="w-12"
							/>
							<FieldNumber
								v-model="selectedEnemy.Speed"
								label="Speed"
								label-width="w-12"
							/>
						</div>
						<div class="flex h-16 w-16 justify-center bg-blue-100">
							<img
								v-if="selectedEnemy.src"
								:src="selectedEnemy.src"
								class="h-full"
								alt="Item Image"
							>
						</div>
					</div>
					<BaseCard
						v-show="selectedEnemy.hasImage()"
						title="Replace Colors"
						class="vertical bp-2"
					>
						<FieldComboBox
							v-for="tileColor in selectedEnemy.Colors"
							:key="tileColor.Target.id"
							v-model="tileColor.Value"
							:label="tileColor.Target.name"
							:options="ZeldaWorldColors"
							@update:model-value="onUpdateEnemyColor"
						/>
					</BaseCard>
					<BaseCard
						title="Health"
						class="horizontal bp-2"
					>
						<FieldNumber
							v-model="selectedEnemy.Health"
							label="Health"
						/>
						<FieldNumber
							v-model="selectedEnemy.HealthModifier"
							label="Modifier"
						/>
					</BaseCard>
					<BaseCard
						title="Damage"
						class="horizontal bp-2"
					>
						<FieldNumber
							v-model="selectedEnemy.TouchDamage"
							label="Touch"
						/>
						<FieldNumber
							v-model="selectedEnemy.WeaponDamage"
							label="Weapon"
						/>
					</BaseCard>
				</BaseCard>
			</BaseCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseCard from "@/components/BaseCard.vue";
import FieldCheckbox from "@/components/FieldCheckbox.vue";
import FieldComboBox from "@/components/FieldComboBox.vue";
import FieldDisplay from "@/components/FieldDisplay.vue";
import FieldNumber from "@/components/FieldNumber.vue";
import { findRecordByName } from "@/enums/helper";
import { ZeldaItems } from "@/enums/ZeldaItems";
import { ZeldaEnemies } from "@/enums/ZeldaNPCs";
import { ZeldaScreenTemplates } from "@/enums/ZeldaScreenTemplates";
import { ZeldaTiles } from "@/enums/ZeldaTiles";
import { ZeldaWorldColors, ZeldaWorldColorsNone } from "@/enums/ZeldaWorldColors";
import { ZeldaScreen } from "@/models/ZeldaScreen";
import { ZeldaTileCell } from "@/models/ZeldaTileCell";
import { makeArray } from "@/utils/common";
import { provideCellCopy } from "@/views/zeldaWorldBuilder/cellCopy";
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
 * - Add special properties to ZeldaTiles... will need to wire this up in Unity code
 * -- Like CanBreak, CanBurn, CanBomb
 */
const fileInputEl = ref<HTMLInputElement>();
const selectedCell = ref<ZeldaTileCell>();
const showGridLines = ref(true);
const overworldRecords = reactive<ZeldaScreen[]>([]);
const gridRecord = ref(addGridRecord());
const selectedScreen = ref<ZeldaScreen>(gridRecord.value);
const isTransition = computed(() => selectedCell.value?.tile.isTransition);
const selectedTile = computed(() => selectedCell.value?.tile);
const selectedItem = computed(() => selectedCell.value?.item);
const selectedEnemy = computed(() => selectedCell.value?.enemy);
const showColors = computed(() => !isTransition.value && selectedTile.value?.hasImage());

function addGridRecord(config = {}) {
	const record = ZeldaScreen.create({
		totalRows: 11,
		totalColumns: 16,
		...config,
	}, {
		init: true,
	});
	overworldRecords.push(record);
	return record;
}

function getCellColor() {
	const found = findRecordByName(ZeldaWorldColors, gridRecord.value.GroundColor);
	if (found === ZeldaWorldColorsNone || !found) {
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
	indices.forEach((idx) => {
		const record = gridRecord.value.cells[idx];
		const clone = replacement.clone({
			exclude: ["grid", "Coordinates"],
		});
		clone.set({
			Coordinates: record.Coordinates,
			grid: record.grid,
		});
		clone.init();
		gridRecord.value.cells[idx] = clone;
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
	const name = $selectedScreen?.Name;
	gridRecord.value = overworldRecords.find((overworldRecord) => overworldRecord.Name === name)!;
});

provideCellCopy();
</script>
