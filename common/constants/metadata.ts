export const getSiteUrl = (): string => {
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  // Priority: explicit DOMAIN → Vercel stable production URL → per-deployment URL
  const raw =
    process.env.DOMAIN ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "";
  if (!raw) return "http://localhost:3000";
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  // Strip trailing slash to prevent double-slash URLs when concatenating paths.
  return withProtocol.replace(/\/$/, "");
};

const SITE_URL = getSiteUrl();

export const METADATA = {
  creator: "Luthfi Hadi",
  description:
    "Personal website and portfolio of Luthfi Hadi — Computer Science graduate from BINUS University, CTO of Lummy Ticket, and freelance product developer focused on Agile delivery and end-to-end product execution.",
  keyword:
    "luthfi, luthfi hadi, luthfidi, product manager, full stack developer, web3, lummy ticket, computer science, binus, lummy ticket cto",
  authors: {
    name: "Luthfi Hadi",
    url: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    siteName: "Luthfi Hadi",
    locale: "id-ID",
  },
  twitter: {
    handle: "@0xluthfidi",
  },
  exTitle: "| Luthfi Hadi",
  profile: "/images/profile.jpg",
};
