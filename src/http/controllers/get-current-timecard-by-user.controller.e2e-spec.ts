import { AppModule } from "@/app.module";
import { DatabaseModule } from "@/prisma/database.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import dayjs from "dayjs";
import request from "supertest";

describe("Get current time card by user id (E2E)", () => {
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

	test("[GET] /timecards/:id/current", async () => {
		const userRef = "4SXXFMF";
		const user = await prisma.user.create({
			data: {
				name: "John",
				ref: userRef,
			},
		});

		const fakerTimeCard1 = {
			userId: user.id,
			startDate: new Date(2024, 4, 20, 8, 0, 0),
			endDate: new Date(2024, 4, 20, 18, 0, 0),
		};

		const fakerTimeCard2 = {
			userId: user.id,
			startDate: new Date(2024, 3, 21, 8, 0, 0),
			endDate: new Date(2024, 3, 21, 18, 0, 0),
		};

		const today = dayjs();

		const fakerTimeCardCurrent = {
			userId: user.id,
			startDate: today.toDate(),
			endDate: null,
		};

		await prisma.timeCard.createMany({
			data: [fakerTimeCard1, fakerTimeCard2, fakerTimeCardCurrent],
		});

		const response = await request(app.getHttpServer())
			.get(`/timecards/${user.id}/current`)
			.send();

		const startOfDay = today.startOf("day").toDate();

		const getPrismaCurrentTimeCard = await prisma.timeCard.findFirst({
			where: {
				userId: user.id,
				startDate: {
					gte: startOfDay,
				},
			},
		});

		const isSameDates = dayjs(response.body.currentTimeCard.startDate).isSame(
			getPrismaCurrentTimeCard?.startDate,
		);

		expect(response.status).toBe(200);
		expect(isSameDates).toBeTruthy();
		expect(response.body.currentTimeCard).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				userId: user.id,
				startDate: expect.any(String),
				endDate: null,
			}),
		);
	});
});
