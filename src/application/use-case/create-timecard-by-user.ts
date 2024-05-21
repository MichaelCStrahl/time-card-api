import { Injectable } from "@nestjs/common";
import { TimecardsRepository } from "../repositories/timecard-repository";

interface CreateTimecardByUserUseCaseRequest {
	userId: string;
}

@Injectable()
export class CreateTimecardByUserUseCase {
	constructor(private timecardsRepository: TimecardsRepository) {}

	async execute({ userId }: CreateTimecardByUserUseCaseRequest) {
		const hasTimecard =
			await this.timecardsRepository.findRecentTimecardByUserId(userId);

		if (hasTimecard) {
			throw new Error("Time card already has already been registered.");
		}

		await this.timecardsRepository.create(userId);
	}
}
