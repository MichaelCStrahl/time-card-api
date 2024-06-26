import { GetUserByRefUseCase } from "@/application/use-case/get-user-by-ref";
import { Controller, Get, NotFoundException, Param } from "@nestjs/common";

@Controller("/users/:ref")
export class GetUserByRefController {
	constructor(private getUserByRef: GetUserByRefUseCase) {}

	@Get()
	async handle(@Param("ref") ref: string) {
		const { user } = await this.getUserByRef.execute({ ref });

		if (!user) {
			throw new NotFoundException();
		}

		return { user };
	}
}
