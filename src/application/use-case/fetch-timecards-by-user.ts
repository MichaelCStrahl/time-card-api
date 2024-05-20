import { Injectable } from "@nestjs/common";
import { TimeCard } from "@prisma/client";
import { TimecardsRepository } from "../repositories/timecard-repository";

interface FetchTimecardsUseCaseRequest {
	userId: string;
}

interface FetchTimecardsUseCaseResponse {
	timeCards: TimeCard[] | null;
}

@Injectable()
export class FetchTimecardsUseCase {
	constructor(private timeCardsRepository: TimecardsRepository) {}

	async execute({
		userId,
	}: FetchTimecardsUseCaseRequest): Promise<FetchTimecardsUseCaseResponse> {
		const timeCards = await this.timeCardsRepository.findManyByUserId(userId);

		return { timeCards };
	}
}
