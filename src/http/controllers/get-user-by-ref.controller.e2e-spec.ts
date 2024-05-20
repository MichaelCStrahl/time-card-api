import { AppModule } from "@/app.module";
import { DatabaseModule } from "@/prisma/database.module";
import { PrismaService } from "@/prisma/prisma.service";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";

describe("Get user by ref (E2E)", () => {
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

	test("[GET] /users/:ref", async () => {
		const userRef = "4SXXFMF";
		await prisma.user.create({
			data: {
				name: "John",
				ref: userRef,
			},
		});

		const response = await request(app.getHttpServer())
			.get(`/users/${userRef}`)
			.send();

		expect(response.status).toBe(200);

		expect(response.body.user).toEqual(
			expect.objectContaining({
				name: "John",
				ref: userRef,
			}),
		);
	});
});
