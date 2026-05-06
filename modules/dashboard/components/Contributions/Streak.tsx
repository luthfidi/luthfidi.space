"use client";

import { useTranslations } from "next-intl";

import OverviewItem from "./OverviewItem";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface StreakProps {
  weeks: { contributionDays: ContributionDay[] }[];
}

const calculateStreaks = (
  weeks: { contributionDays: ContributionDay[] }[],
): { current: number; longest: number } => {
  const days = weeks.flatMap((w) => w.contributionDays);
  if (days.length === 0) return { current: 0, longest: 0 };

  // Sort ascending by date
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));

  let longest = 0;
  let running = 0;
  for (const d of sorted) {
    if (d.contributionCount > 0) {
      running += 1;
      longest = Math.max(longest, running);
    } else {
      running = 0;
    }
  }

  // Current streak: count consecutive non-zero days from the latest day backwards.
  // Skip the last day if it's "today" with zero contributions (user hasn't coded yet today)
  let current = 0;
  const today = new Date().toISOString().slice(0, 10);
  let i = sorted.length - 1;
  if (i >= 0 && sorted[i].date === today && sorted[i].contributionCount === 0) {
    i -= 1;
  }
  for (; i >= 0; i -= 1) {
    if (sorted[i].contributionCount > 0) {
      current += 1;
    } else {
      break;
    }
  }

  return { current, longest };
};

const Streak = ({ weeks }: StreakProps) => {
  const t = useTranslations("DashboardPage.github");
  const { current, longest } = calculateStreaks(weeks);

  return (
    <div className="grid grid-cols-2 gap-3">
      <OverviewItem
        label={t("current_streak")}
        value={current}
        unit={t("days_unit")}
      />
      <OverviewItem
        label={t("longest_streak")}
        value={longest}
        unit={t("days_unit")}
      />
    </div>
  );
};

export default Streak;
