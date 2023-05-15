import { faker } from "@faker-js/faker";
import { get, isArray, set, isDate } from "lodash";
import { diff } from "just-diff";
import { ChangeStatus, DiffModel } from "shared-differ/dist/models";

const PropertyTypes = ["string", "number", "date", "boolean", "object", "array"] as const;
type TPropertyTypes = typeof PropertyTypes[number];
const PropertyTypesTotal = PropertyTypes.length - 1;

/**
 * @param depth
 * This is a max depth value for when recursively calling generateData... by default, it's 2, which will
 * at most give you an object that has 2 levels of nested data.
 */
export function generateData(depth = 2) {
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

const Converted = Symbol("converted");

interface ITreeDiff extends DiffModel {
  [Converted]?: boolean;
}

export function getChanges({ current, previous } = generateData()) {
  const changes = diff(previous, current);
  changes.forEach(({ op, path }) => {
    let status;
    let value;
    let old;
    switch (op) {
      case "add":
        status = ChangeStatus.Created;
        value = get(current, path);
        break;
      case "replace":
        status = ChangeStatus.Updated;
        value = get(current, path);
        old = get(previous, path);
        break;
      case "remove":
        status = ChangeStatus.Deleted;
        value = get(previous, path);
        break;
    }
    set(current, path, treeDiff({
      value,
      previous: old,
      status,
      field: path[path.length - 1],
    }));
  });
  return treeDiff({
    value: current,
  });
}

function isArrayCheck(value: any): value is Array<any> {
  return isArray(value);
}

export function treeDiff({ value, previous, status, field }: ITreeDiff) {
  if (value?.[Converted]) {
    return value;
  }
  else if (isArrayCheck(value)) {
    const items = [];
    value.forEach((record, index) => {
      items.push(treeDiff({
        status,
        value: record,
        field: index,
      }));
    });
    const result: ITreeDiff = {
      field,
      value: items,
      [Converted]: true,
    };
    if (value.length === 0) {
      result.status = ChangeStatus.Unchanged;
    }
    return result;
  }
  else if (value instanceof Object && !isDate(value)) {
    const result = [];
    for (const key in value) {
      result.push(treeDiff({
        status,
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
      [Converted]: true,
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
