import { inject, InjectionKey, provide, ref, watch } from "vue";

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
	isValid: () => Promise<boolean>;
}

export function providePerson() {
	const isValid = ref(false);
	const record = ref({} as IPerson);

	const provider = {
		record,
		isValid,
	};

	provide(SymPersonProvider, provider);

	watch(record, async () => {
		isValid.value = "isValid" in record.value && (await record.value.isValid());
	}, {
		immediate: true,
		deep: true,
	});

	return provider;
}

export function injectPersonProvider() {
	return inject(SymPersonProvider) as TPersonProvider;
}
