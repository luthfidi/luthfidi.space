export const getSiteUrl = (): string => {
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  const raw =
    process.env.DOMAIN ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  if (!raw) return "http://localhost:3000";
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
};

const SITE_URL = getSiteUrl();

export const METADATA = {
  creator: "Luthfi Hadi",
  description:
    "Personal website and portfolio of Luthfi Hadi — Computer Science graduate from BINUS University, CTO of Lummy Ticket, and freelance product developer focused on Agile delivery and end-to-end product execution.",
  keyword:
    "luthfi, luthfi hadi, luthfidi, product manager, full stack developer, web3, lummy ticket",
  authors: {
    name: "Luthfi Hadi",
    url: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    siteName: "Luthfi Hadi",
    locale: "id-ID",
  },
  exTitle: "| Luthfi Hadi",
  profile: "/images/profile.jpg",
};
