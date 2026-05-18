const YOUTUBE_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/;
const INSTAGRAM_REGEX = /instagram\.com\/(p|reel|tv)\/([^/?]+)/;
const TIKTOK_REGEX = /tiktok\.com\/@[^/]+\/video\/(\d+)/;

export const getYoutubeVideoId = (url: string): string | null => {
  const match = url.match(YOUTUBE_REGEX);
  return match ? match[1] : null;
};

const getInstagramEmbedUrl = (url: string): string | null => {
  const match = url.match(INSTAGRAM_REGEX);
  if (!match) return null;
  return `https://www.instagram.com/${match[1]}/${match[2]}/embed/`;
};

const getTikTokEmbedUrl = (url: string): string | null => {
  const match = url.match(TIKTOK_REGEX);
  if (!match) return null;
  return `https://www.tiktok.com/embed/v2/${match[1]}`;
};

export const getEmbedUrl = (
  platform: string,
  url: string,
): string | null => {
  if (platform === "instagram") return getInstagramEmbedUrl(url);
  if (platform === "tiktok") return getTikTokEmbedUrl(url);
  return null;
};
