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

		const startDate = new Date(2024, 4, 20, 8, 0, 0);
		const endDate = new Date(2024, 4, 20, 18, 0, 0);

		await prisma.timeCard.create({
			data: {
				userId: user.id,
				startDate,
				endDate,
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
					id: expect.any(String),
					hoursWorked: expect.any(String),
					startDayWorked: expect.any(String),
					userId: user.id,
				}),
			]),
		});
	});
});
