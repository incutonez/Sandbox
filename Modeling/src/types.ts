export type ModelField<T> = {
	// We need to map over the keys directly to preserve optionality. We filter with "as"
	[K in keyof T as T[K] extends Function ? never : K]: Exclude<T[K], undefined> extends Array<infer E> ? Array<ModelField<E>> : Exclude<T[K], undefined> extends Record<string, any> ? ModelField<T[K]> : T[K]; // Exclude undefined from the check to properly handle optional properties
};
