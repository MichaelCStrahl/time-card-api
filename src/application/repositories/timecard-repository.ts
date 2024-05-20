import { TimeCard } from "@prisma/client";

export abstract class TimecardsRepository {
	abstract findManyByUserId(userId: string): Promise<TimeCard[] | null>;
}
