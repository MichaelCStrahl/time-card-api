import { Injectable, NotFoundException } from "@nestjs/common";
import { TimecardsRepository } from "../repositories/timecard-repository";
import { UsersRepository } from "../repositories/users-repository";

interface GetUserByRefUseCaseRequest {
	ref: string;
}

@Injectable()
export class GetUserByRefUseCase {
	constructor(
		private usersRepository: UsersRepository,
		private timecardsRepository: TimecardsRepository,
	) {}

	async execute({ ref }: GetUserByRefUseCaseRequest) {
		const user = await this.usersRepository.findByRef(ref);

		if (!user) {
			throw new NotFoundException("User not found.");
		}

		const currentTimeWork =
			await this.timecardsRepository.findRecentTimecardByUserId(user.id);

		if (currentTimeWork) {
			return { user, currentTimeWork };
		}

		return { user };
	}
}
