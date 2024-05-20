import { AppModule } from "@/app.module";
import { DatabaseModule } from "@/prisma/database.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Fetch Time Cards By User Id", () => {
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

	test("[GET] /timecards/:id", async () => {
		const userRef = "4SXXFMF";
		const user = await prisma.user.create({
			data: {
				name: "John",
				ref: userRef,
			},
		});

		await prisma.timeCard.create({
			data: {
				userId: user.id,
				startDate: new Date(),
				endDate: new Date(),
			},
		});

		const response = await request(app.getHttpServer())
			.get(`/timecards/${user.id}`)
			.send();

		expect(response.status).toBe(200);
		expect(response.body.timeCards).toHaveLength(1);

		expect(response.body).toEqual({
			timeCards: expect.arrayContaining([
				expect.objectContaining({
					userId: user.id,
					startDate: expect.any(String),
					endDate: expect.any(String),
				}),
			]),
		});
	});
});
