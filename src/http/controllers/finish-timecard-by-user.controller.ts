import { FinishTimecardByUserUseCase } from "@/application/use-case/finish-timecard-by-user";
import { Controller, HttpCode, Param, Patch } from "@nestjs/common";

@Controller("/timecards/:id/finish")
export class FinishTimecardByUserController {
	constructor(
		private finishTimecardByUserUseCase: FinishTimecardByUserUseCase,
	) {}

	@Patch()
	@HttpCode(204)
	async handle(@Param("id") id: string) {
		await this.finishTimecardByUserUseCase.execute({
			userId: id,
		});
	}
}
