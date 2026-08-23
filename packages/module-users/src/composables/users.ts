import { ref, watch } from "vue";
import { faker, Sex } from "@faker-js/faker";
import { useQuery } from "@tanstack/vue-query";
import { QueryUsersGet } from "@/constants/keys.ts";

export interface AddressModel {
	id: string;
	lineOne: string;
	lineTwo?: string;
	city: string;
	state: string;
	zip: string;
}

export interface UserModel {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	address?: AddressModel;
}

export async function sleep(ms = 1000) {
	return new Promise((resolve) => setTimeout(() => resolve(true), ms));
}

export function useUsersGet() {
	const userRecords = ref<UserModel[]>([]);
	const { isFetching, data } = useQuery({
		queryKey: [QueryUsersGet],
		async queryFn() {
			await sleep();
			const response: UserModel[] = [];
			for (let i = 0; i < faker.number.int({
				min: 5,
				max: 100,
			}); i++) {
				const sex = faker.datatype.boolean() ? Sex.Male : Sex.Female;
				const firstName = faker.person.firstName(sex);
				response.push({
					firstName,
					id: crypto.randomUUID(),
					lastName: faker.person.lastName(sex),
					email: faker.internet.email({
						firstName,
					}),
					phone: faker.datatype.boolean() ? faker.phone.number() : undefined,
					address: faker.datatype.boolean()
						? {
							id: crypto.randomUUID(),
							lineOne: faker.location.streetAddress(),
							lineTwo: faker.datatype.boolean() ? faker.location.secondaryAddress() : undefined,
							city: faker.location.city(),
							state: faker.location.state(),
							zip: faker.location.zipCode(),
						}
						: undefined,
				});
			}

			return response;
		},
	});

	watch(data, ($data = []) => userRecords.value = $data, {
		immediate: true,
	});

	return {
		userRecords,
		loadingUsers: isFetching,
	};
}
