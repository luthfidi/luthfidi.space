import { Metadata } from "next";

import BackButton from "@/common/components/elements/BackButton";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import ProjectDetail from "@/modules/projects/components/ProjectDetail";
import { ProjectItem } from "@/common/types/projects";
import { METADATA, getSiteUrl } from "@/common/constants/metadata";
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
  const isId = locale === "id";
  const localizedDescription =
    isId && projects?.description_id
      ? projects.description_id
      : projects?.description;
  const localizedContent =
    isId && projects?.content_id ? projects.content_id : projects?.content;
  const response = {
    ...projects,
    description: localizedDescription,
    content: localizedContent,
  };
  return JSON.parse(JSON.stringify(response));
};

export const generateMetadata = async ({
  params,
}: ProjectDetailPageProps): Promise<Metadata> => {
  const { slug, locale: rawLocale } = await params;
  const locale = rawLocale || "en";
  const project = await getProjectDetail(slug, locale);

  const path = `/${locale}/projects/${slug}`;

  return {
    title: `${project.title} ${METADATA.exTitle}`,
    description: project.description,
    keywords: `${project.title}, ${project.stacks?.join(", ") ?? ""}, luthfi hadi`,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/projects/${slug}`,
        id: `/id/projects/${slug}`,
        "x-default": `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image,
      url: path,
      siteName: METADATA.openGraph.siteName,
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? "en_US" : "id_ID",
      type: "article",
      authors: [METADATA.creator],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.image,
      creator: METADATA.twitter.handle,
      site: METADATA.twitter.handle,
    },
  };
};

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { slug, locale: rawLocale } = await params;
  const locale = rawLocale || "en";
  const data = await getProjectDetail(slug, locale);

  const siteUrl = getSiteUrl();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    image: data.image,
    author: {
      "@type": "Person",
      name: METADATA.creator,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: METADATA.creator,
      url: siteUrl,
    },
    inLanguage: locale,
    mainEntityOfPage: `${siteUrl}/${locale}/projects/${slug}`,
  };

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BackButton url="/projects" />
      <PageHeading title={data?.title} description={data?.description} />
      <ProjectDetail {...data} />
    </Container>
  );
};

export default ProjectDetailPage;
