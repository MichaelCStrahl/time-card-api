import { TimeCard } from "@prisma/client";
import { TimeCardsRepository } from "../repositories/timecard-repository";

interface FetchTimeCardsUseCaseRequest {
	userId: string;
}

interface FetchTimeCardsUseCaseResponse {
	timeCards: TimeCard[] | null;
}

export class FetchTimeCardsUseCase {
	constructor(private timeCardsRepository: TimeCardsRepository) {}

	async execute({
		userId,
	}: FetchTimeCardsUseCaseRequest): Promise<FetchTimeCardsUseCaseResponse> {
		const timeCards = await this.timeCardsRepository.findManyByUserId(userId);

		return { timeCards };
	}
}
