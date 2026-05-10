import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Uses from "@/modules/uses";
import { buildPageMetadata } from "@/common/libs/pageMetadata";

interface UsesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: UsesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "UsesPage" });

  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/uses",
    locale,
    keywords: "uses, hardware, editor, tools, luthfi hadi",
  });
}

const UsesPage = async ({ params }: UsesPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "UsesPage" });

  return (
    <Container>
      <PageHeading title={t("title")} description={t("description")} />
      <Uses />
    </Container>
  );
};

export default UsesPage;
