import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Creations from "@/modules/creations";
import CreationSkeleton from "@/modules/creations/components/CreationSkeleton";
import { METADATA } from "@/common/constants/metadata";

interface CreationsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CreationsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CreationsPage" });

  return {
    title: `${t("title")} ${METADATA.exTitle}`,
    description: t("description"),
    keywords: "luthfi hadi creations, social media content, instagram, tiktok",
    alternates: {
      canonical: `/${locale}/creations`,
    },
  };
}

const CreationsPage = async ({ params }: CreationsPageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CreationsPage" });

  return (
    <Container data-aos="fade-up">
      <PageHeading title={t("title")} description={t("description")} />
      <Suspense
        fallback={
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
            aria-label="Loading creations"
            aria-busy="true"
          >
            {[...Array(6)].map((_, i) => (
              <CreationSkeleton key={i} />
            ))}
          </div>
        }
      >
        <Creations />
      </Suspense>
    </Container>
  );
};

export default CreationsPage;
