import type { ReactNode } from "react";

export type SocialMediaProps = {
  name: string;
  handle: string;
  href: string;
  icon: ReactNode;
  backgroundIcon?: ReactNode;
  isShow?: boolean;
  isExternal?: boolean;
  backgroundColor?: string;
  backgroundGradientColor?: string;
  borderColor?: string;
  textColor?: string;
  colSpan?: string;
};
