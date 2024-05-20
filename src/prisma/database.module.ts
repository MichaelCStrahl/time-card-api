import { TimecardsRepository } from "@/application/repositories/timecard-repository";
import { UsersRepository } from "@/application/repositories/users-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PrismaTimecardsRepository } from "./repositories/prisma-timecards-repository";
import { PrismaUsersRepository } from "./repositories/prisma-users-repository";

@Module({
	providers: [
		PrismaService,
		{
			provide: UsersRepository,
			useClass: PrismaUsersRepository,
		},
		{
			provide: TimecardsRepository,
			useClass: PrismaTimecardsRepository,
		},
	],
	exports: [PrismaService, UsersRepository, TimecardsRepository],
})
export class DatabaseModule {}
