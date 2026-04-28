import creationsData from "@/data/creations.json";
import type {
  CreationItem,
  CreationSortBy,
} from "@/common/types/creations";

interface GetCreationsProps {
  account?: string;
  platform?: string;
  category?: string;
  sortBy?: CreationSortBy;
}

const creations = creationsData as CreationItem[];

export const getCreationsData = async ({
  account,
  platform,
  category,
  sortBy = "date",
}: GetCreationsProps = {}): Promise<CreationItem[]> => {
  let result = [...creations];

  if (account) result = result.filter((c) => c.account === account);
  if (platform) result = result.filter((c) => c.platform === platform);
  if (category) result = result.filter((c) => c.category === category);

  if (sortBy === "date") {
    result.sort((a, b) => b.date.localeCompare(a.date));
  } else {
    result.sort((a, b) => b.metrics[sortBy] - a.metrics[sortBy]);
  }

  return result;
};

export const getCreationCategories = async (): Promise<string[]> => {
  return Array.from(new Set(creations.map((c) => c.category))).sort();
};

export const getCreationAccounts = async (): Promise<string[]> => {
  return Array.from(new Set(creations.map((c) => c.account))).sort();
};
