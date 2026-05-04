import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Uses from "@/modules/uses";
import { METADATA } from "@/common/constants/metadata";

interface UsesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: UsesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "UsesPage" });

  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: t("description"),
    keywords: "uses, hardware, editor, tools, luthfi hadi",
    alternates: {
      canonical: `/${locale}/uses`,
    },
  };
}

const UsesPage = async ({ params }: UsesPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "UsesPage" });

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Uses />
    </Container>
  );
};

export default UsesPage;
