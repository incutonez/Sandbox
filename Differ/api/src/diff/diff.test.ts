import { faker } from "@faker-js/faker";
import { getChanges } from "./diff.utilities";
import { ChangeStatus } from "@incutonez/differ-shared/dist/models";

describe("Differ", () => {
	const FieldStr = "fieldString";
	const FieldInt = "fieldInteger";
	const FieldBool = "fieldBoolean";
	const FieldDate = "fieldDate";
	const FieldObj = "fieldObject";
	const FieldArr = "fieldArray";
	const FieldDelete = "fieldDelete";
	it("Shallow Diffs", () => {
		const data = {
			current: {
				[FieldStr]: faker.word.noun(),
				[FieldInt]: faker.number.int(),
				[FieldBool]: true,
			},
			previous: {
				[FieldStr]: faker.word.noun(),
				[FieldInt]: faker.number.int(),
				[FieldBool]: true,
			},
		};
		const expected = [
			{
				field: FieldStr,
				value: data.current[FieldStr],
				previous: data.previous[FieldStr],
				status: ChangeStatus.Updated,
			},
			{
				field: FieldInt,
				value: data.current[FieldInt],
				previous: data.previous[FieldInt],
				status: ChangeStatus.Updated,
			},
			{
				field: FieldBool,
				value: data.current[FieldBool],
				status: ChangeStatus.Unchanged,
			},
		];
		const changes = structuredClone(getChanges(data));
		expect(changes).toEqual(expected);
	});
	it("Complex Diffs", () => {
		const data = {
			current: {
				[FieldStr]: faker.word.noun(),
				[FieldInt]: faker.number.int(),
				[FieldBool]: true,
				[FieldArr]: [
					{
						[FieldStr]: faker.word.noun(),
						[FieldObj]: {
							[FieldStr]: faker.word.noun(),
							[FieldInt]: 1,
							[FieldArr]: [
								{
									[FieldStr]: "John",
									[FieldInt]: faker.number.int(),
									[FieldBool]: false,
									[FieldDate]: faker.date.anytime(),
								},
								{
									[FieldStr]: "John",
									[FieldInt]: faker.number.int(),
									[FieldBool]: true,
								},
							],
						},
					},
					{
						[FieldStr]: faker.word.noun(),
						[FieldObj]: {
							[FieldStr]: faker.word.noun(),
							[FieldInt]: faker.number.int(),
							[FieldArr]: [
								{
									[FieldStr]: faker.word.noun(),
									[FieldInt]: faker.number.int(),
								},
							],
						},
					},
				],
			},
			previous: {
				[FieldStr]: faker.word.noun(),
				[FieldInt]: faker.number.int(),
				[FieldBool]: true,
				[FieldArr]: [
					{
						[FieldStr]: faker.word.noun(),
						[FieldArr]: [faker.number.int()],
						[FieldObj]: {
							[FieldStr]: faker.word.noun(),
							[FieldInt]: 1,
							[FieldArr]: [
								{
									[FieldStr]: "John",
									[FieldInt]: faker.number.int(),
									[FieldBool]: true,
									[FieldDelete]: true,
								},
							],
						},
					},
				],
			},
		};
		const expected = [
			{
				field: FieldStr,
				value: data.current[FieldStr],
				previous: data.previous[FieldStr],
				status: ChangeStatus.Updated,
			},
			{
				field: FieldInt,
				value: data.current[FieldInt],
				previous: data.previous[FieldInt],
				status: ChangeStatus.Updated,
			},
			{
				field: FieldBool,
				value: data.current[FieldBool],
				status: ChangeStatus.Unchanged,
			},
			{
				field: FieldArr,
				value: [
					{
						field: 0,
						value: [
							{
								field: FieldStr,
								value: data.current[FieldArr][0][FieldStr],
								previous: data.previous[FieldArr][0][FieldStr],
								status: ChangeStatus.Updated,
							},
							{
								field: FieldObj,
								value: [
									{
										field: FieldStr,
										value: data.current[FieldArr][0][FieldObj][FieldStr],
										previous: data.previous[FieldArr][0][FieldObj][FieldStr],
										status: ChangeStatus.Updated,
									},
									{
										field: FieldInt,
										value: data.current[FieldArr][0][FieldObj][FieldInt],
										status: ChangeStatus.Unchanged,
									},
									{
										field: FieldArr,
										value: [
											{
												field: 0,
												value: [
													{
														field: FieldStr,
														value: data.current[FieldArr][0][FieldObj][FieldArr][0][FieldStr],
														status: ChangeStatus.Unchanged,
													},
													{
														field: FieldInt,
														value: data.current[FieldArr][0][FieldObj][FieldArr][0][FieldInt],
														previous: data.previous[FieldArr][0][FieldObj][FieldArr][0][FieldInt],
														status: ChangeStatus.Updated,
													},
													{
														field: FieldBool,
														value: data.current[FieldArr][0][FieldObj][FieldArr][0][FieldBool],
														previous: data.previous[FieldArr][0][FieldObj][FieldArr][0][FieldBool],
														status: ChangeStatus.Updated,
													},
													{
														field: FieldDate,
														value: data.current[FieldArr][0][FieldObj][FieldArr][0][FieldDate],
														status: ChangeStatus.Created,
													},
													{
														field: FieldDelete,
														value: data.previous[FieldArr][0][FieldObj][FieldArr][0][FieldDelete],
														status: ChangeStatus.Deleted,
													},
												],
											},
											{
												field: 1,
												value: [
													{
														field: FieldStr,
														value: data.current[FieldArr][0][FieldObj][FieldArr][1][FieldStr],
														status: ChangeStatus.Created,
													},
													{
														field: FieldInt,
														value: data.current[FieldArr][0][FieldObj][FieldArr][1][FieldInt],
														status: ChangeStatus.Created,
													},
													{
														field: FieldBool,
														value: data.current[FieldArr][0][FieldObj][FieldArr][1][FieldBool],
														status: ChangeStatus.Created,
													},
												],
											},
										],
									},
								],
							},
							{
								field: FieldArr,
								value: [
									{
										field: 0,
										value: data.previous[FieldArr][0][FieldArr][0],
										status: ChangeStatus.Deleted,
									},
								],
							},
						],
					},
					{
						field: 1,
						value: [
							{
								field: FieldStr,
								value: data.current[FieldArr][1][FieldStr],
								status: ChangeStatus.Created,
							},
							{
								field: FieldObj,
								value: [
									{
										field: FieldStr,
										value: data.current[FieldArr][1][FieldObj][FieldStr],
										status: ChangeStatus.Created,
									},
									{
										field: FieldInt,
										value: data.current[FieldArr][1][FieldObj][FieldInt],
										status: ChangeStatus.Created,
									},
									{
										field: FieldArr,
										value: [
											{
												field: 0,
												value: [
													{
														field: FieldStr,
														value: data.current[FieldArr][1][FieldObj][FieldArr][0][FieldStr],
														status: ChangeStatus.Created,
													},
													{
														field: FieldInt,
														value: data.current[FieldArr][1][FieldObj][FieldArr][0][FieldInt],
														status: ChangeStatus.Created,
													},
												],
											},
										],
									},
								],
							},
						],
					},
				],
			},
		];
		const changes = structuredClone(getChanges(data));
		expect(changes).toEqual(expected);
	});
});
