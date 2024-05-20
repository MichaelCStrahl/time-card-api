import { TimeCard } from "@prisma/client";

export abstract class TimeCardsRepository {
	abstract findManyByUserId(userId: string): Promise<TimeCard[] | null>;
}
