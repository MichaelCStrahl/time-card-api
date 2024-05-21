import { randomUUID } from "node:crypto";
import { InMemoryTimecardsRepository } from "test/repositories/in-memory-timecards-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { calculateTimeDifference } from "util/difference-between-dates";
import { generateRef } from "util/generate-ref";
import { isSortedDates } from "util/is-sorted-dates";
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

		const startDate = new Date(2024, 4, 20, 8, 0, 0);
		const endDate = new Date(2024, 4, 20, 18, 0, 0);

		const fakerTimeCard = {
			id: randomUUID().toString(),
			userId,
			startDate,
			endDate,
		};

		inMemoryTimecardsRepository.items.push(fakerTimeCard);

		const result = await sut.execute({
			userId,
		});

		const timeWorked = calculateTimeDifference({
			endDate,
			startDate,
		});

		const hoursWorked = `${timeWorked.hours}h ${timeWorked.minutes}m`;

		const fakerHoursWorked = {
			id: fakerTimeCard.id,
			hoursWorked,
			startDayWorked: fakerTimeCard.startDate,
			userId: fakerTimeCard.userId,
		};

		expect(result.timeCards).toHaveLength(1);
		expect(result.timeCards).toEqual([fakerHoursWorked]);
	});

	it("should be able to get time cards by user id ordered by date", async () => {
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
			userId,
		});

		const datesHasSorted = isSortedDates(result.timeCards);

		expect(result.timeCards).toHaveLength(2);
		expect(datesHasSorted).toBeTruthy();
	});

	it("should not be able to get a current time card", async () => {
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
			userId,
		});

		const timeCardItems = inMemoryTimecardsRepository.items;

		expect(result.timeCards).toHaveLength(2);
		expect(timeCardItems).toHaveLength(3);
	});
});
