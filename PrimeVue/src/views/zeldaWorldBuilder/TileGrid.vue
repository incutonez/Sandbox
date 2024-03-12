<template>
	<div
		ref="rootEl"
		class="base-grid"
		v-bind="$attrs"
	>
		<div
			v-for="cell in cells"
			:key="cell.id"
			class="relative"
			:class="getCellCls(cell)"
			:style="getCellColor()"
			@mouseup="onMouseUpCell($event, cell)"
			@contextmenu="onContextMenuCell"
			@mouseover="onMouseOverCell(cell)"
		>
			<img
				v-if="cell.tile.image"
				:src="cell.tile.image"
				class="absolute h-full w-full"
				alt="Tile Image"
			>
			<div
				v-if="cell.item.image"
				class="absolute flex h-full w-full justify-center"
			>
				<img
					:src="cell.item.image"
					class="h-full"
					alt="Item Image"
				>
			</div>
			<div
				v-if="cell.enemy.image"
				class="absolute flex h-full w-full justify-center"
			>
				<img
					:src="cell.enemy.image"
					class="h-full"
					alt="Enemy Image"
				>
			</div>
		</div>
	</div>
	<BaseContextMenu
		ref="contextMenu"
		:items="contextItems"
	/>
	<BaseDialog
		ref="testDialog"
		v-model="showTestDialog"
		title="Hello World"
	>
		<template #body>
			<FieldDisplay
				:value="testValue"
				label="Hello"
			/>
		</template>
	</BaseDialog>
</template>

<script setup lang="ts">
import {
	onMounted,
	ref, unref,
	watch,
} from "vue";
import BaseContextMenu from "@/components/BaseContextMenu.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import FieldDisplay from "@/components/FieldDisplay.vue";
import { ZeldaTileCell } from "@/models/ZeldaTileCell";
import { IMenuItem } from "@/types/components";
import { injectCellCopy } from "@/views/zeldaWorldBuilder/cellCopy";

defineOptions({
	inheritAttrs: false,
});

interface IProps {
	cells?: ZeldaTileCell[];
	totalRows: number;
	totalColumns: number;
	selectedCell?: ZeldaTileCell;
	getCellColor: () => string;
	showGridLines?: boolean;
}

const props = defineProps<IProps>();
const	emit = defineEmits(["update:selectedCell", "replaceCell"]);
const rootEl = ref<HTMLElement>();
const contextMenu = ref<InstanceType<typeof BaseContextMenu>>();
const testDialog = ref(null);
const testValue = ref("Hello");
const pressedKeys = injectCellCopy();
const activeCursor = ref("cursor-pointer");
const lastCopiedCell = ref<ZeldaTileCell>();
const hoverCell = ref<ZeldaTileCell>();
const hoverRow = ref<number>();
const hoverColumn = ref<number>();
const showTestDialog = ref(false);
const contextItems: IMenuItem[] = [{
	text: "Tiles",
	click: onClickTilesMenu,
}];

function getCellCls(cell: ZeldaTileCell) {
	let hoverCls = false;
	const $hoverCell = unref(hoverCell);
	if (props.selectedCell && pressedKeys.shift && $hoverCell) {
		const y = cell.y;
		const x = cell.x;
		let fromX = props.selectedCell.x;
		let fromY = props.selectedCell.y;
		let toX = $hoverCell.x;
		let toY = $hoverCell.y;
		if (fromX > toX) {
			fromX = toX;
			toX = props.selectedCell.x;
		}
		if (fromY > toY) {
			fromY = toY;
			toY = props.selectedCell.y;
		}
		if (x <= toX && y <= toY && x >= fromX && y >= fromY) {
			hoverCls = true;
		}
	}
	return {
		[`grid-cell row-start-${props.totalRows - cell.y}`]: true,
		"grid-cell-selected": cell === props.selectedCell,
		"grid-cell-hover": hoverCls,
		[activeCursor.value]: true,
	};
}

function getSelectedCells() {
	const cells = [];
	const totalColumns = props.totalColumns;
	const selectedCell = props.selectedCell;
	const $hoverCell = unref(hoverCell);
	if (selectedCell && $hoverCell) {
		let fromX = selectedCell.x;
		let fromY = selectedCell.y;
		let toX = $hoverCell.x;
		let toY = $hoverCell.y;
		/**
     * We have to look at what quadrant our range is in and re-orient our origin if need be
     */
		if (fromX > toX) {
			fromX = toX;
			toX = selectedCell.x;
		}
		if (fromY > toY) {
			fromY = toY;
			toY = selectedCell.y;
		}
		for (let x = fromX; x <= toX; x++) {
			for (let y = fromY; y <= toY; y++) {
				const index = x + y * totalColumns;
				if (index === selectedCell.getIndex()) {
					continue;
				}
				cells.push(index);
			}
		}
	}
	return cells;
}

/**
 * We use mouseup instead of click because of the ctrl-copy flow... that monitors mousedown and up,
 * so we can't rely on click, as that'll change it back to false before we can look at the value
 */
function onMouseUpCell(_event: MouseEvent, cell: ZeldaTileCell) {
	const { selectedCell } = props;
	if (pressedKeys.ctrl && pressedKeys.mouseDown && selectedCell) {
		emit("replaceCell", {
			indices: cell.getIndex(),
			replacement: selectedCell,
		});
		return;
	}
	if (pressedKeys.shift) {
		const indices = getSelectedCells();
		emit("replaceCell", {
			indices,
			// TODOJEF: More performant to call set instead of cloning all the time?
			replacement: selectedCell,
		});
		const selection = document.getSelection();
		if (selection) {
			selection.removeAllRanges();
		}
		return;
	}
	console.log("here", cell);
	emit("update:selectedCell", cell === selectedCell ? undefined : cell);
}

function onContextMenuCell(event: MouseEvent) {
	contextMenu.value?.show(event);
}

function hideContextMenu() {
	contextMenu.value?.hide();
}

function onMouseOverCell(cell: ZeldaTileCell) {
	hoverCell.value = cell;
	hoverRow.value = cell.y;
	hoverColumn.value = cell.x;
}

function toggleGridLines(value: boolean) {
	if (value) {
		rootEl.value?.classList.add("grid-show-lines");
	}
	else {
		rootEl.value?.classList.remove("grid-show-lines");
	}
}

function onClickTilesMenu() {
	showTestDialog.value = true;
	hideContextMenu();
}

// We don't use watchEffect here because this fires before onMounted, which means rootEl is undefined
watch(() => props.showGridLines, (value) => {
	toggleGridLines(value);
});

watch(() => {
	return pressedKeys.shift || pressedKeys.ctrl;
}, () => {
	if (pressedKeys.shift) {
		activeCursor.value = "cursor-cell";
	}
	else if (pressedKeys.ctrl) {
		activeCursor.value = "cursor-copy";
	}
	else {
		activeCursor.value = "cursor-pointer";
	}
});

watch(() => pressedKeys.copy, (value) => {
	if (value) {
		lastCopiedCell.value = props.selectedCell;
	}
});

watch(() => pressedKeys.paste, (value) => {
	const selectedCell = props.selectedCell;
	const replacement = lastCopiedCell.value;
	if (value && selectedCell && replacement && selectedCell !== replacement) {
		const indices = props.cells?.indexOf(selectedCell);
		emit("replaceCell", {
			indices,
			replacement: replacement,
		});
	}
});

onMounted(() => toggleGridLines(props.showGridLines));
</script>
