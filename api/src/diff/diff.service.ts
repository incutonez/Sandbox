import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { getChanges } from "src/diff/diff.utilities";
import { TreeChangeModel } from "src/models/diff.entity";

@Injectable()
export class DiffService {
	getDiff() {
		const records: TreeChangeModel[] = [];
		for (let i = 0; i < faker.number.int({
			min: 1,
			max: 50,
		}); i++) {
			records.push(getChanges());
		}
		return records;
	}
}
