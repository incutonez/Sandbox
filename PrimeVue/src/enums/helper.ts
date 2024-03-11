import { type IOption } from "@/types/components";

export function findRecord(enums: IOption[], value?: string | number) {
	return enums.find((record) => record.id === value);
}

export function findRecordByName(enums: IOption[], value?: string | number) {
	return enums.find((record) => record.name === value);
}

export function getIdByName(enums: IOption[], value?: string | number) {
	return findRecordByName(enums, value)?.id;
}

export function getNameById(enums: IOption[], value?: string | number) {
	return findRecord(enums, value)?.name;
}
