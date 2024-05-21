import { CreateTimecardByUserUseCase } from "@/application/use-case/create-timecard-by-user";
import { Controller, HttpCode, Param, Patch } from "@nestjs/common";

@Controller("/timecards/:id/create")
export class CreateTimecardByUserController {
	constructor(
		private createTimecardByUserUseCase: CreateTimecardByUserUseCase,
	) {}

	@Patch()
	@HttpCode(204)
	async handle(@Param("id") id: string) {
		await this.createTimecardByUserUseCase.execute({
			userId: id,
		});
	}
}
