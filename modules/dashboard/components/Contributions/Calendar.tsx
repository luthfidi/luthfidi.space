"use client";

import clsx from "clsx";
import { memo, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";

import Portal from "@/common/components/elements/Portal";

interface Contribution {
  date: string;
  contributionCount: number;
  color: string;
}

interface Month {
  name: string;
  firstDay: string;
  totalWeeks: number;
  contributionsCount: number;
}

interface CalendarProps {
  data?: {
    weeks: {
      firstDay: string;
      contributionDays: Contribution[];
    }[];
    months: Month[];
    colors: string[];
  };
  rightSlot?: React.ReactNode;
}

interface HoverState {
  date: string;
  count: number;
  left: number;
  top: number;
}

const ENGLISH_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ordinal = (n: number): string => {
  if (n >= 11 && n <= 13) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatDate = (dateStr: string, locale: string): string => {
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  const date = new Date(yyyy, mm - 1, dd);

  if (locale === "en") {
    const day = date.getDate();
    const month = ENGLISH_MONTHS[date.getMonth()];
    return `${month} ${day}${ordinal(day)}`;
  }

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
  }).format(date);
};

const CONTRIBUTION_COLORS = ["#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa"];

interface CellProps {
  date: string;
  count: number;
  backgroundColor: string | null;
  delay: number;
  onEnter: (e: React.MouseEvent<HTMLSpanElement>, date: string, count: number) => void;
  onLeave: () => void;
}

// Memoized so hover state changes on the parent don't re-render every cell.
const Cell = memo(function Cell({
  date,
  count,
  backgroundColor,
  delay,
  onEnter,
  onLeave,
}: CellProps) {
  return (
    <motion.span
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0, translateY: -20 },
        animate: {
          opacity: 1,
          translateY: 0,
          transition: { delay },
        },
      }}
      className="my-[2px] block h-[12px] w-[12px] rounded-sm bg-neutral-300 dark:bg-neutral-800"
      style={backgroundColor ? { backgroundColor } : undefined}
      onMouseEnter={(e) => onEnter(e, date, count)}
      onMouseLeave={onLeave}
    />
  );
});

const Calendar = ({ data, rightSlot }: CalendarProps) => {
  const [hover, setHover] = useState<HoverState | null>(null);

  const t = useTranslations("DashboardPage.github");
  const locale = useLocale();

  const weeks = data?.weeks ?? [];
  const months =
    data?.months?.map((month: Month) => {
      const filterContributionDay = weeks
        .filter(
          (week) => week.firstDay.slice(0, 7) === month.firstDay.slice(0, 7),
        )
        .map((item) => item.contributionDays)
        .flat(1);
      const getContributionsByMonth = filterContributionDay.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.contributionCount,
        0,
      );

      return {
        ...month,
        contributionsCount: getContributionsByMonth,
      };
    }) ?? [];

  // Pre-compute deterministic-ish delays once per data change so hover
  // re-renders don't re-randomize and re-trigger animations on every cell.
  const cellDelays = useMemo(() => {
    const map = new Map<string, number>();
    weeks.forEach((week) => {
      week.contributionDays.forEach((day, dayIndex) => {
        // Deterministic stagger based on position; cheap and visually similar.
        map.set(day.date, (dayIndex * 0.05) % 1);
      });
    });
    return map;
  }, [weeks]);

  const handleEnter = useMemo(
    () =>
      (e: React.MouseEvent<HTMLSpanElement>, date: string, count: number) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setHover({
          date,
          count,
          left: rect.left + rect.width / 2,
          top: rect.top,
        });
      },
    [],
  );

  const handleLeave = useMemo(() => () => setHover(null), []);

  const tooltipText =
    hover &&
    (locale === "en"
      ? `${hover.count === 0 ? "No" : hover.count} contribution${
          hover.count === 1 ? "" : "s"
        } on ${formatDate(hover.date, locale)}`
      : `${hover.count === 0 ? "Tidak ada" : hover.count} kontribusi pada ${formatDate(
          hover.date,
          locale,
        )}`);

  return (
    <>
      <div className="relative flex flex-col">
        <ul className="flex justify-end gap-[3px] overflow-hidden text-xs dark:text-neutral-400 md:justify-start">
          {months.map((month) => (
            <li
              key={month.firstDay}
              className={clsx(`${month.totalWeeks < 2 ? "invisible" : ""}`)}
              style={{ minWidth: 14.3 * month.totalWeeks }}
            >
              {month.name}
            </li>
          ))}
        </ul>

        <div className="flex justify-start gap-[2.9px] overflow-hidden">
          {weeks?.map((week) => (
            <div key={week.firstDay}>
              {week.contributionDays.map((contribution) => {
                const colorIndex = data?.colors.indexOf(contribution.color);
                const customColor =
                  colorIndex !== -1 && colorIndex !== undefined
                    ? CONTRIBUTION_COLORS[colorIndex]
                    : null;

                const backgroundColor =
                  contribution.contributionCount > 0 ? customColor : null;

                return (
                  <Cell
                    key={contribution.date}
                    date={contribution.date}
                    count={contribution.contributionCount}
                    backgroundColor={backgroundColor}
                    delay={cellDelays.get(contribution.date) ?? 0}
                    onEnter={handleEnter}
                    onLeave={handleLeave}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Render via Portal so position:fixed is relative to viewport,
          not any transformed ancestor (AOS, motion containers, etc.). */}
      <Portal>
        <AnimatePresence>
          {hover && tooltipText && (
            <motion.div
              key={hover.date}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.12 }}
              className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-full"
              style={{ left: hover.left, top: hover.top - 4 }}
            >
              <div className="relative whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-xs text-white shadow-lg dark:bg-neutral-100 dark:text-neutral-900">
                {tooltipText}
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="dark:text-neutral-400">
            {t("title_less_contribution")}
          </span>
          <ul className="flex gap-1">
            <li className="h-[10px] w-[10px] rounded-sm bg-neutral-300 dark:bg-neutral-800" />
            {CONTRIBUTION_COLORS.map((item, index) => (
              <motion.li
                key={item}
                initial="initial"
                animate="animate"
                variants={{
                  initial: { opacity: 0 },
                  animate: {
                    opacity: 1,
                    transition: { delay: index * 0.3 },
                  },
                }}
                className="h-[10px] w-[10px] rounded-sm"
                style={{ backgroundColor: item }}
              />
            ))}
          </ul>
          <span>{t("title_more_contribution")}</span>
        </div>

        {rightSlot && <div className="ml-auto">{rightSlot}</div>}
      </div>
    </>
  );
};

export default Calendar;
