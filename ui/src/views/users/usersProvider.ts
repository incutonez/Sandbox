import { inject, InjectionKey, provide, ref } from "vue";
import { UserModel } from "@/models/UserModel";

type TUsersImportProvider = ReturnType<typeof provideUsersImport>;
const UsersImportKey: InjectionKey<TUsersImportProvider> = Symbol("usersImport");

export function provideUsersImport() {
	const users = ref<UserModel[]>([]);
	const provider = {
		users,
	};

	provide(UsersImportKey, provider);

	return provider;
}

export function injectUsersImport() {
	return inject(UsersImportKey) as TUsersImportProvider;
}
