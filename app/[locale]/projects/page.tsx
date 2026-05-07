import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Projects from "@/modules/projects";
import ProjectSkeleton from "@/modules/projects/components/ProjectSkeleton";
import { METADATA } from "@/common/constants/metadata";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: t("description"),
    keywords: "portfolio frontend developer, full stack developer, luthfi hadi",
    alternates: {
      canonical: `/${locale}/projects`,
    },
  };
}

const ProjectsPage = async ({ params }: ProjectsPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Suspense
        fallback={
          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            aria-label="Loading projects"
            aria-busy="true"
          >
            {[...Array(4)].map((_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        }
      >
        <Projects />
      </Suspense>
    </Container>
  );
};

export default ProjectsPage;
