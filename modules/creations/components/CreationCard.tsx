"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  HiOutlineArrowSmRight as ViewIcon,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineChatAlt2,
  HiOutlineShare,
  HiOutlineBookmark,
} from "react-icons/hi";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import type { CreationItem } from "@/common/types/creations";

const formatNumber = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
};

const getInstagramEmbedUrl = (url: string): string | null => {
  const match = url.match(/instagram\.com\/(p|reel|tv)\/([^/?]+)/);
  if (!match) return null;
  return `https://www.instagram.com/${match[1]}/${match[2]}/embed/`;
};

const getTikTokEmbedUrl = (url: string): string | null => {
  const match = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  if (!match) return null;
  return `https://www.tiktok.com/embed/v2/${match[1]}`;
};

const getEmbedUrl = (platform: string, url: string): string | null => {
  if (platform === "instagram") return getInstagramEmbedUrl(url);
  if (platform === "tiktok") return getTikTokEmbedUrl(url);
  return null;
};

const CreationCard = ({
  platform,
  title,
  date,
  url,
  metrics,
  linkOnly,
}: CreationItem) => {
  const issueDate = date ? format(parseISO(date), "d MMM yyyy") : "";
  const embedUrl = getEmbedUrl(platform, url);

  const embedRef = useRef<HTMLDivElement>(null);
  const [shouldLoadEmbed, setShouldLoadEmbed] = useState(false);

  useEffect(() => {
    if (!embedUrl || shouldLoadEmbed) return;
    const el = embedRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadEmbed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [embedUrl, shouldLoadEmbed]);

  return (
    <motion.article
      whileHover={{ y: -2 }}
      className="h-full"
      aria-label={title}
    >
      <SpotlightCard className="group flex h-full flex-col gap-3 border border-neutral-200 p-4 dark:border-neutral-800">
        {embedUrl && (
          <div
            ref={embedRef}
            className="relative aspect-square w-full overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
          >
            {shouldLoadEmbed ? (
              <>
                <iframe
                  src={embedUrl}
                  loading="lazy"
                  className="absolute left-0 top-[-100px] block h-[600px] w-full"
                  scrolling="no"
                  allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={title}
                />
                {linkOnly && (
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={title}
                    className="absolute inset-0 z-10"
                  />
                )}
              </>
            ) : (
              <div className="absolute inset-0 leading-none">
                <Skeleton
                  style={{ display: "block", height: "100%", width: "100%" }}
                />
              </div>
            )}
          </div>
        )}

        <h3 className="line-clamp-2 text-sm font-medium text-neutral-900 dark:text-neutral-200">
          {title}
        </h3>

        <dl className="grid grid-cols-5 gap-2 text-center text-[11px] text-neutral-600 dark:text-neutral-400">
          <Stat label="Reach" icon={<HiOutlineEye size={14} />} value={metrics.reach} />
          <Stat label="Likes" icon={<HiOutlineHeart size={14} />} value={metrics.likes} />
          <Stat label="Comments" icon={<HiOutlineChatAlt2 size={14} />} value={metrics.comments} />
          <Stat label="Shares" icon={<HiOutlineShare size={14} />} value={metrics.shares} />
          <Stat label="Saves" icon={<HiOutlineBookmark size={14} />} value={metrics.saves} />
        </dl>

        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-2 dark:border-neutral-800">
          <span className="text-[11px] uppercase text-neutral-400 dark:text-neutral-500">
            {issueDate}
          </span>
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-neutral-700 hover:text-primary dark:text-neutral-300 dark:hover:text-primary"
          >
            View <ViewIcon size={14} />
          </Link>
        </div>
      </SpotlightCard>
    </motion.article>
  );
};

const Stat = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) => (
  <div
    className="flex flex-col items-center gap-0.5"
    aria-label={`${formatNumber(value)} ${label.toLowerCase()}`}
  >
    <dt className="sr-only">{label}</dt>
    <dd className="contents">
      <span aria-hidden="true" className="text-neutral-500 dark:text-neutral-400">
        {icon}
      </span>
      <span aria-hidden="true">{formatNumber(value)}</span>
    </dd>
  </div>
);

export default CreationCard;
