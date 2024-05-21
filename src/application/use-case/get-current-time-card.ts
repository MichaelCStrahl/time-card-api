import { Injectable } from "@nestjs/common";
import { TimecardsRepository } from "../repositories/timecard-repository";

interface GetCurrentTimecardUseCaseRequest {
	userId: string;
}

@Injectable()
export class GetCurrentTimecardUseCase {
	constructor(private timecardsRepository: TimecardsRepository) {}

	async execute({ userId }: GetCurrentTimecardUseCaseRequest) {
		const currentTimeCard =
			await this.timecardsRepository.findRecentTimecardByUserId(userId);

		return { currentTimeCard };
	}
}
