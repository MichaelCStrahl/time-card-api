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

		const userTimesLTToday = timeCardsByUserId.filter((item) => {
			const hasStartDateLTToday = item.startDate < today;
			const hasEndDateAndLTToday = item.endDate && item.endDate < today;

			return hasStartDateLTToday && hasEndDateAndLTToday;
		});

		if (!userTimesLTToday) {
			return null;
		}

		const hoursWorked = userTimesLTToday.map((timeCard) => {
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
		const today = dayjs().startOf("day").toDate();

		const timeCard = this.items.find((item) => {
			const startDate = new Date(item.startDate);
			const hasSomeDay = startDate.getDay() === today.getDay();

			return item.userId === userId && hasSomeDay;
		});

		if (!timeCard) {
			return null;
		}

		return timeCard;
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
