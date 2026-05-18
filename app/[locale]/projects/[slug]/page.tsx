import { Metadata } from "next";

import BackButton from "@/common/components/elements/BackButton";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import ProjectDetail from "@/modules/projects/components/ProjectDetail";
import { ProjectItem } from "@/common/types/projects";
import { METADATA } from "@/common/constants/metadata";
import { loadMdxFiles } from "@/common/libs/mdx";
import { getProjectsDataBySlug } from "@/services/projects";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

const getProjectDetail = async (
  slug: string,
  locale: string,
): Promise<ProjectItem> => {
  const projects = await getProjectsDataBySlug(slug);
  const contents = loadMdxFiles();
  const mdxContent = contents.find((item) => item.slug === slug)?.content;
  const isId = locale === "id";
  const localizedDescription =
    isId && projects?.description_id
      ? projects.description_id
      : projects?.description;
  const localizedInlineContent =
    isId && projects?.content_id ? projects.content_id : projects?.content;
  // Prefer MDX file if it exists, otherwise fall back to inline content
  // from projects.json so projects without a separate MDX still render.
  const response = {
    ...projects,
    description: localizedDescription,
    content: mdxContent ?? localizedInlineContent,
  };
  return JSON.parse(JSON.stringify(response));
};

export const generateMetadata = async ({
  params,
}: ProjectDetailPageProps): Promise<Metadata> => {
  const { slug, locale: rawLocale } = await params;
  const locale = rawLocale || "en";
  const project = await getProjectDetail(slug, locale);

  return {
    title: `${project.title} ${METADATA.exTitle}`,
    description: project.description,
    openGraph: {
      images: project.image,
      url: `${METADATA.openGraph.url}/${project.slug}`,
      siteName: METADATA.openGraph.siteName,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "article",
      authors: [METADATA.creator],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.image,
    },
    keywords: project.title,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
    },
  };
};

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { slug, locale: rawLocale } = await params;
  const locale = rawLocale || "en";
  const data = await getProjectDetail(slug, locale);

  return (
    <Container>
      <BackButton url="/projects" />
      <PageHeading title={data?.title} description={data?.description} />
      <ProjectDetail {...data} />
    </Container>
  );
};

export default ProjectDetailPage;
