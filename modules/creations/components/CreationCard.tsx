"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import {
  HiOutlineArrowSmRight as ViewIcon,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineChatAlt2,
  HiOutlineShare,
  HiOutlineBookmark,
} from "react-icons/hi";
import { SiInstagram, SiTiktok } from "react-icons/si";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import type { CreationItem } from "@/common/types/creations";

const formatNumber = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
};

const accountLabel: Record<string, string> = {
  filetechno: "@filetechno",
  bnccbinus: "@bnccbinus",
  filemagz: "@filemagz",
};

const CreationCard = ({
  account,
  platform,
  category,
  title,
  date,
  url,
  metrics,
}: CreationItem) => {
  const issueDate = date ? format(parseISO(date), "d MMM yyyy") : "";
  const PlatformIcon = platform === "tiktok" ? SiTiktok : SiInstagram;

  return (
    <motion.div whileHover={{ y: -2 }} className="h-full">
      <SpotlightCard className="group flex h-full flex-col gap-3 border border-neutral-200 p-4 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <PlatformIcon size={14} />
            <span>{accountLabel[account] || account}</span>
          </div>
          <span className="rounded-full border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-[10px] capitalize text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
            {category}
          </span>
        </div>

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
