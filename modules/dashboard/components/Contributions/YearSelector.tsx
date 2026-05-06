"use client";

import cn from "@/common/libs/clsxm";

interface YearSelectorProps {
  value: number | null;
  onChange: (year: number | null) => void;
  earliestYear?: number;
}

const YearSelector = ({ value, onChange, earliestYear }: YearSelectorProps) => {
  const currentYear = new Date().getFullYear();
  const startYear = earliestYear ?? currentYear - 4;
  const years: number[] = [];
  for (let y = currentYear; y >= startYear; y -= 1) {
    years.push(y);
  }

  return (
    <div
      role="tablist"
      aria-label="Select contribution year"
      className="flex flex-wrap gap-2"
    >
      {years.map((year) => {
        const isActive = year === value;
        return (
          <button
            key={year}
            role="tab"
            aria-selected={isActive}
            type="button"
            // Click an active year again to go back to rolling 12 months.
            onClick={() => onChange(isActive ? null : year)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              isActive
                ? "border-primary bg-primary text-white"
                : "border-neutral-300 text-neutral-700 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500",
            )}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
};

export default YearSelector;
