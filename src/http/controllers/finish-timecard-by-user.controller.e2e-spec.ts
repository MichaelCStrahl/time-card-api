import { AppModule } from "@/app.module";
import { DatabaseModule } from "@/prisma/database.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Finish Time Card By User (E2E)", () => {
	let app: INestApplication;
	let prisma: PrismaService;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule, DatabaseModule],
		}).compile();

		app = moduleRef.createNestApplication();
		prisma = moduleRef.get<PrismaService>(PrismaService);
		await app.init();
	});

	test("[PATCH] /timecards/:id/finish", async () => {
		const userRef = "4SXXFMF";
		const user = await prisma.user.create({
			data: {
				name: "John",
				ref: userRef,
			},
		});

		await request(app.getHttpServer())
			.patch(`/timecards/${user.id}/create`)
			.send();

		const response = await request(app.getHttpServer())
			.patch(`/timecards/${user.id}/finish`)
			.send();

		expect(response.status).toBe(204);
	});
});
