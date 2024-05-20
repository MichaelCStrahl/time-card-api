import { Injectable } from "@nestjs/common";
import { TimeCard } from "@prisma/client";
import { TimecardsRepository } from "../repositories/timecard-repository";

export interface HoursWorked {
	id: string;
	hoursWorked: string;
	startDayWorked: Date;
	userId: string;
}

interface FetchTimecardsUseCaseRequest {
	userId: string;
}

interface FetchTimecardsUseCaseResponse {
	timeCards: HoursWorked[] | null;
}

@Injectable()
export class FetchTimecardsUseCase {
	constructor(private timeCardsRepository: TimecardsRepository) {}

	async execute({
		userId,
	}: FetchTimecardsUseCaseRequest): Promise<FetchTimecardsUseCaseResponse> {
		const timeCards = await this.timeCardsRepository.findManyByUserId(userId);

		console.log(timeCards);

		return { timeCards };
	}
}
