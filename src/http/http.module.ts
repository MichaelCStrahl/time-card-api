import { FetchTimecardsUseCase } from "@/application/use-case/fetch-timecards-by-user";
import { GetUserByRefUseCase } from "@/application/use-case/get-user-by-ref";
import { DatabaseModule } from "@/prisma/database.module";
import { Module } from "@nestjs/common";
import { FetchTimeCardsByUserController } from "./controllers/fetch-timecards-by-user.controller";
import { GetUserByRefController } from "./controllers/get-user-by-ref.controller";

@Module({
	imports: [DatabaseModule],
	controllers: [GetUserByRefController, FetchTimeCardsByUserController],
	providers: [GetUserByRefUseCase, FetchTimecardsUseCase],
})
export class HttpModule {}
