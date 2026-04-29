import type { ReactNode } from "react";

interface SkillCardProps {
  name: string;
  icon: ReactNode;
  color: string;
}

const SkillCard = ({ name, icon, color }: SkillCardProps) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-xs shadow-sm dark:border-neutral-600 dark:bg-neutral-800">
      <div
        className={`flex h-5 w-5 items-center justify-center [&>svg]:h-5 [&>svg]:w-5 ${color}`}
      >
        {icon}
      </div>
      <span className="whitespace-nowrap">{name}</span>
    </div>
  );
};

export default SkillCard;
