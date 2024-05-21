import { CreateTimecardByUserUseCase } from "@/application/use-case/create-timecard-by-user";
import { FetchTimecardsUseCase } from "@/application/use-case/fetch-timecards-by-user";
import { FinishTimeCardByUserUseCase } from "@/application/use-case/finish-timecard-by-user";
import { GetUserByRefUseCase } from "@/application/use-case/get-user-by-ref";
import { DatabaseModule } from "@/prisma/database.module";
import { Module } from "@nestjs/common";
import { CreateTimecardByUserController } from "./controllers/create-timecard-by-user.controller";
import { FetchTimeCardsByUserController } from "./controllers/fetch-timecards-by-user.controller";
import { FinishTimecardByUserController } from "./controllers/finish-timecard-by-user.controller";
import { GetUserByRefController } from "./controllers/get-user-by-ref.controller";

@Module({
	imports: [DatabaseModule],
	controllers: [
		GetUserByRefController,
		FetchTimeCardsByUserController,
		CreateTimecardByUserController,
		FinishTimecardByUserController,
	],
	providers: [
		GetUserByRefUseCase,
		FetchTimecardsUseCase,
		CreateTimecardByUserUseCase,
		FinishTimeCardByUserUseCase,
	],
})
export class HttpModule {}
