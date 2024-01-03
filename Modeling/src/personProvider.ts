import { inject, InjectionKey, provide, ref, watch } from "vue";
import { IPerson } from "@/generated";

export type TPersonProvider = ReturnType<typeof usePersonProvider>;
export const SymPersonProvider: InjectionKey<TPersonProvider> = Symbol("personProvider");

interface ExtendedPerson extends IPerson {
	name: string;
	isValid(): Promise<boolean>;
}

export function usePersonProvider() {
	const isValid = ref(false);
	const record = ref({} as ExtendedPerson);

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
