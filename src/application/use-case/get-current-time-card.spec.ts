import { randomUUID } from "node:crypto";
import { InMemoryTimecardsRepository } from "test/repositories/in-memory-timecards-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { generateRef } from "util/generate-ref";
import { GetCurrentTimecardUseCase } from "./get-current-time-card";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryTimecardsRepository: InMemoryTimecardsRepository;
let sut: GetCurrentTimecardUseCase;

describe("Get Current Time Card By User", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		inMemoryTimecardsRepository = new InMemoryTimecardsRepository();
		sut = new GetCurrentTimecardUseCase(inMemoryTimecardsRepository);
	});

	it("should be able to get a current time card", async () => {
		const userRef = generateRef(7);
		const userId = randomUUID().toString();

		const fakerUser = {
			id: userId,
			name: "John",
			ref: userRef,
		};

		inMemoryUsersRepository.items.push(fakerUser);

		const fakerTimeCardCurrent = {
			id: randomUUID().toString(),
			userId,
			startDate: new Date(),
			endDate: null,
		};

		inMemoryTimecardsRepository.items.push(fakerTimeCardCurrent);

		const result = await sut.execute({
			userId: fakerUser.id,
		});

		expect(result.currentTimeCard).toEqual(
			expect.objectContaining({
				id: fakerTimeCardCurrent.id,
				userId: fakerTimeCardCurrent.userId,
				startDate: fakerTimeCardCurrent.startDate,
				endDate: null,
			}),
		);
	});

	it("should not be able to get another time cards", async () => {
		const userRef = generateRef(7);
		const userId = randomUUID().toString();

		const fakerUser = {
			id: userId,
			name: "John",
			ref: userRef,
		};

		inMemoryUsersRepository.items.push(fakerUser);

		const fakerTimeCard1 = {
			id: randomUUID().toString(),
			userId,
			startDate: new Date(2024, 3, 20, 8, 0, 0),
			endDate: new Date(2024, 3, 20, 18, 0, 0),
		};

		inMemoryTimecardsRepository.items.push(fakerTimeCard1);

		const fakerTimeCard2 = {
			id: randomUUID().toString(),
			userId,
			startDate: new Date(2024, 3, 21, 8, 0, 0),
			endDate: new Date(2024, 3, 21, 18, 0, 0),
		};

		inMemoryTimecardsRepository.items.push(fakerTimeCard2);

		const fakerTimeCardCurrent = {
			id: randomUUID().toString(),
			userId,
			startDate: new Date(),
			endDate: null,
		};

		inMemoryTimecardsRepository.items.push(fakerTimeCardCurrent);

		const result = await sut.execute({
			userId: fakerUser.id,
		});

		expect(result.currentTimeCard).toEqual(
			expect.objectContaining({
				id: fakerTimeCardCurrent.id,
				userId: fakerTimeCardCurrent.userId,
				startDate: fakerTimeCardCurrent.startDate,
				endDate: null,
			}),
		);
	});

	it("should not be able to get time card if not exists a current time card", async () => {
		const userRef = generateRef(7);
		const userId = randomUUID().toString();

		const fakerUser = {
			id: userId,
			name: "John",
			ref: userRef,
		};

		inMemoryUsersRepository.items.push(fakerUser);

		const fakerTimeCard1 = {
			id: randomUUID().toString(),
			userId,
			startDate: new Date(2024, 3, 20, 8, 0, 0),
			endDate: new Date(2024, 3, 20, 18, 0, 0),
		};

		inMemoryTimecardsRepository.items.push(fakerTimeCard1);

		const fakerTimeCard2 = {
			id: randomUUID().toString(),
			userId,
			startDate: new Date(2024, 3, 21, 8, 0, 0),
			endDate: new Date(2024, 3, 21, 18, 0, 0),
		};

		inMemoryTimecardsRepository.items.push(fakerTimeCard2);

		const result = await sut.execute({
			userId: fakerUser.id,
		});

		expect(result.currentTimeCard).toBe(null);
	});
});
