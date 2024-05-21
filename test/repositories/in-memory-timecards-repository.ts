import { randomUUID } from "node:crypto";
import { TimecardsRepository } from "@/application/repositories/timecard-repository";
import { TimeCard } from "@prisma/client";
import dayjs from "dayjs";
import { calculateTimeDifference } from "util/difference-between-dates";

export class InMemoryTimecardsRepository extends TimecardsRepository {
	public items: TimeCard[] = [];

	async findManyByUserId(userId: string) {
		const today = dayjs().startOf("day").toDate();
		const timeCardsByUserId = this.items.filter(
			(item) => item.userId === userId,
		);

		const userTimesWorkedLessThanToday = timeCardsByUserId.filter((item) => {
			return item.startDate < today;
		});

		if (!userTimesWorkedLessThanToday.length) {
			return null;
		}

		const hoursWorked = userTimesWorkedLessThanToday.map((timeCard) => {
			const timeWorked = calculateTimeDifference({
				endDate: timeCard.endDate as Date,
				startDate: timeCard.startDate,
			});

			const hoursWorked = `${timeWorked.hours}h ${timeWorked.minutes}m`;

			return {
				id: timeCard.id,
				hoursWorked,
				startDayWorked: timeCard.startDate,
				userId: timeCard.userId,
			};
		});

		hoursWorked.sort(
			(a, b) =>
				new Date(b.startDayWorked).getTime() -
				new Date(a.startDayWorked).getTime(),
		);

		return hoursWorked;
	}

	async findRecentTimecardByUserId(userId: string) {
		const today = dayjs().startOf("day");

		const recentTimeCard = this.items.find((item) => {
			const startDate = dayjs(item.startDate);
			return item.userId === userId && startDate.isSame(today, "day");
		});

		if (!recentTimeCard) {
			return null;
		}

		return recentTimeCard;
	}

	async updateTimecard(id: string) {
		const timeCardIndex = this.items.findIndex((item) => item.id === id);

		const timeCard = this.items[timeCardIndex];

		const updatedTimeCard = {
			...timeCard,
			endDate: new Date(),
		};

		this.items[timeCardIndex] = updatedTimeCard;
	}

	async create(userId: string) {
		this.items.push({
			id: randomUUID(),
			userId,
			startDate: new Date(),
			endDate: null,
		});
	}
}
