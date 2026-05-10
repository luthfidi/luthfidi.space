import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/common/components/elements/Container";
import PageHeading from "@/common/components/elements/PageHeading";
import About from "@/modules/about";
import { buildPageMetadata } from "@/common/libs/pageMetadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return buildPageMetadata({
    title: t("title"),
    description: t("description"),
    path: "/about",
    locale,
  });
}

const AboutPage = async ({ params }: Props) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  return (
    <Container>
      <PageHeading title={t("title")} description={t("description")} />
      <About />
    </Container>
  );
};

export default AboutPage;
