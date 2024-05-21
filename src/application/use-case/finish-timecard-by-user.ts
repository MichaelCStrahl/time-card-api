import { Injectable } from "@nestjs/common";
import { TimecardsRepository } from "../repositories/timecard-repository";
import { UsersRepository } from "../repositories/users-repository";

interface FinishTimeCardByUserUseCaseRequest {
	userId: string;
}

@Injectable()
export class FinishTimeCardByUserUseCase {
	constructor(private timecardsRepository: TimecardsRepository) {}

	async execute({ userId }: FinishTimeCardByUserUseCaseRequest) {
		const currentTimeCard =
			await this.timecardsRepository.findRecentTimecardByUserId(userId);

		const hasTimecard = !!currentTimeCard;

		if (!hasTimecard) {
			throw new Error("Time card not found.");
		}

		await this.timecardsRepository.updateTimecard(currentTimeCard.id);
	}
}
