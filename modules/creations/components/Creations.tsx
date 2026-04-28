"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import EmptyState from "@/common/components/elements/EmptyState";
import { fetcher } from "@/services/fetcher";
import type {
  CreationItem,
  CreationSortBy,
} from "@/common/types/creations";

import CreationCard from "./CreationCard";
import CreationSkeleton from "./CreationSkeleton";
import CreationFilter from "./CreationFilter";

interface CreationsApiResponse {
  items: CreationItem[];
  categories: string[];
  accounts: string[];
}

const Creations = () => {
  const t = useTranslations("CreationsPage");

  const [account, setAccount] = useState("");
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState<CreationSortBy>("date");

  const params = new URLSearchParams();
  if (account) params.append("account", account);
  if (platform) params.append("platform", platform);
  if (category) params.append("category", category);
  params.append("sortBy", sortBy);

  const { data, isLoading, error } = useSWR<CreationsApiResponse>(
    `/api/creations?${params.toString()}`,
    fetcher,
  );

  return (
    <section className="space-y-4">
      <CreationFilter
        accounts={data?.accounts ?? []}
        categories={data?.categories ?? []}
        account={account}
        platform={platform}
        category={category}
        sortBy={sortBy}
        onAccountChange={setAccount}
        onPlatformChange={setPlatform}
        onCategoryChange={setCategory}
        onSortChange={setSortBy}
        total={data?.items.length ?? 0}
      />

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <CreationSkeleton key={i} />
          ))}
        </div>
      )}

      {error && <EmptyState message={t("error")} />}

      {!isLoading && data && data.items.length === 0 && (
        <EmptyState message={t("no_data")} />
      )}

      {!isLoading && data && data.items.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {data.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <CreationCard {...item} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Creations;
