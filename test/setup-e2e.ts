import "dotenv/config";

import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const schemaId = randomUUID();

function generateUniqueDatabaseURL(id: string) {
	if (!process.env.DATABASE_URL) {
		throw new Error("Please provider a DATABASE_URL environment variable.");
	}

	const url = new URL(process.env.DATABASE_URL);

	url.searchParams.set("schema", id);

	return url.toString();
}

beforeAll(async () => {
	const databaseURL = generateUniqueDatabaseURL(schemaId);

	process.env.DATABASE_URL = databaseURL;

	execSync("npx prisma migrate deploy");
});

afterAll(async () => {
	await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
	await prisma.$disconnect();
});
