import achievementsData from "@/data/achievements.json";
import type { AchievementItem } from "@/common/types/achievements";

interface GetAchievementsDataProps {
  category?: string;
  search?: string;
}

const achievements = achievementsData as AchievementItem[];

export const getAchievementsData = async ({
  category,
  search,
}: GetAchievementsDataProps): Promise<AchievementItem[]> => {
  let result = achievements.filter((a) => a.is_show !== false);

  if (category) {
    result = result.filter((a) => a.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter((a) => a.name.toLowerCase().includes(q));
  }
  return result;
};

export const getAchivementTypes = async (): Promise<string[]> => {
  return Array.from(new Set(achievements.map((a) => a.type))).sort();
};

export const getAchivementCategories = async (): Promise<string[]> => {
  return Array.from(new Set(achievements.map((a) => a.category))).sort();
};
