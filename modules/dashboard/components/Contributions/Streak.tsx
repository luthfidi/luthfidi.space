"use client";

import { useTranslations } from "next-intl";

import OverviewItem from "./OverviewItem";

interface StreakProps {
  current: number;
  longest: number;
}

const Streak = ({ current, longest }: StreakProps) => {
  const t = useTranslations("DashboardPage.github");

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
