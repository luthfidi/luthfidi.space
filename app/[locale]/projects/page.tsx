import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Projects from "@/modules/projects";
import { buildPageMetadata } from "@/common/libs/pageMetadata";
import { getProjectsData } from "@/services/projects";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/projects",
    locale,
    keywords: "portfolio frontend developer, full stack developer, luthfi hadi",
  });
}

const ProjectsPage = async ({ params }: ProjectsPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  const projects = await getProjectsData();
  const sorted = [...projects].sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1;
    if (!a.is_featured && b.is_featured) return 1;
    if (a.is_featured && b.is_featured) return a.id - b.id;
    return b.id - a.id;
  });

  return (
    <Container>
      <PageHeading title={t("title")} description={t("description")} />
      <Projects projects={sorted} />
    </Container>
  );
};

export default ProjectsPage;
