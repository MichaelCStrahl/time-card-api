import { GetCurrentTimecardUseCase } from "@/application/use-case/get-current-time-card";
import { Controller, Get, Param } from "@nestjs/common";

@Controller("/timecards/:id/current")
export class GetCurrentTimeCardController {
	constructor(private getCurrentTimecardUseCase: GetCurrentTimecardUseCase) {}

	@Get()
	async handle(@Param("id") id: string) {
		const { currentTimeCard } = await this.getCurrentTimecardUseCase.execute({
			userId: id,
		});

		return { currentTimeCard };
	}
}
