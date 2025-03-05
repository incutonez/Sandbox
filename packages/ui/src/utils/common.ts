import { faker } from "@faker-js/faker";

export const Avatars = [
	faker.image.avatar(),
	faker.image.avatar(),
	faker.image.avatar(),
	faker.image.avatar(),
	faker.image.avatar(),
	faker.image.avatar(),
];

export function getAvatar() {
	const index = faker.number.int({
		min: 0,
		max: Avatars.length - 1,
	});
	return Avatars[index];
}
