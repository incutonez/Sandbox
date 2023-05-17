import type { DiffModel } from "shared-differ";

export interface ITreeRow extends DiffModel {
    path?: (string | number)[];
    statusDisplay?: string;
}

export interface ITreeRowMeta {
    index: number;
    date: number;
    username: string;
}
