import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import Dashboard from "@/modules/dashboard/components/Dashboard";
import { buildPageMetadata } from "@/common/libs/pageMetadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DashboardPage" });
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/dashboard",
    locale,
  });
}

const DashboardPage = async ({ params }: Props) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DashboardPage" });
  return (
    <Container>
      <PageHeading title={t("title")} description={t("description")} />
      <Dashboard />
    </Container>
  );
};

export default DashboardPage;
