import { Injectable } from "@nestjs/common";
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
	constructor(private timecardsRepository: TimecardsRepository) {}

	async execute({
		userId,
	}: FetchTimecardsUseCaseRequest): Promise<FetchTimecardsUseCaseResponse> {
		const timeCards = await this.timecardsRepository.findManyByUserId(userId);

		return { timeCards };
	}
}
