import { Injectable } from "@nestjs/common";
import { faker } from "@faker-js/faker";
import { getChanges } from "./diff.utilities";

@Injectable()
export class DiffService {
  getDiff() {
    const records = [];
    for (let i = 0; i < faker.number.int({
      min: 1,
      max: 50,
    }); i++) {
      records.push(getChanges());
    }
    return records;
  }
}
