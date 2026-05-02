"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

const BATCH_SIZE = 8;
const DEFAULT_SORT: CreationSortBy = "likes";

const Creations = () => {
  const t = useTranslations("CreationsPage");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const account = searchParams.get("account") || "";
  const platform = searchParams.get("platform") || "";
  const category = searchParams.get("category") || "";
  const sortBy =
    (searchParams.get("sortBy") as CreationSortBy) || DEFAULT_SORT;

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const updateParam = (key: string, value: string, fallback?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== fallback) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const fetchParams = new URLSearchParams();
  if (account) fetchParams.append("account", account);
  if (platform) fetchParams.append("platform", platform);
  if (category) fetchParams.append("category", category);
  fetchParams.append("sortBy", sortBy);

  const { data, isLoading, error } = useSWR<CreationsApiResponse>(
    `/api/creations?${fetchParams.toString()}`,
    fetcher,
    { keepPreviousData: true },
  );

  // Reset visible count whenever the active filter set changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [account, platform, category, sortBy]);

  // Sentinel observer for incremental loading
  useEffect(() => {
    const total = data?.items?.length ?? 0;
    if (visibleCount >= total) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, total));
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [data?.items, visibleCount]);

  const totalItems = data?.items?.length ?? 0;
  const visibleItems = data?.items?.slice(0, visibleCount) ?? [];
  const pendingCount = Math.min(BATCH_SIZE, totalItems - visibleCount);
  const hasMore = visibleCount < totalItems;

  return (
    <section className="space-y-4">
      <CreationFilter
        accounts={data?.accounts ?? []}
        categories={data?.categories ?? []}
        account={account}
        platform={platform}
        category={category}
        sortBy={sortBy}
        onAccountChange={(v) => updateParam("account", v)}
        onPlatformChange={(v) => updateParam("platform", v)}
        onCategoryChange={(v) => updateParam("category", v)}
        onSortChange={(v) => updateParam("sortBy", v, DEFAULT_SORT)}
        total={totalItems}
      />

      {isLoading && !data && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...Array(BATCH_SIZE)].map((_, i) => (
            <CreationSkeleton key={i} />
          ))}
        </div>
      )}

      {error && <EmptyState message={t("error")} />}

      {!isLoading && data && data.items.length === 0 && (
        <EmptyState message={t("no_data")} />
      )}

      {data && data.items.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(index % BATCH_SIZE, 6) * 0.04,
                }}
              >
                <CreationCard {...item} />
              </motion.div>
            ))}
            {hasMore &&
              [...Array(pendingCount)].map((_, i) => (
                <CreationSkeleton key={`skeleton-${i}`} />
              ))}
          </div>
          {hasMore && (
            <div ref={sentinelRef} aria-hidden="true" className="h-1 w-full" />
          )}
        </>
      )}
    </section>
  );
};

export default Creations;
