import type { DiffModel } from "@incutonez/differ-shared";

export interface ITreeRow extends DiffModel {
	path?: (string | number)[];
}

export interface ITreeRowMeta {
	index: number;
	date: number;
	username: string;
	changes: {
		create: number;
		update: number;
		delete: number;
	};
}

export interface IPropsAGTable {
	serverPaging?: boolean;
	items: any[];
}
