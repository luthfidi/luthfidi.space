import ComboBoxFilter from "@/common/components/elements/ComboBoxFilter";

import InputSearch from "./InputSearch";

interface FilterHeaderProps {
  categoryOptions: string[];
  typeOptions: string[];
  totalData?: number;
}

const FilterHeader = ({
  categoryOptions,
  typeOptions,
  totalData,
}: FilterHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
        <InputSearch />
        <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
          <ComboBoxFilter
            data={typeOptions}
            paramKey="type"
            placeholder="Filter by Type"
            clearLabel="All Types"
            umamiEvent="click_filter_achievements_type"
          />

          <ComboBoxFilter
            data={categoryOptions}
            paramKey="category"
            placeholder="Filter by Category"
            clearLabel="All Categories"
            umamiEvent="click_filter_achievements_category"
          />
        </div>
      </div>
      <div className="ml-1 text-sm text-neutral-500 dark:text-neutral-400">
        Total: {totalData}
      </div>
    </div>
  );
};

export default FilterHeader;
