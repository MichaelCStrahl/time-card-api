import { FetchTimecardsUseCase } from "@/application/use-case/fetch-timecards-by-user";
import { Controller, Get, Param } from "@nestjs/common";

@Controller("/timecards/:id")
export class FetchTimeCardsByUserController {
	constructor(private fetchTimecardsByUserUseCase: FetchTimecardsUseCase) {}

	@Get()
	async handle(@Param("id") id: string) {
		const { timeCards } = await this.fetchTimecardsByUserUseCase.execute({
			userId: id,
		});

		return { timeCards };
	}
}
