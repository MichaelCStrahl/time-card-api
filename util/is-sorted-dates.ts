import { HoursWorked } from "@/application/use-case/fetch-timecards-by-user";

export function isSortedDates(data: HoursWorked[] | null): boolean {
	if (!data) return false;

	for (let i = 1; i < data.length; i++) {
		if (data[i].startDayWorked > data[i - 1].startDayWorked) {
			return false;
		}
	}

	return true;
}
