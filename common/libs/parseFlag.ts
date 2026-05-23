const FLAG_REGEX_SPLIT = /([\u{1F1E6}-\u{1F1FF}]{2})/gu;
const FLAG_REGEX_MATCH = /^[\u{1F1E6}-\u{1F1FF}]{2}$/u;

export type FlaggedSegment =
  | { type: "text"; value: string }
  | { type: "flag"; code: string };

const flagToCountryCode = (flag: string): string => {
  const chars = [...flag];
  return chars
    .map((c) => String.fromCharCode(c.codePointAt(0)! - 0x1f1a5))
    .join("");
};

export const parseFlaggedSegments = (text: string): FlaggedSegment[] => {
  const parts = text.split(FLAG_REGEX_SPLIT);
  return parts
    .filter((part) => part.length > 0)
    .map<FlaggedSegment>((part) => {
      if (FLAG_REGEX_MATCH.test(part)) {
        return { type: "flag", code: flagToCountryCode(part) };
      }
      return { type: "text", value: part };
    });
};
