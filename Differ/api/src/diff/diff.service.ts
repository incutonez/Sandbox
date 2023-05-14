import { Injectable } from "@nestjs/common";
import { diff } from "just-diff";
import { faker } from "@faker-js/faker";
import { get, isArray, isObject, set } from "lodash";

const PropertyTypes = ["string", "number", "date", "boolean", "object", "array"] as const;
type TPropertyTypes = typeof PropertyTypes[number];
const PropertyTypesTotal = PropertyTypes.length - 1;

/**
 * @param depth
 * This is a max depth value for when recursively calling generateData... by default, it's 2, which will
 * at most give you an object that has 2 levels of nested data.
 */
function generateData(depth = 2) {
  const previous = {};
  const current = {};
  const totalProperties = faker.number.int({
    min: 4,
    max: 10,
  });
  for (let i = 0; i < totalProperties; i++) {
    let value;
    const fieldName = faker.word.noun();
    const shouldChange = faker.datatype.boolean();
    let propType: TPropertyTypes = PropertyTypes[faker.number.int({
      min: 0,
      max: PropertyTypesTotal,
    })];
    while (depth === 0 && (propType === "object" || propType === "array")) {
      propType = PropertyTypes[faker.number.int({
        min: 0,
        max: PropertyTypesTotal,
      })];
    }
    switch (propType) {
      case "string":
        previous[fieldName] = faker.string.alpha();
        current[fieldName] = shouldChange ? faker.string.alpha() : previous[fieldName];
        break;
      case "number":
        previous[fieldName] = faker.number.float();
        current[fieldName] = shouldChange ? faker.number.float() : previous[fieldName];
        break;
      case "date":
        previous[fieldName] = faker.date.anytime().getTime();
        current[fieldName] = shouldChange ? faker.date.anytime() : previous[fieldName];
        break;
      case "boolean":
        previous[fieldName] = faker.datatype.boolean();
        current[fieldName] = shouldChange ? faker.datatype.boolean() : previous[fieldName];
        break;
      case "object":
        value = generateData(depth - 1);
        previous[fieldName] = value.previous;
        current[fieldName] = value.current;
        break;
      case "array":
        previous[fieldName] = [];
        current[fieldName] = [];
        for (let j = 0; j < faker.number.int({
          min: 0,
          max: 5,
        }); j++) {
          value = generateData(depth - 1);
          previous[fieldName].push(value.previous);
          current[fieldName].push(value.current);
        }
        break;
    }
  }
  return {
    previous,
    current,
  };
}

const ChangeStatus = {
  Unchanged: 0,
  Created: 1,
  Updated: 2,
  Deleted: 3,
};

const Converted = Symbol("converted");

interface ITreeDiff {
  value: any;
  field?: string | number;
  previous?: any;
  status?: typeof ChangeStatus[keyof typeof ChangeStatus];
  [Converted]?: boolean;
}

function treeDiff({ value, previous, status, field }: ITreeDiff) {
  if (value?.[Converted]) {
    return value;
  }
  else if (isArray(value)) {
    const items = [];
    value.forEach((record, index) => {
      items.push({
        field: index,
        value: treeDiff({
          status,
          value: record,
          field: index,
        }),
      });
    });
    const result: ITreeDiff = {
      field,
      value: items,
    };
    if (value.length === 0) {
      result.status = ChangeStatus.Unchanged;
    }
    return result;
  }
  else if (isObject(value)) {
    const result = [];
    for (const key in value) {
      result.push(treeDiff({
        value: value[key],
        field: key,
      }));
    }
    if (field === undefined) {
      return result;
    }
    return {
      field,
      value: result,
    };
  }
  const result: ITreeDiff = {
    field,
    value,
    status: status ?? ChangeStatus.Unchanged,
    [Converted]: true,
  };
  if (previous !== undefined) {
    result.previous = previous;
  }
  return result;
}

@Injectable()
export class DiffService {
  getDiff() {
    const records = [];
    for (let i = 0; i < faker.number.int({
      min: 1,
      max: 1,
    }); i++) {
      const response = generateData();
      const state = response.current;
      const changes = diff(response.previous, response.current);
      changes.forEach(({ op, path }) => {
        let status;
        let current;
        let previous;
        switch (op) {
          case "add":
            status = ChangeStatus.Created;
            current = get(response.current, path);
            break;
          case "replace":
            status = ChangeStatus.Updated;
            current = get(response.current, path);
            previous = get(response.previous, path);
            break;
          case "remove":
            status = ChangeStatus.Deleted;
            previous = get(response.previous, path);
            break;
        }
        set(state, path, treeDiff({
          value: current,
          previous,
          status,
          field: path[path.length - 1],
        }));
      });
      records.push(state);
      records.push(treeDiff({
        value: state,
      }));
    }
    return records;
  }
}
