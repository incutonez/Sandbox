import { DifferApi, TreeItemModel } from "@incutonez/spec";
import { configuration } from "@/apiConfig";
import { ViewModel } from "@/models/ViewModel";

export const DifferAPI = new DifferApi(configuration);

export class TreeViewModel extends ViewModel implements TreeViewModel {
	username = "";
	date = Date.now();
	items: TreeItemModel[] = [];

	static async readAll() {
		const response = await DifferAPI.getDiff();
		return response.data;
	}
}
