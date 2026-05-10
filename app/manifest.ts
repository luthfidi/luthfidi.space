import type { MetadataRoute } from "next";

import { METADATA } from "@/common/constants/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: METADATA.creator,
    short_name: "Luthfi",
    description: METADATA.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#60a5fa",
    icons: [
      {
        src: "/images/profile.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
