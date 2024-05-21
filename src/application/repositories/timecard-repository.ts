import { TimeCard } from "@prisma/client";
import { HoursWorked } from "../use-case/fetch-timecards-by-user";

export abstract class TimecardsRepository {
	abstract findManyByUserId(userId: string): Promise<HoursWorked[] | null>;
	abstract findRecentTimecardByUserId(userId: string): Promise<TimeCard | null>;
	abstract updateTimecard(id: string): Promise<void>;
	abstract create(userId: string): Promise<void>;
}
