import { randomUUID } from "node:crypto";
import { InMemoryTimeCardsRepository } from "test/repositories/in-memory-timecards-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { generateRef } from "util/generate-ref";
import { FetchTimeCardsUseCase } from "./fetch-timecards-by-user";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryTimeCardsRepository: InMemoryTimeCardsRepository;
let sut: FetchTimeCardsUseCase;

describe("Fetch TimeCards By User Id", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		inMemoryTimeCardsRepository = new InMemoryTimeCardsRepository();
		sut = new FetchTimeCardsUseCase(inMemoryTimeCardsRepository);
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

		inMemoryTimeCardsRepository.items.push(fakerTimeCard);

		const result = await sut.execute({
			userId,
		});

		expect(result.timeCards).toHaveLength(1);
		expect(result.timeCards).toEqual([fakerTimeCard]);
	});
});
