// We use German here to get periods for the formatting, instead of forward slashes, but it really should be localized to where the user is
const DateFormatter = Intl.DateTimeFormat("de", {
	month: "numeric",
	year: "numeric",
	day: "numeric",
});

const TimeFormatter = Intl.DateTimeFormat("de", {
	hour: "numeric",
	minute: "2-digit",
});

export function formatDate(value: Date | number) {
	return DateFormatter.format(value);
}

export function formatTime(value: Date | number) {
	return TimeFormatter.format(value);
}
