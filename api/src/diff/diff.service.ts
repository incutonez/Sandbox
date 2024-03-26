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
			const record = new TreeChangeModel();
			record.username = faker.internet.userName();
			record.date = faker.date.anytime().getTime();
			record.items = getChanges();
			records.push(record);
		}
		return records;
	}
}
