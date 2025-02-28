<script setup lang="ts">
import { ref } from "vue";
import { BaseButton, BaseDialog, TableCellActions, TableGrid } from "@incutonez/core-ui";
import { IconDelete, IconImport } from "@incutonez/core-ui/assets";
import { ITableCellActions, ITableColumn } from "@incutonez/core-ui/types";
import { removeItem } from "@incutonez/core-ui/utils";
import { BulkResponse } from "@incutonez/spec/dist";
import { UserModel } from "@/models/UserModel";
import { useUsersDefaultColumns } from "@/views/users/usersColumns";
import { injectUsersImport } from "@/views/users/usersProvider";

const errors = ref<BulkResponse[]>([]);
const loading = ref(false);
const { users } = injectUsersImport();
const columns: ITableColumn[] = [{
	lock: "left",
	showMenu: false,
	cls: "w-8",
	cellClass: "text-center",
	cellComponent: TableCellActions,
	cellParams(record: UserModel) {
		return {
			class: "justify-end",
			actions: [{
				title: "Delete",
				icon: IconDelete,
				onClick() {
					removeItem(users.value, record);
				},
			}],
		} as ITableCellActions;
	},

}, ...useUsersDefaultColumns(), {
	title: "Errors",
	cellDisplay(data, records) {
		const index = records.indexOf(data);
		return errors.value[index]?.message.join("\n");
	},
}];

async function onClickImport() {
	loading.value = true;
	errors.value = await UserModel.bulk(users.value);
	users.value = users.value.filter((_, i) => !!errors.value.find(({ index }) => index === i));
	loading.value = false;
}
</script>

<template>
	<BaseDialog
		title="Import Users"
		class="size-full"
		body-cls="h-full !p-0"
	>
		<template #body>
			<TableGrid
				ref="usersGrid"
				:columns="columns"
				:records="users"
				:show-header="false"
				:show-pagination="false"
			/>
		</template>
		<template #beforeCancel>
			<BaseButton
				text="Import"
				:icon="IconImport"
				:loading="loading"
				@click="onClickImport"
			/>
		</template>
	</BaseDialog>
</template>
