import { randomUUID } from "node:crypto";
import { InMemoryTimecardsRepository } from "test/repositories/in-memory-timecards-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { generateRef } from "util/generate-ref";
import { GetUserByRefUseCase } from "./get-user-by-ref";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryTimecardsRepository: InMemoryTimecardsRepository;
let sut: GetUserByRefUseCase;

describe("Get User By Ref", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		inMemoryTimecardsRepository = new InMemoryTimecardsRepository();

		sut = new GetUserByRefUseCase(
			inMemoryUsersRepository,
			inMemoryTimecardsRepository,
		);
	});

	it("should be able to get a user by ref", async () => {
		const userRef = generateRef(7);
		const userId = randomUUID().toString();

		const fakerUser = {
			id: userId,
			name: "John",
			ref: userRef,
		};

		inMemoryUsersRepository.items.push(fakerUser);

		const result = await sut.execute({
			ref: userRef,
		});

		expect(result.user).toEqual(fakerUser);
	});

	it("should be able to get a user by ref with current time work uncompleted", async () => {
		const userRef = generateRef(7);
		const userId = randomUUID().toString();

		const fakerUser = {
			id: userId,
			name: "John",
			ref: userRef,
		};

		inMemoryUsersRepository.items.push(fakerUser);

		const startDate = new Date();

		const fakerTimeCard = {
			id: randomUUID().toString(),
			userId,
			startDate,
			endDate: null,
		};

		inMemoryTimecardsRepository.items.push(fakerTimeCard);

		const result = await sut.execute({
			ref: userRef,
		});

		expect(result.user).toEqual(fakerUser);
		expect(result.currentTimeWork).toEqual(fakerTimeCard);
	});
});
