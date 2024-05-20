import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GetUserByRefController } from "./controllers/get-user-by-ref.controller";
import { envSchema } from "./env";
import { PrismaService } from "./prisma/prisma.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
	],
	controllers: [GetUserByRefController],
	providers: [PrismaService],
})
export class AppModule {}
