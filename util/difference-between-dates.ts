interface CalculateTimeDifferenceProps {
	endDate: Date;
	startDate: Date;
}

export function calculateTimeDifference({
	endDate,
	startDate,
}: CalculateTimeDifferenceProps) {
	const isDate = startDate instanceof Date && endDate instanceof Date;

	if (!isDate) {
		throw new Error("Both dates must be instances of Date");
	}

	const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

	const differenceInHours = Math.floor(
		differenceInMilliseconds / (1000 * 60 * 60),
	);

	const differenceInMinutes = Math.floor(
		(differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
	);

	return { hours: differenceInHours, minutes: differenceInMinutes };
}
