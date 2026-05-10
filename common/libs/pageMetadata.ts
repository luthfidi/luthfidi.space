import type { Metadata } from "next";

import { METADATA } from "@/common/constants/metadata";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  locale: string;
  keywords?: string;
  image?: string;
}

export const buildPageMetadata = ({
  title,
  description,
  path,
  locale,
  keywords,
  image = METADATA.profile,
}: PageMetadataInput): Metadata => {
  const fullTitle = `${title} ${METADATA.exTitle}`;
  const url = `/${locale}${path}`;
  const ogLocale = locale === "id" ? "id_ID" : "en_US";

  return {
    title: fullTitle,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: METADATA.openGraph.siteName,
      locale: ogLocale,
      type: "website",
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: image,
    },
  };
};
