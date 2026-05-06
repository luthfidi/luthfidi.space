"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

interface RepoNode {
  stargazerCount: number;
  primaryLanguage: { name: string; color: string | null } | null;
}

interface TopLanguagesProps {
  repos: RepoNode[];
  limit?: number;
}

const TopLanguages = ({ repos, limit = 6 }: TopLanguagesProps) => {
  const t = useTranslations("DashboardPage.github");

  const languages = useMemo(() => {
    const counts = new Map<string, { count: number; color: string | null }>();
    for (const repo of repos) {
      const lang = repo.primaryLanguage;
      if (!lang?.name) continue;
      const existing = counts.get(lang.name);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(lang.name, { count: 1, color: lang.color });
      }
    }
    const total = Array.from(counts.values()).reduce(
      (sum, v) => sum + v.count,
      0,
    );
    return Array.from(counts.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, limit)
      .map(([name, { count, color }]) => ({
        name,
        count,
        color,
        percent: total === 0 ? 0 : (count / total) * 100,
      }));
  }, [repos, limit]);

  if (languages.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {t("top_languages")}
      </h3>

      <div className="flex h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        {languages.map((lang) => (
          <div
            key={lang.name}
            style={{
              width: `${lang.percent}%`,
              backgroundColor: lang.color ?? "#888",
            }}
            title={`${lang.name}: ${lang.percent.toFixed(1)}%`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: lang.color ?? "#888" }}
            />
            <span className="text-neutral-700 dark:text-neutral-300">
              {lang.name}
            </span>
            <span className="text-neutral-500 dark:text-neutral-400">
              {lang.percent.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLanguages;
