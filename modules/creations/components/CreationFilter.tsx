"use client";

import { useTranslations } from "next-intl";

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

const SELECT_CLASS =
  "rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-xs text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300";

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

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex flex-wrap gap-2">
        <select
          value={account}
          onChange={(e) => onAccountChange(e.target.value)}
          className={SELECT_CLASS}
        >
          <option value="">{t("all_accounts")}</option>
          {accounts.map((a) => (
            <option key={a} value={a}>
              {accountLabel[a] || a}
            </option>
          ))}
        </select>

        <select
          value={platform}
          onChange={(e) => onPlatformChange(e.target.value)}
          className={SELECT_CLASS}
        >
          <option value="">{t("all_platforms")}</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
        </select>

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={SELECT_CLASS}
        >
          <option value="">{t("all_categories")}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as CreationSortBy)}
          className={SELECT_CLASS}
        >
          <option value="date">{t("sort_date")}</option>
          <option value="likes">{t("sort_likes")}</option>
          <option value="reach">{t("sort_reach")}</option>
          <option value="shares">{t("sort_shares")}</option>
          <option value="saves">{t("sort_saves")}</option>
        </select>
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        {total} item
      </p>
    </div>
  );
};

export default CreationFilter;
