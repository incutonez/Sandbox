import { DiffEntity, DifferApi } from "@incutonez/spec/dist";
import { configuration } from "@/apiConfig";
import { ViewModel } from "@/models/ViewModel";

export const DifferAPI = new DifferApi(configuration);

export class DiffModel extends ViewModel implements DiffEntity {
	field = "";
	value = "";

	static async readAll() {
		const response = await DifferAPI.getDiff();
		return response.data;
	}
}
