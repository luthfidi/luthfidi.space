"use client";

import { useMemo, useState } from "react";
import { BiCodeAlt as SkillsIcon } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import { STACKS, SkillCategory } from "@/common/constants/stacks";

import SkillCard from "./SkillCard";

type FilterKey = "all" | "main" | SkillCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "main", label: "Main" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
  { key: "database", label: "Database" },
  { key: "tools", label: "Tools" },
];

const SkillList = () => {
  const t = useTranslations("HomePage");
  const [filter, setFilter] = useState<FilterKey>("all");

  const activeStacks = useMemo(
    () =>
      Object.entries(STACKS).filter(([, value]) => value.isActive === true),
    [],
  );

  const counts = useMemo(() => {
    const map: Record<FilterKey, number> = {
      all: activeStacks.length,
      main: 0,
      frontend: 0,
      backend: 0,
      mobile: 0,
      database: 0,
      tools: 0,
    };
    for (const [, value] of activeStacks) {
      if (value.isMain) map.main += 1;
      if (value.category) map[value.category] += 1;
    }
    return map;
  }, [activeStacks]);

  const visible = useMemo(() => {
    if (filter === "all") return activeStacks;
    if (filter === "main")
      return activeStacks.filter(([, value]) => value.isMain);
    return activeStacks.filter(([, value]) => value.category === filter);
  }, [activeStacks, filter]);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title={t("skills.title")} icon={<SkillsIcon />} />
        <SectionSubHeading>
          <p>{t("skills.sub_title")}</p>
        </SectionSubHeading>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map(({ key, label }) => {
          const isActive = filter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className="relative flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1.5 text-xs transition-colors hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-500"
            >
              {isActive && (
                <motion.div
                  layoutId="skill-filter-indicator"
                  className="absolute inset-0 rounded-full border border-primary bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span
                className={[
                  "relative z-10",
                  isActive
                    ? "text-white"
                    : "text-neutral-700 dark:text-neutral-300",
                ].join(" ")}
              >
                {label}
              </span>
              <span
                className={[
                  "relative z-10 rounded-full px-1.5 py-0.5 text-[11px] leading-none",
                  isActive
                    ? "bg-white/25 text-white"
                    : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400",
                ].join(" ")}
              >
                {counts[key]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map(([name, value]) => (
            <motion.div
              key={name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
                layout: { type: "spring", stiffness: 350, damping: 30 },
              }}
            >
              <SkillCard
                name={name}
                icon={value.icon}
                color={value.color}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillList;
