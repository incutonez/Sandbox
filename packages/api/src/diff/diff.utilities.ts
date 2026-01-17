import { faker } from "@faker-js/faker";
import { diff } from "just-diff";
import { get, isDate, set } from "lodash";
import { EnumChangeStatus, TreeChangeModel, TreeItemModel, TTreeItem, TTreeItemValue } from "src/models/diff.entity";

const PropertyTypes = ["string", "number", "date", "boolean", "object", "array"] as const;
type TPropertyTypes = (typeof PropertyTypes)[number];
const PropertyTypesTotal = PropertyTypes.length - 1;

/**
 * @param depth
 * This is a max depth value for when recursively calling generateData... by default, it's 2, which will
 * at most give you an object that has 2 levels of nested data.
 */
export function generateData(depth = 2) {
	const previous: Record<string, TTreeItemValue> = {};
	const current: Record<string, TTreeItemValue> = {};
	const totalProperties = faker.number.int({
		min: 4,
		max: 10,
	});
	for (let i = 0; i < totalProperties; i++) {
		let value;
		const fieldName = faker.word.noun();
		const shouldChange = faker.datatype.boolean();
		let propType: TPropertyTypes =
			PropertyTypes[
				faker.number.int({
					min: 0,
					max: PropertyTypesTotal,
				})
			];
		while (depth === 0 && (propType === "object" || propType === "array")) {
			propType =
				PropertyTypes[
					faker.number.int({
						min: 0,
						max: PropertyTypesTotal,
					})
				];
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
				// Randomize the update to current, which will most likely create deletions and additions
				if (faker.datatype.boolean()) {
					value = generateData(depth - 1);
					current[fieldName] = value.current;
				}
				break;
			case "array":
				const previousValue = previous[fieldName] = [];
				const currentValue = current[fieldName] = [];
				let maxValue = faker.number.int({
					min: 0,
					max: 5,
				});
				for (let j = 0; j <	maxValue; j++) {
					value = generateData(depth - 1);
					previousValue.push(value.previous);
					currentValue.push(value.current);
				}
				if (currentValue.length) {
					maxValue = faker.number.int({
						min: currentValue.length - 1,
						max: 10,
					});
					// Should increase current
					if (faker.datatype.boolean()) {
						for (let j = currentValue.length - 1;	j <	maxValue;	j++) {
							value = generateData(depth - 1);
							currentValue.push(value.current);
						}
					}
					// Should decrease current

					else if (faker.datatype.boolean()) {
						currentValue.splice(
							0,
							faker.number.int({
								max: currentValue.length - 1,
							}),
						);
					}
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

interface ITreeDiff extends TTreeItem {
	[Converted]?: boolean;
}

export function getChanges({ current, previous } = generateData()) {
	const changes = diff(previous, current);
	let creates = 0;
	let updates = 0;
	let deletes = 0;
	changes.forEach(({ op, path }) => {
		let status: EnumChangeStatus;
		let value: TTreeItemValue;
		let old: TreeItemModel;
		switch (op) {
			case "add":
				status = EnumChangeStatus.Created;
				value = get(current, path);
				creates++;
				break;
			case "replace":
				status = EnumChangeStatus.Updated;
				value = get(current, path);
				old = get(previous, path);
				updates++;
				break;
			case "remove":
				status = EnumChangeStatus.Deleted;
				value = get(previous, path);
				deletes++;
				break;
		}
		set(
			current,
			path,
			treeDiff({
				value,
				previous: old,
				status,
				field: path[path.length - 1],
			}),
		);
	});
	const record = new TreeChangeModel();
	record.username = faker.internet.username();
	record.date = faker.date.anytime().getTime();
	record.items = treeDiff({
		value: current,
		field: undefined,
	}) as TTreeItem[];
	record.creates = creates;
	record.updates = updates;
	record.deletes = deletes;
	return record;
}

export function treeDiff({ value, previous, status, field }: ITreeDiff): TTreeItem[] | ITreeDiff {
	if (value?.[Converted]) {
		return value as ITreeDiff;
	}
	else if (Array.isArray(value)) {
		const items: TTreeItem[] = [];
		value.forEach((record, index) => {
			items.push(
				treeDiff({
					status,
					value: record,
					field: index,
				}) as ITreeDiff,
			);
		});
		const result: ITreeDiff = {
			field,
			value: items,
			[Converted]: true,
		};
		if (value.length === 0) {
			result.status = EnumChangeStatus.Unchanged;
		}
		return result;
	}
	else if (value instanceof Object && !isDate(value)) {
		const result: TTreeItem[] = [];
		for (const key in value) {
			result.push(
				treeDiff({
					status,
					value: value[key],
					field: key,
				}) as ITreeDiff,
			);
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
		status: status ?? EnumChangeStatus.Unchanged,
		[Converted]: true,
	};
	if (previous !== undefined) {
		result.previous = previous;
	}
	return result;
}
