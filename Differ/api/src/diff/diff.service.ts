import { Injectable } from "@nestjs/common";
import { diff } from "just-diff";
import { faker } from "@faker-js/faker";
import { get, set } from "lodash";
import { ChangeStatus, generateData, getChanges, treeDiff } from "./diff.utilities";

@Injectable()
export class DiffService {
  getDiff() {
    const records = [];
    for (let i = 0; i < faker.number.int({
      min: 1,
      max: 1,
    }); i++) {
      records.push(getChanges());
    }
    return records;
  }
}
