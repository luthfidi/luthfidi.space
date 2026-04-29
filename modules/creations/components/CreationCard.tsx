"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { motion } from "motion/react";
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

const CreationCard = ({
  platform,
  title,
  date,
  url,
  metrics,
}: CreationItem) => {
  const issueDate = date ? format(parseISO(date), "d MMM yyyy") : "";
  const embedUrl =
    platform === "instagram" ? getInstagramEmbedUrl(url) : null;

  return (
    <motion.div whileHover={{ y: -2 }} className="h-full">
      <SpotlightCard className="group flex h-full flex-col gap-3 border border-neutral-200 p-4 dark:border-neutral-800">
        {embedUrl && (
          <div className="relative aspect-square w-full overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
            <iframe
              src={embedUrl}
              loading="lazy"
              className="absolute left-0 top-[-100px] block h-[600px] w-full"
              scrolling="no"
              allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
              title={title}
            />
          </div>
        )}

        <h3 className="line-clamp-2 text-sm font-medium text-neutral-900 dark:text-neutral-200">
          {title}
        </h3>

        <div className="grid grid-cols-5 gap-2 text-center text-[10px] text-neutral-600 dark:text-neutral-400">
          <Stat icon={<HiOutlineEye size={14} />} value={metrics.reach} />
          <Stat icon={<HiOutlineHeart size={14} />} value={metrics.likes} />
          <Stat icon={<HiOutlineChatAlt2 size={14} />} value={metrics.comments} />
          <Stat icon={<HiOutlineShare size={14} />} value={metrics.shares} />
          <Stat icon={<HiOutlineBookmark size={14} />} value={metrics.saves} />
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-2 dark:border-neutral-800">
          <span className="text-[10px] uppercase text-neutral-400 dark:text-neutral-500">
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
    </motion.div>
  );
};

const Stat = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: number;
}) => (
  <div className="flex flex-col items-center gap-0.5">
    <span className="text-neutral-500 dark:text-neutral-400">{icon}</span>
    <span>{formatNumber(value)}</span>
  </div>
);

export default CreationCard;
