import { faker } from "@faker-js/faker";
import get from "just-safe-get";
import { isFunction as lodashIsFunction, isObject as lodashIsObject } from "lodash-es";
import MimeTypes from "mime-types";

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

export const Avatars = [
	faker.image.avatar(),
	faker.image.avatar(),
	faker.image.avatar(),
	faker.image.avatar(),
	faker.image.avatar(),
	faker.image.avatar(),
];

export function isString(value: unknown): value is string {
	return typeof value === "string";
}

export function toInt(value: string, radix = 10) {
	return parseInt(value, radix);
}

export function makeArray(value: unknown) {
	return Array.isArray(value) ? value : [value];
}

export function isEmpty(value: unknown) {
	return value === undefined ||
		value === null ||
		value === "" ||
		Array.isArray(value) && value.length === 0 ||
		isObject(value) && !Object.keys(value).length;
}

export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
	return lodashIsFunction(value);
}

export function isObject(value?: unknown): value is object {
	return lodashIsObject(value);
}

export function pluck<T = unknown>(items: object[], keys: string | string[]) {
	const collection: T[] = [];
	if (Array.isArray(keys)) {
		items.forEach((item) => {
			const collect = {} as T;
			keys.forEach((key) => collect[key as keyof T] = Reflect.get(item, key));
			collection.push(collect);
		});
	}
	else {
		items.forEach((item) => collection.push(Reflect.get(item, keys)));
	}
	return collection;
}

export function getObjectValue(data: object, key: string) {
	return get(data, key);
}

export function removeItem(items: unknown[], item: unknown) {
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

export function getAvatar() {
	const index = faker.number.int({
		min: 0,
		max: Avatars.length - 1,
	});
	return Avatars[index];
}

export function downloadFile(blob: Blob, name = "download") {
	const extension = MimeTypes.extension(blob.type);
	if (!extension) {
		return;
	}
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.style.display = "none";
	a.href = url;
	// the filename you want
	a.download = `${name}.${extension}`;
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(url);
}
