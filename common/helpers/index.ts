import { toZonedTime } from "date-fns-tz/toZonedTime";
import { format, parseISO } from "date-fns";

export const formatDate = (date: string, type = "MMMM dd, yyyy") => {
  if (!date) {
    return "";
  }

  const formattedDate = format(
    toZonedTime(parseISO(date), "Asia/Jakarta"),
    type,
  );

  return formattedDate;
};
