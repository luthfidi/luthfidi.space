import type { MetadataRoute } from "next";

import projectsData from "@/data/projects.json";
import type { ProjectItem } from "@/common/types/projects";
import { getSiteUrl } from "@/common/constants/metadata";

const STATIC_PATHS = [
  "",
  "/about",
  "/projects",
  "/creations",
  "/achievements",
  "/dashboard",
  "/uses",
  "/contact",
];

const LOCALES = ["en", "id"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })),
  );

  const projects = (projectsData as ProjectItem[]).filter((p) => p.is_show);
  const projectEntries: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    projects.map((project) => ({
      url: `${siteUrl}/${locale}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticEntries, ...projectEntries];
}
