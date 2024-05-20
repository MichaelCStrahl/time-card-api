import { TimeCardsRepository } from "@/application/repositories/timecard-repository";
import { Injectable } from "@nestjs/common";
import { TimeCard } from "@prisma/client";

export class InMemoryTimeCardsRepository extends TimeCardsRepository {
	public items: TimeCard[] = [];

	async findManyByUserId(userId: string) {
		const timeCards = this.items.filter((item) => item.userId === userId);

		if (!timeCards) {
			return null;
		}

		return timeCards;
	}
}