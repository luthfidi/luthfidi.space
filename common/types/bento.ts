import type { ReactNode } from "react";

export type BentoItemProps = {
  title: string;
  description: string;
  label?: string;
  icon?: ReactNode;
  visual?: React.ReactNode;
  href?: string;
  colSpan?: number;
  className?: string;
  isShow?: boolean;
};
