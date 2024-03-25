import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { getChanges } from "src/diff/diff.utilities";
import { TDiffValue } from "src/models/diff.entity";

@Injectable()
export class DiffService {
	getDiff() {
		const records: Record<string, TDiffValue>[] = [];
		for (let i = 0; i < faker.number.int({
			min: 1,
			max: 50,
		}); i++) {
			records.push({
				username: faker.internet.userName(),
				date: faker.date.anytime().getTime(),
				items: getChanges(),
			});
		}
		return records;
	}
}
