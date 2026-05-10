const FLAG_REGEX = /[\u{1F1E6}-\u{1F1FF}]{2}/gu;

export const parseFlagFromText = (
  text: string,
): { code: string | null; cleanText: string } => {
  const match = text.match(FLAG_REGEX);
  if (!match) return { code: null, cleanText: text };
  const chars = [...match[0]];
  const code = chars
    .map((c) => String.fromCharCode(c.codePointAt(0)! - 0x1f1a5))
    .join("");
  return { code, cleanText: text.replace(FLAG_REGEX, "").trim() };
};
