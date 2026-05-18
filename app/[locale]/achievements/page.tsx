import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Achievements from "@/modules/achievements";
import { buildPageMetadata } from "@/common/libs/pageMetadata";
import {
  getAchievementsData,
  getAchivementCategories,
  getAchivementTypes,
} from "@/services/achievements";

interface AchievementsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AchievementsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AchievementsPage" });

  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/achievements",
    locale,
    keywords: "software engineer achievements, certificates, luthfi hadi",
  });
}

const AchievementsPage = async ({ params }: AchievementsPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AchievementsPage" });

  const [achievements, categories, types] = await Promise.all([
    getAchievementsData({}),
    getAchivementCategories(),
    getAchivementTypes(),
  ]);

  return (
    <Container>
      <PageHeading title={t("title")} description={t("description")} />
      <Suspense>
        <Achievements
          achievements={achievements}
          categories={categories}
          types={types}
        />
      </Suspense>
    </Container>
  );
};

export default AchievementsPage;
