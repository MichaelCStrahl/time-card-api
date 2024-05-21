import { Injectable } from "@nestjs/common";
import { TimecardsRepository } from "../repositories/timecard-repository";

interface FinishTimecardByUserUseCaseRequest {
	userId: string;
}

@Injectable()
export class FinishTimecardByUserUseCase {
	constructor(private timecardsRepository: TimecardsRepository) {}

	async execute({ userId }: FinishTimecardByUserUseCaseRequest) {
		const currentTimeCard =
			await this.timecardsRepository.findRecentTimecardByUserId(userId);

		const hasTimecard = !!currentTimeCard;

		if (!hasTimecard) {
			throw new Error("Time card not found.");
		}

		await this.timecardsRepository.updateTimecard(currentTimeCard.id);
	}
}
