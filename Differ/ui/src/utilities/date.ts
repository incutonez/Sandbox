type TDateValue = number | string | Date;

const DateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export function dateTime(value: TDateValue) {
  if (typeof value === "string") {
    value = new Date(value);
  }
  return DateTimeFormatter.format(value);
}
