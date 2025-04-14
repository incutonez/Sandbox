export * as clone from "just-clone";

export { v4 as uuid } from "uuid";

export function emptyFn() {

}

export function sum(value: number[]) {
	return value.reduce((total, current) => total + current, 0);
}
