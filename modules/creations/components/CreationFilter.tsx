"use client";

import { useTranslations } from "next-intl";

import ComboBoxFilter from "@/common/components/elements/ComboBoxFilter";
import type { CreationSortBy } from "@/common/types/creations";

interface CreationFilterProps {
  accounts: string[];
  categories: string[];
  account: string;
  platform: string;
  category: string;
  sortBy: CreationSortBy;
  onAccountChange: (v: string) => void;
  onPlatformChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onSortChange: (v: CreationSortBy) => void;
  total: number;
}

const accountLabel: Record<string, string> = {
  filetechno: "@filetechno",
  bnccbinus: "@bnccbinus",
  filemagz: "@filemagz",
};

const platformLabel: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
};

const PLATFORMS = ["instagram", "tiktok"];

const SORT_OPTIONS: CreationSortBy[] = [
  "date",
  "likes",
  "reach",
  "shares",
  "saves",
];

const CreationFilter = ({
  accounts,
  categories,
  account,
  platform,
  category,
  sortBy,
  onAccountChange,
  onPlatformChange,
  onCategoryChange,
  onSortChange,
  total,
}: CreationFilterProps) => {
  const t = useTranslations("CreationsPage");

  const sortLabel: Record<CreationSortBy, string> = {
    date: t("sort_date"),
    likes: t("sort_likes"),
    reach: t("sort_reach"),
    shares: t("sort_shares"),
    saves: t("sort_saves"),
  };

  return (
    <div className="space-y-4">
      <div className="flex w-full flex-col gap-3 md:flex-row">
        <ComboBoxFilter
          data={accounts}
          placeholder={t("all_accounts")}
          clearLabel={t("all_accounts")}
          formatLabel={(item) => accountLabel[item] || item}
          value={account}
          onChange={onAccountChange}
          className="md:w-auto md:flex-1"
        />
        <ComboBoxFilter
          data={PLATFORMS}
          placeholder={t("all_platforms")}
          clearLabel={t("all_platforms")}
          formatLabel={(item) => platformLabel[item] || item}
          value={platform}
          onChange={onPlatformChange}
          className="md:w-auto md:flex-1"
        />
        <ComboBoxFilter
          data={categories}
          placeholder={t("all_categories")}
          clearLabel={t("all_categories")}
          value={category}
          onChange={onCategoryChange}
          className="md:w-auto md:flex-1"
        />
        <ComboBoxFilter
          data={SORT_OPTIONS}
          placeholder={t("sort_by")}
          clearable={false}
          formatLabel={(item) => sortLabel[item as CreationSortBy] || item}
          value={sortBy}
          onChange={(v) => onSortChange((v || "date") as CreationSortBy)}
          className="md:w-auto md:flex-1"
        />
      </div>

      <div className="ml-1 text-sm text-neutral-500 dark:text-neutral-400">
        {t("total", { count: total })}
      </div>
    </div>
  );
};

export default CreationFilter;
