"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import EmptyState from "@/common/components/elements/EmptyState";
import { AchievementItem } from "@/common/types/achievements";

import AchievementCard from "./AchievementCard";
import FilterHeader from "./FilterHeader";

interface AchievementsProps {
  achievements: AchievementItem[];
  categories: string[];
  types: string[];
}

const Achievements = ({
  achievements,
  categories,
  types,
}: AchievementsProps) => {
  const t = useTranslations("AchievementsPage");

  const params = useSearchParams();
  const type = params.get("type");
  const category = params.get("category");
  const search = params.get("search")?.toLowerCase() ?? "";

  const filtered = achievements
    .filter((item) => {
      if (!item?.is_show) return false;
      if (category && item.category !== category) return false;
      if (type && item.type !== type) return false;
      if (search && !item.name.toLowerCase().includes(search)) return false;
      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime(),
    );

  return (
    <section className="space-y-4">
      <FilterHeader
        categoryOptions={categories}
        typeOptions={types}
        totalData={filtered.length}
      />

      {filtered.length === 0 ? (
        <EmptyState message={t("no_data")} />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AchievementCard {...item} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Achievements;
