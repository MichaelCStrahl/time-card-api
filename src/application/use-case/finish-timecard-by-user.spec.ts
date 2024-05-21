import { randomUUID } from "node:crypto";
import { InMemoryTimecardsRepository } from "test/repositories/in-memory-timecards-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { generateRef } from "util/generate-ref";
import { FinishTimecardByUserUseCase } from "./finish-timecard-by-user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryTimecardsRepository: InMemoryTimecardsRepository;
let sut: FinishTimecardByUserUseCase;

describe("Finish Time Card By User", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		inMemoryTimecardsRepository = new InMemoryTimecardsRepository();

		sut = new FinishTimecardByUserUseCase(inMemoryTimecardsRepository);
	});

	it("should be able to finish time card by user", async () => {
		const userRef = generateRef(7);
		const userId = randomUUID().toString();

		const fakerUser = {
			id: userId,
			name: "John",
			ref: userRef,
		};

		inMemoryUsersRepository.items.push(fakerUser);

		const fakerTimeCard = {
			id: randomUUID().toString(),
			userId,
			startDate: new Date(),
			endDate: null,
		};

		inMemoryTimecardsRepository.items.push(fakerTimeCard);

		await sut.execute({
			userId,
		});

		const createdTimeCard = inMemoryTimecardsRepository.items[0];
		const hasEndDate = !!createdTimeCard.endDate;

		expect(inMemoryTimecardsRepository.items[0]).toEqual({
			id: expect.any(String),
			userId,
			startDate: expect.any(Date),
			endDate: expect.any(Date),
		});
		expect(hasEndDate).toBe(true);
		if (hasEndDate) {
			expect(createdTimeCard.startDate.getDay()).toBe(
				createdTimeCard.endDate?.getDay(),
			);
		}
	});

	it("should not be able to finish time card by user if time work not started", async () => {
		const userRef = generateRef(7);
		const userId = randomUUID().toString();

		const fakerUser = {
			id: userId,
			name: "John",
			ref: userRef,
		};

		inMemoryUsersRepository.items.push(fakerUser);

		await expect(() =>
			sut.execute({
				userId,
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
