import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";

interface GetUserByRefUseCaseRequest {
	ref: string;
}

@Injectable()
export class GetUserByRefUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async execute({ ref }: GetUserByRefUseCaseRequest) {
		const user = await this.usersRepository.findByRef(ref);

		if (!user) {
			throw new NotFoundException("User not found.");
		}

		return { user };
	}
}
