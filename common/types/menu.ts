import type { ReactNode } from "react";

export type MenuItemProps = {
  title: string;
  href: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
  isShow?: boolean;
  isExternal: boolean;
  eventName?: string;
  isHover?: boolean;
  children?: React.ReactNode
  isExclusive?: boolean;
};
