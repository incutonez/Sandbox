import type { DiffModel } from "shared-differ";

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
    }
}
