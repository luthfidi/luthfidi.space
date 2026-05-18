import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import Home from "@/modules/home";
import { METADATA } from "@/common/constants/metadata";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const title = `${METADATA.creator} | Portfolio`;
  const description = t("resume.paragraph_1");
  const path = `/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        id: "/id",
        "x-default": "/en",
      },
    },
    openGraph: {
      title: `${METADATA.creator} | Personal Website`,
      description,
      url: path,
      siteName: METADATA.openGraph.siteName,
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? "en_US" : "id_ID",
      type: "website",
      images: METADATA.profile,
    },
    twitter: {
      card: "summary_large_image",
      title: `${METADATA.creator} | Personal Website`,
      description,
      images: METADATA.profile,
      creator: METADATA.twitter.handle,
      site: METADATA.twitter.handle,
    },
  };
}

const HomePage = async ({ params }: HomePageProps) => {
  await params;
  return (
    <Container>
      <Home />
    </Container>
  );
};

export default HomePage;
