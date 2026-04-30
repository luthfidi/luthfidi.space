export type CreationAccount = "filetechno" | "bnccbinus" | "filemagz";
export type CreationPlatform = "instagram" | "tiktok";

export interface CreationMetrics {
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

export interface CreationItem {
  id: number;
  account: CreationAccount;
  platform: CreationPlatform;
  category: string;
  title: string;
  date: string;
  url: string;
  metrics: CreationMetrics;
  linkOnly?: boolean;
}

export type CreationSortBy = "date" | "reach" | "likes" | "shares" | "saves";
