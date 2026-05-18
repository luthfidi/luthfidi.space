import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Creations from "@/modules/creations";
import { buildPageMetadata } from "@/common/libs/pageMetadata";
import {
  getCreationsData,
  getCreationAccounts,
  getCreationCategories,
} from "@/services/creations";

interface CreationsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CreationsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CreationsPage" });

  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/creations",
    locale,
    keywords: "luthfi hadi creations, social media content, instagram, tiktok",
  });
}

const CreationsPage = async ({ params }: CreationsPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CreationsPage" });

  const [creations, accounts, categories] = await Promise.all([
    getCreationsData({}),
    getCreationAccounts(),
    getCreationCategories(),
  ]);

  return (
    <Container>
      <PageHeading title={t("title")} description={t("description")} />
      <Suspense>
        <Creations
          creations={creations}
          accounts={accounts}
          categories={categories}
        />
      </Suspense>
    </Container>
  );
};

export default CreationsPage;
