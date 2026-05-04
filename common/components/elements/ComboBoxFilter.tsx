"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useId,
  useMemo,
  KeyboardEvent,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LuChevronsUpDown as ArrowIcon } from "react-icons/lu";
import { TiTick as ActiveIcon } from "react-icons/ti";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import cn from "@/common/libs/clsxm";

interface ComboBoxFilterProps {
  data: string[];
  paramKey?: string;
  placeholder?: string;
  formatLabel?: (item: string) => string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  umamiEvent?: string;
  /** Show a "clear filter" item at the top of the list. Default: true. */
  clearable?: boolean;
  /** Label for the clear-filter item. Default: "All". */
  clearLabel?: string;
}

type Item = { value: string; label: string; isClear?: boolean };

const ComboBoxFilter = ({
  data,
  paramKey,
  placeholder,
  formatLabel,
  value,
  onChange,
  className,
  umamiEvent,
  clearable = true,
  clearLabel = "All",
}: ComboBoxFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const id = useId();
  const listboxId = `${id}-listbox`;
  const optionId = (i: number) => `${id}-option-${i}`;

  const isControlled = onChange !== undefined;
  const currentParams = paramKey ? searchParams.get(paramKey) : null;
  const selectValue = isControlled ? value ?? "" : currentParams || "";

  const items = useMemo<Item[]>(() => {
    const dataItems: Item[] = (data ?? []).map((item) => ({
      value: item,
      label: formatLabel ? formatLabel(item) : item,
    }));
    return clearable
      ? [{ value: "", label: clearLabel, isClear: true }, ...dataItems]
      : dataItems;
  }, [data, formatLabel, clearable, clearLabel]);

  const handleSelect = useCallback(
    (newValue: string) => {
      const finalValue = selectValue === newValue ? "" : newValue;

      if (isControlled) {
        onChange(finalValue);
      } else if (paramKey) {
        const params = new URLSearchParams(searchParams.toString());
        if (finalValue) params.set(paramKey, finalValue);
        else params.delete(paramKey);
        router.push(`${pathname}?${params.toString()}`);
      }

      setIsOpen(false);
      triggerRef.current?.focus();
    },
    [
      selectValue,
      isControlled,
      onChange,
      paramKey,
      searchParams,
      pathname,
      router,
    ],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const idx = items.findIndex((item) => item.value === selectValue);
      setActiveIndex(idx >= 0 ? idx : 0);
    } else {
      setActiveIndex(-1);
    }
  }, [isOpen, items, selectValue]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % items.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < items.length) {
          handleSelect(items[activeIndex].value);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(items.length - 1);
        break;
    }
  };

  const motionProps = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.1 },
      }
    : {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.15, ease: "easeOut" as const },
      };

  const triggerLabel = selectValue
    ? formatLabel
      ? formatLabel(selectValue)
      : data?.find((item) => item === selectValue) || placeholder
    : placeholder;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full md:w-[230px]", className)}
    >
      <button
        ref={triggerRef}
        type="button"
        className="flex w-full items-center justify-between gap-4 rounded-lg bg-neutral-100 p-2 text-neutral-900 outline outline-neutral-300 transition-colors hover:bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-400 dark:outline-neutral-700 dark:hover:bg-neutral-800"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={
          isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined
        }
        data-umami-event={umamiEvent}
      >
        <span className="text-sm">{triggerLabel}</span>
        <ArrowIcon
          className={cn("transition duration-200", isOpen && "scale-125")}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...motionProps}
            className="absolute left-0 top-full z-10 mt-1 w-full origin-top"
          >
            <div
              id={listboxId}
              role="listbox"
              className="w-full overflow-hidden rounded-md bg-neutral-100 shadow-lg outline outline-neutral-300 dark:bg-neutral-900 dark:outline-neutral-600"
            >
              {items.length === 0 ? (
                <div className="px-4 py-2 text-center text-sm text-neutral-900 dark:text-neutral-50">
                  No options.
                </div>
              ) : (
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {items.map((item, index) => {
                    const isSelected = item.value === selectValue;
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={`${item.value}-${index}`}
                        id={optionId(index)}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={cn(
                          "grid w-full grid-cols-[1.5rem_1fr] items-center px-3 py-2.5 text-neutral-900 transition-colors hover:bg-neutral-200 dark:text-neutral-50 dark:hover:bg-neutral-800",
                          isActive && "bg-neutral-200 dark:bg-neutral-800",
                          item.isClear &&
                            "text-neutral-600 dark:text-neutral-400",
                        )}
                        onClick={() => handleSelect(item.value)}
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        {isSelected && <ActiveIcon />}
                        <span
                          className={cn(
                            "col-start-2 flex justify-start text-sm",
                            !item.isClear && "capitalize",
                          )}
                        >
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComboBoxFilter;
