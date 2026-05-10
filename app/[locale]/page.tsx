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

  return {
    title: `${METADATA.creator} | Portfolio`,
    description: t("resume.paragraph_1"),
    alternates: {
      canonical: `/${locale}`,
    },
    openGraph: {
      title: `${METADATA.creator} | Personal Website`,
      description: t("resume.paragraph_1"),
      url: `/${locale}`,
      siteName: METADATA.openGraph.siteName,
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${METADATA.creator} | Personal Website`,
      description: t("resume.paragraph_1"),
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
