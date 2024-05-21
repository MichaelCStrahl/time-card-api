import { GetUserByRefUseCase } from "@/application/use-case/get-user-by-ref";
import { Controller, Get, NotFoundException, Param } from "@nestjs/common";

@Controller("/users/:ref")
export class GetUserByRefController {
	constructor(private getUserByRef: GetUserByRefUseCase) {}

	@Get()
	async handle(@Param("ref") ref: string) {
		const { user, currentTimeWork } = await this.getUserByRef.execute({ ref });

		if (!user) {
			throw new NotFoundException();
		}

		if (currentTimeWork) {
			return { user, currentTimeWork };
		}

		return { user };
	}
}
