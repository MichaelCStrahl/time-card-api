import { GetUserByRefUseCase } from "@/application/use-case/get-user-by-ref";
import { DatabaseModule } from "@/prisma/database.module";
import { Module } from "@nestjs/common";
import { GetUserByRefController } from "./controllers/get-user-by-ref.controller";

@Module({
	imports: [DatabaseModule],
	controllers: [GetUserByRefController],
	providers: [GetUserByRefUseCase],
})
export class HttpModule {}
