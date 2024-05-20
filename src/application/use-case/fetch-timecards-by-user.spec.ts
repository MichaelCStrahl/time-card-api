import { randomUUID } from "node:crypto";
import { InMemoryTimecardsRepository } from "test/repositories/in-memory-timecards-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { generateRef } from "util/generate-ref";
import { FetchTimecardsUseCase } from "./fetch-timecards-by-user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryTimecardsRepository: InMemoryTimecardsRepository;
let sut: FetchTimecardsUseCase;

describe("Fetch TimeCards By User Id", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		inMemoryTimecardsRepository = new InMemoryTimecardsRepository();
		sut = new FetchTimecardsUseCase(inMemoryTimecardsRepository);
	});

	it("should be able to get time cards by user id", async () => {
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
			endDate: new Date(),
		};

		inMemoryTimecardsRepository.items.push(fakerTimeCard);

		const result = await sut.execute({
			userId,
		});

		expect(result.timeCards).toHaveLength(1);
		expect(result.timeCards).toEqual([fakerTimeCard]);
	});
});
