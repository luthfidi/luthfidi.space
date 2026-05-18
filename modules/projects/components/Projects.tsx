"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import EmptyState from "@/common/components/elements/EmptyState";
import { ProjectItem } from "@/common/types/projects";

import ProjectCard from "./ProjectCard";

interface ProjectsProps {
  projects: ProjectItem[];
}

const Projects = ({ projects }: ProjectsProps) => {
  const t = useTranslations("ProjectsPage");

  if (projects.length === 0) {
    return <EmptyState message={t("no_data")} />;
  }

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ProjectCard {...project} />
        </motion.div>
      ))}
    </section>
  );
};

export default Projects;
