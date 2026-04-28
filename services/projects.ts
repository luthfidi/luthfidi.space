import projectsData from "@/data/projects.json";
import type { ProjectItem } from "@/common/types/projects";

const projects = projectsData as ProjectItem[];

export const getProjectsData = async (): Promise<ProjectItem[]> => {
  return projects.filter((p) => p.is_show);
};

export const getProjectsDataBySlug = async (
  slug: string,
): Promise<ProjectItem | null> => {
  return projects.find((p) => p.slug === slug) ?? null;
};
