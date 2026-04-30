import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LuChevronsUpDown as ArrowIcon } from "react-icons/lu";
import { TiTick as ActiveIcon } from "react-icons/ti";
import { AnimatePresence, motion } from "motion/react";

import cn from "@/common/libs/clsxm";
import Button from "@/common/components/elements/Button";

interface comboBoxFilterProps {
  data: string[];
  paramKey?: string;
  placeholder?: string;
  formatLabel?: (item: string) => string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const ComboBoxFilter = ({
  data,
  paramKey,
  placeholder,
  formatLabel,
  value,
  onChange,
  className,
}: comboBoxFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const comboBoxRef = useRef<HTMLDivElement>(null);

  const isControlled = onChange !== undefined;
  const currentParams = paramKey ? searchParams.get(paramKey) : null;
  const selectValue = isControlled ? value ?? "" : currentParams || "";

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (newValue: string) => {
    const finalValue = selectValue === newValue ? "" : newValue;

    if (isControlled) {
      onChange(finalValue);
    } else if (paramKey) {
      const params = new URLSearchParams(searchParams.toString());

      if (finalValue) {
        params.set(paramKey, finalValue);
      } else {
        params.delete(paramKey);
      }

      router.push(`${pathname}?${params.toString()}`);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        comboBoxRef.current &&
        !comboBoxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={comboBoxRef}
      className={cn("relative w-full md:w-[230px]", className)}
    >
      <Button
        className="flex w-full items-center justify-between gap-4 bg-neutral-100 p-2 text-neutral-900 outline outline-neutral-300 hover:bg-neutral-300 dark:bg-neutral-900 dark:text-neutral-400 dark:outline-neutral-700 dark:hover:bg-neutral-800"
        onClick={handleClickOpen}
        data-umami-event="click_filter_achievements"
      >
        <span className="text-sm ">
          {selectValue
            ? formatLabel
              ? formatLabel(selectValue)
              : data?.find((item) => item === selectValue)
            : placeholder}
        </span>
        <ArrowIcon
          className={cn("transition duration-200", isOpen && "scale-125")}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 0 }}
            className="absolute left-0 top-12 z-10 w-full"
          >
            <div className="w-full rounded-md  bg-neutral-100 outline outline-neutral-300 dark:bg-neutral-900 dark:outline-neutral-600">
              <div className="p-1">
                {data?.length === 0 && (
                  <div className="px-4 py-2 text-center text-sm text-neutral-900 dark:text-neutral-50">
                    No options.
                  </div>
                )}

                {data?.map((item, index) => (
                  <button
                    key={index}
                    className="grid w-full grid-cols-[1.5rem_1fr] items-center rounded-[4px] p-2 text-neutral-900 hover:bg-neutral-300 dark:text-neutral-50 dark:hover:bg-neutral-800"
                    onClick={() => handleSelect(item)}
                  >
                    {item === selectValue && <ActiveIcon />}
                    <span className="col-start-2 flex justify-start text-sm capitalize">
                      {formatLabel ? formatLabel(item) : item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComboBoxFilter;
