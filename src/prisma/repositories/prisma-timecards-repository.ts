import { TimecardsRepository } from "@/application/repositories/timecard-repository";
import { Injectable } from "@nestjs/common";
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

		return timeCards;
	}
}
