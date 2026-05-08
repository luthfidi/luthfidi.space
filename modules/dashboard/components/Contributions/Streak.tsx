"use client";

import { useTranslations } from "next-intl";
import { format, parseISO } from "date-fns";

import OverviewItem from "./OverviewItem";

interface StreakProps {
  current: number;
  longest: number;
  currentStart?: string | null;
  currentEnd?: string | null;
  longestStart?: string | null;
  longestEnd?: string | null;
}

const formatRange = (start?: string | null, end?: string | null) => {
  if (!start || !end) return null;
  try {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    if (start === end) return format(startDate, "MMM d, yyyy");
    // Same year: omit year on the start to keep it tidy.
    // Cross-year: show year on both for clarity.
    if (startDate.getFullYear() === endDate.getFullYear()) {
      return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d, yyyy")}`;
    }
    return `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
  } catch {
    return null;
  }
};

const Streak = ({
  current,
  longest,
  currentStart,
  currentEnd,
  longestStart,
  longestEnd,
}: StreakProps) => {
  const t = useTranslations("DashboardPage.github");

  return (
    <div className="grid grid-cols-2 gap-3">
      <OverviewItem
        label={t("current_streak")}
        value={current}
        unit={t("days_unit")}
        subtitle={formatRange(currentStart, currentEnd)}
      />
      <OverviewItem
        label={t("longest_streak")}
        value={longest}
        unit={t("days_unit")}
        subtitle={formatRange(longestStart, longestEnd)}
      />
    </div>
  );
};

export default Streak;
