import { TimecardsRepository } from "@/application/repositories/timecard-repository";
import { Injectable } from "@nestjs/common";
import dayjs from "dayjs";
import { calculateTimeDifference } from "util/difference-between-dates";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaTimecardsRepository extends TimecardsRepository {
	constructor(private prisma: PrismaService) {
		super();
	}

	async findManyByUserId(userId: string) {
		const timeCards = await this.prisma.timeCard.findMany({
			where: {
				userId: userId,
				startDate: {
					lt: new Date(),
				},
				endDate: {
					not: null,
					lt: new Date(),
				},
			},
			orderBy: {
				startDate: "desc",
			},
		});

		if (!timeCards) {
			return null;
		}

		const hoursWorked = timeCards.map((timeCard) => {
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

		return hoursWorked;
	}

	async findRecentTimecardByUserId(userId: string) {
		const today = dayjs();
		const startOfDay = today.startOf("day").toDate();
		const endOfDay = today.endOf("day").toDate();

		const timeCard = await this.prisma.timeCard.findFirst({
			where: {
				userId,
				startDate: {
					gte: startOfDay,
				},
				OR: [
					{
						endDate: null,
					},
					{
						endDate: {
							lte: endOfDay,
						},
					},
				],
			},
		});

		return timeCard;
	}

	async create(userId: string) {
		await this.prisma.timeCard.create({
			data: {
				userId,
				startDate: new Date(),
			},
		});
	}
}
