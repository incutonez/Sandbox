import { computed, inject, InjectionKey, provide, ref } from "vue";

export type TPersonProvider = ReturnType<typeof providePerson>;

export const SymPersonProvider: InjectionKey<TPersonProvider> = Symbol("personProvider");

export interface IPerson {
	firstName: string;
	lastName: string;
	address: {
		lineOne: string;
		lineTwo?: string;
		city: string;
		state: string;
		zipCode: string;
	};
	name: string;
	isValid: () => boolean;
}

export function providePerson() {
	const record = ref({} as IPerson);
	const isValid = computed(() => record.value.isValid && record.value.isValid());

	const provider = {
		record,
		isValid,
	};

	provide(SymPersonProvider, provider);

	return provider;
}

export function injectPersonProvider() {
	return inject(SymPersonProvider) as TPersonProvider;
}
