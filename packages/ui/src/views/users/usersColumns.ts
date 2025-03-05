import { ITableColumn } from "@incutonez/core-ui/types";

export function useUsersDefaultColumns(): ITableColumn[] {
	return [{
		field: "firstName",
		title: "First Name",
		cls: "min-w-32",
		lock: "left",
	}, {
		field: "lastName",
		title: "Last Name",
		cls: "min-w-32",
		lock: "left",
	}, {
		field: "phone",
		title: "Phone",
	}, {
		field: "email",
		title: "Email",
	}, {
		field: "gender",
		title: "Gender",
	}, {
		field: "birthDate",
		title: "Birth Date",
	}];
}
