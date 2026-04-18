import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateUTC = (
  date?: string | Date | null,
  format: string = "DD/MM/YYYY",
  tz: string = dayjs.tz.guess()
): string => {
  if (!date) return "-";
  return dayjs.utc(date).tz(tz).format(format);
};

export const formatDateToDatePickerValue = (
  date?: string | Date | null | dayjs.Dayjs,
  tz: string = dayjs.tz.guess()
): Dayjs | null => {
  if (!date) return null;
  const utcOffset = dayjs().tz(tz).utcOffset() / 60;
  return dayjs(date).tz(tz).add(utcOffset, "hour");
};