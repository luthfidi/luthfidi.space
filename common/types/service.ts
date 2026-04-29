import type { ReactNode } from "react";

export type ServiceProps = {
  color: string;
  title: string;
  description: string;
  label: string;
  children: React.ReactNode;
  icon?: ReactNode;
  className?: string;
  isShow?: boolean;
};
