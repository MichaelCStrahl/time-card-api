import { randomUUID } from "node:crypto";
import { InMemoryTimecardsRepository } from "test/repositories/in-memory-timecards-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { generateRef } from "util/generate-ref";
import { CreateTimecardByUserUseCase } from "./create-timecard-by-user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryTimecardsRepository: InMemoryTimecardsRepository;
let sut: CreateTimecardByUserUseCase;

describe("Create Time Card By User", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		inMemoryTimecardsRepository = new InMemoryTimecardsRepository();
		sut = new CreateTimecardByUserUseCase(inMemoryTimecardsRepository);
	});

	it("should be able create a new time card with user id", async () => {
		const userRef = generateRef(7);
		const userId = randomUUID().toString();

		const fakerUser = {
			id: userId,
			name: "John",
			ref: userRef,
		};

		inMemoryUsersRepository.items.push(fakerUser);

		await sut.execute({
			userId,
		});

		const createdTimeCard = inMemoryTimecardsRepository.items[0];
		const today = new Date();

		expect(inMemoryTimecardsRepository.items[0]).toEqual({
			id: expect.any(String),
			userId,
			startDate: expect.any(Date),
			endDate: null,
		});
		expect(createdTimeCard.startDate.getDay()).toBe(today.getDay());
	});

	it("should not be able create a new time card if exist a current time card", async () => {
		const userRef = generateRef(7);
		const userId = randomUUID().toString();

		const fakerUser = {
			id: userId,
			name: "John",
			ref: userRef,
		};

		inMemoryUsersRepository.items.push(fakerUser);

		await sut.execute({
			userId,
		});

		await expect(() =>
			sut.execute({
				userId,
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
