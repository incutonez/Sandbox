import get from "just-safe-get";
import { isFunction as lodashIsFunction, isObject as lodashIsObject } from "lodash-es";

export { default as clone } from "just-clone";

// TODO: Get i18n string from somewhere
const DateLong = Intl.DateTimeFormat("en-us", {
	month: "2-digit",
	year: "numeric",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
});

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
	return value === undefined ||
		value === null ||
		value === "" ||
		Array.isArray(value) && value.length === 0 ||
		isObject(value) && !Object.keys(value).length;
}

export function isFunction(value: any): value is (...args: any[]) => any {
	return lodashIsFunction(value);
}

export function isObject(value?: any): value is object {
	return lodashIsObject(value);
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

export function dateLongFormat(value: string | number | Date) {
	if (!value) {
		return "";
	}
	if (!(value instanceof Date)) {
		value = new Date(value);
	}
	return DateLong.format(value);
}
