"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounceValue } from "usehooks-ts";
import { FiSearch as SearchIcon } from "react-icons/fi";

const InputSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialSearch = searchParams.get("search") || "";

  const [inputValue, setInputValue] = useState(initialSearch);
  const [debouncedValue] = useDebounceValue(inputValue, 1000);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const searchValue = debouncedValue.trim();
    const currentSearch = searchParams.get("search") || "";

    if (searchValue !== currentSearch) {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    }
  }, [debouncedValue, searchParams, router, pathname]);

  return (
    <div className="flex w-full items-center gap-2 rounded-lg bg-neutral-50 p-2 outline outline-neutral-300 focus:outline-neutral-400 dark:bg-neutral-900 dark:outline-neutral-700 md:w-fit">
      <SearchIcon className="text-neutral-500" size={17} />
      <input
        type="search"
        placeholder="Search..."
        value={inputValue}
        className="w-full bg-transparent pr-2 text-sm outline-none placeholder:text-neutral-500"
        onChange={handleChange}
        data-umami-event="input_search"
      />
    </div>
  );
};

export default InputSearch;
