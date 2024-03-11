import get from "just-safe-get";

export function isString(value: any): value is string {
	return typeof value === "string";
}

export function toInt(value: string, radix = 10) {
	return parseInt(value, radix);
}

export function makeArray(value: any) {
	return Array.isArray(value) ? value : [value];
}

export function isEmpty(value: any) {
	return value === undefined || value === null || value === "" || Array.isArray(value) && value.length === 0;
}

export function pluck<T = any>(items: any[], keys: string | string[]) {
	const collection: T[] = [];
	if (Array.isArray(keys)) {
		items.forEach((item) => {
			const collect = {} as T;
			keys.forEach((key) => collect[key as keyof T] = item[key]);
			collection.push(collect);
		});
	}
	else {
		items.forEach((item) => collection.push(item[keys]));
	}
	return collection;
}

export function getObjectValue(data: any, key: string) {
	return get(data, key);
}

export function removeItem(items: unknown[], item: any) {
	items.splice(items.indexOf(item), 1);
}
