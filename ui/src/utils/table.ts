import { computed, markRaw, reactive, ref, unref, watch } from "vue";
import { FilterType } from "@incutonez/spec/dist";
import get from "just-safe-get";
import { ColumnProps } from "primevue/column";
import { DataTableProps } from "primevue/datatable";
import IconLock from "@/assets/IconLock.vue";
import IconNotAllowed from "@/assets/IconNotAllowed.vue";
import IconPin from "@/assets/IconPin.vue";
import IconResetColumn from "@/assets/IconResetColumn.vue";
import IconResetColumns from "@/assets/IconResetColumns.vue";
import { IBaseMenu } from "@/components/BaseMenu.vue";
import { IMenuItem, IOption } from "@/types/components";
import { IPassThroughOptions, ITableColumn, ITableGrid, ITreeNode, TColumnLock, TTableEmit } from "@/types/table";

export const RowsPerPageOptions: IOption[] = [{
	id: 10,
	name: "10",
}, {
	id: 20,
	name: "20",
}, {
	id: 50,
	name: "50",
}, {
	id: 100,
	name: "100",
}];

export function getColumnProps({ field, title, classes, titleCls, titleAlign, sortable, lock, cls = "", showMenu = true, id, expandable, rowspan = 1, colspan = 1 }: ITableColumn) {
	const headerContentCls = [];
	if (showMenu) {
		headerContentCls.push("pr-10");
	}
	if (titleAlign === "center") {
		headerContentCls.push("justify-center");
	}
	else if (titleAlign === "right") {
		headerContentCls.push("justify-end");
	}
	if (lock === false) {
		lock = undefined;
	}
	const columnProps: ColumnProps = {
		field,
		rowspan,
		colspan,
		pt: {
			headerContent: {
				class: headerContentCls,
			},
			...classes,
		},
		header: title,
		headerClass: titleCls,
		sortable: sortable ?? true,
		frozen: !!lock,
		alignFrozen: lock,
		class: cls,
		columnKey: id,
		expander: expandable,
	};
	return reactive(columnProps);
}

export function setColumnLock(lock: TColumnLock, column: ITableColumn) {
	column.lock = lock;
	if (column.props) {
		column.props.frozen = !!column.lock;
		column.props.alignFrozen = column.lock === false ? undefined : column.lock;
	}
}

function reorderColumns(columns: ITableColumn[]) {
	// TODOJEF: There's an issue here where we drag a column to change its order, and then try to lock it... this
	// columnsConfig is sorted correctly, but it's not respected in the UI
	columns.sort(({ lock: lhs }, { lock: rhs }) => {
		if (lhs === "left") {
			return -1;
		}
		else if (rhs === "left") {
			return 1;
		}
		else if (lhs === false) {
			return -1;
		}
		else if (rhs === false) {
			return 1;
		}
		else if (lhs === "right") {
			return 1;
		}
		else if (rhs === "right") {
			return -1;
		}
		return 0;
	});
}

export function useDataTable<T = unknown>(props: ITableGrid, emit: TTableEmit) {
	const columnsConfig = ref<ITableColumn[]>([]);
	const filterFields = ref<string[]>([]);
	const recordsCached = ref<T[]>([]);
	const recordsTotal = ref(0);
	const rowsPerPage = ref(20);
	const currentPage = ref(1);
	const loading = ref(false);
	const search = ref("");
	const start = computed(() => (currentPage.value - 1) * rowsPerPage.value);
	const max = computed(() => props.remoteMax ?? rowsPerPage.value);
	const propsComponent = computed(() => {
		const tableProps: DataTableProps = {
			showGridlines: props.showLinesRow,
			rowHover: props.showHoverRow,
			scrollable: true,
			scrollHeight: "flex",
			size: "small",
			stripedRows: props.showStripedRows,
			resizableColumns: props.columnsResize,
			columnResizeMode: "expand",
			reorderableColumns: props.columnsReorder,
			removableSort: true,
			paginator: true,
			paginatorTemplate: "",
		};
		if (props.multiSelect) {
			tableProps.selectionMode = "multiple";
		}
		else if (props.multiSelect === false) {
			tableProps.selectionMode = "single";
		}
		return tableProps;
	});
	const startDisplay = computed(() => (recordsTotal.value === 0 ? 0 : start.value + 1));
	const endDisplay = computed(() => {
		const end = start.value + rowsPerPage.value;
		return end > recordsTotal.value ? recordsTotal.value : end;
	});
	const isPageFirst = computed(() => currentPage.value === 1);
	const isPageLast = computed(() => start.value + rowsPerPage.value >= recordsTotal.value);
	const totalPages = computed(() => Math.ceil(recordsTotal.value / rowsPerPage.value));

	function previousPage() {
		currentPage.value--;
		loadRecords();
	}

	function nextPage() {
		currentPage.value++;
		loadRecords();
	}

	function changePage(value: number) {
		if (!value) {
			value = 1;
		}
		else if (value > totalPages.value) {
			value = totalPages.value;
		}
		currentPage.value = value;
		loadRecords();
	}

	function changeRowsPerPage(value: number) {
		currentPage.value = Math.floor((start.value + 1) / value) + 1;
		rowsPerPage.value = value;
		loadRecords();
	}

	function getCellDisplay({ cellDisplay }: ITableColumn, { data, field }: any) {
		if (cellDisplay) {
			return cellDisplay(data, recordsCached.value);
		}
		return get(data, field);
	}

	function getNodeDisplay({ cellDisplay }: ITableColumn, { node, column }: { node: ITreeNode, column: ITableColumn }) {
		if (cellDisplay) {
			return cellDisplay(node.data, recordsCached.value);
		}
		return get(node.data, column.key ?? "");
	}

	function getCellParams({ cellParams }: ITableColumn, data: any) {
		if (typeof cellParams === "function") {
			return cellParams(data, recordsCached.value);
		}
		return {
			...cellParams,
			data,
		};
	}

	function getNodeParams({ cellParams }: ITableColumn, node: ITreeNode) {
		if (typeof cellParams === "function") {
			return cellParams(node, recordsCached.value);
		}
		return {
			...cellParams,
			node,
		};
	}

	function getCellClass(column: ITableColumn, node: ITreeNode) {
		if (typeof column.cellClass === "function") {
			return column.cellClass(column, node);
		}
		return column.cellClass ?? "";
	}

	function getColumnMenuConfig(column: ITableColumn): IBaseMenu {
		const items: IMenuItem[] = [];
		if (column.stateful) {
			items.push({
				text: "Lock Column",
				icon: IconLock,
				items: [{
					text: "Left",
					icon: IconPin,
					iconCls: "rotate-90",
					click() {
						setColumnLock("left", column);
						reorderColumns(columnsConfig.value);
					},
				}, {
					text: "Right",
					icon: IconPin,
					iconCls: "-rotate-90",
					click() {
						setColumnLock("right", column);
						reorderColumns(columnsConfig.value);
					},
				}, {
					text: "None",
					icon: IconNotAllowed,
					click() {
						setColumnLock(false, column);
						reorderColumns(columnsConfig.value);
					},
				}],
			}, {
				text: "Reset Column",
				icon: IconResetColumn,
			}, {
				text: "Reset All Columns",
				icon: IconResetColumns,
			});
		}
		return {
			items,
		};
	}

	async function loadRecords(loadCount?: number) {
		const { load } = props;
		if (load) {
			const $recordsCached = unref(recordsCached);
			const $start = unref(start);
			const $recordsTotal = unref(recordsTotal);
			let i = $start;
			let isCached = true;
			let lastIndex = $start + rowsPerPage.value;
			// We need to adjust the last index if we're out of bounds from the total
			if ($recordsTotal) {
				lastIndex = lastIndex > $recordsTotal - 1 ? $recordsTotal : lastIndex;
			}
			// Check to see if we've already cached all the records in the range we're about to load
			for (i; i < lastIndex; i++) {
				if ($recordsCached[i] === undefined) {
					isCached = false;
					break;
				}
			}
			/**
			 * If our loadCount is >= rowsPerPage, then that means we've loaded the range... we must check rowsPerPage because
			 * the max isn't sufficient, as it could just be the remoteMax value instead of how many rows we want to
			 * display.  We also check to see if we've loaded < the max, as that means we've most likely hit the last row of
			 * results.
			 */
			if (isCached || loadCount === 0 || loadCount === $recordsTotal || (loadCount && (loadCount >= rowsPerPage.value || loadCount < max.value))) {
				loading.value = false;
				return;
			}
			const page = currentPage.value;
			const $max = unref(max);
			loading.value = true;
			try {
				const filters: FilterType[] = [];
				if (search.value) {
					filters.push({
						type: "Search",
						value: search.value,
					});
				}
				const response = await load({
					page,
					filters,
					start: i,
					limit: $max,
				});
				const data = Array.isArray(response) ? response : response.data ?? [];
				loadCount ??= 0;
				loadCount += data.length;
				if (response.total) {
					recordsTotal.value = response.total;
				}
				for (const item of data) {
					$recordsCached[i++] = item;
				}
				// Fire off the next load, in case we need to get the next page of records
				loadRecords(loadCount);
			}
			catch (ex) {
				loading.value = false;
				throw ex;
			}
		}
		else {
			emit("load");
		}
	}

	watch(() => props.columns, (columns = []) => {
		const { remote } = props;
		filterFields.value = [];
		columnsConfig.value = columns.map(({ ...initialConfig }, index) => {
			const column: ITableColumn = markRaw(initialConfig);
			column.id ??= column.field || `col_${index}`;
			column.indexOriginal = index;
			column.stateful ??= true;
			column.lock ??= false;
			column.props = getColumnProps(column);
			if (column.field && !remote) {
				filterFields.value.push(column.field);
			}
			return column;
		});
		// TODO: eventually need to sort the columns based on state index
	}, {
		immediate: true,
	});

	return {
		startDisplay,
		endDisplay,
		isPageFirst,
		isPageLast,
		totalPages,
		columnsConfig,
		filterFields,
		propsComponent,
		loadRecords,
		recordsTotal,
		recordsCached,
		search,
		start,
		loading,
		rowsPerPage,
		currentPage,
		previousPage,
		nextPage,
		changeRowsPerPage,
		changePage,
		getCellParams,
		getCellClass,
		getNodeParams,
		getCellDisplay,
		getNodeDisplay,
		getColumnMenuConfig,
	};
}

export function getPassThroughNode<T = any>(options: IPassThroughOptions): ITreeNode<T> {
	return options.parent.props.node;
}
