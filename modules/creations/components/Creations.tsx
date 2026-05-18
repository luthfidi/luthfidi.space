"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import EmptyState from "@/common/components/elements/EmptyState";
import type {
  CreationItem,
  CreationSortBy,
} from "@/common/types/creations";

import CreationCard from "./CreationCard";
import CreationSkeleton from "./CreationSkeleton";
import CreationFilter from "./CreationFilter";

interface CreationsProps {
  creations: CreationItem[];
  accounts: string[];
  categories: string[];
}

const BATCH_SIZE = 8;
const DEFAULT_SORT: CreationSortBy = "likes";

const Creations = ({ creations, accounts, categories }: CreationsProps) => {
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

  const filtered = useMemo(() => {
    const result = creations.filter((c) => {
      if (account && c.account !== account) return false;
      if (platform && c.platform !== platform) return false;
      if (category && c.category !== category) return false;
      return true;
    });
    if (sortBy === "date") {
      result.sort((a, b) => b.date.localeCompare(a.date));
    } else {
      result.sort((a, b) => b.metrics[sortBy] - a.metrics[sortBy]);
    }
    return result;
  }, [creations, account, platform, category, sortBy]);

  // Reset visible count whenever the active filter set changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset pagination when filter inputs change
    setVisibleCount(BATCH_SIZE);
  }, [account, platform, category, sortBy]);

  // Sentinel observer for incremental loading
  useEffect(() => {
    const total = filtered.length;
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
  }, [filtered, visibleCount]);

  const totalItems = filtered.length;
  const visibleItems = filtered.slice(0, visibleCount);
  const pendingCount = Math.min(BATCH_SIZE, totalItems - visibleCount);
  const hasMore = visibleCount < totalItems;

  return (
    <section className="space-y-4">
      <CreationFilter
        accounts={accounts}
        categories={categories}
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

      {totalItems === 0 ? (
        <EmptyState message={t("no_data")} />
      ) : (
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
