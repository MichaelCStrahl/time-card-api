import { TimecardsRepository } from "@/application/repositories/timecard-repository";
import { Injectable } from "@nestjs/common";
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
			},
		});

		if (!timeCards) {
			return null;
		}

		const hoursWorked = timeCards.map((timeCard) => {
			const hoursAndMinutesWorked = calculateTimeDifference({
				endDate: timeCard.endDate,
				startDate: timeCard.startDate,
			});

			const hoursWorked = `${hoursAndMinutesWorked.hours}h ${hoursAndMinutesWorked.minutes}m`;

			return {
				id: timeCard.id,
				hoursWorked,
				startDayWorked: timeCard.startDate,
				userId: timeCard.userId,
			};
		});

		return hoursWorked;
	}
}
