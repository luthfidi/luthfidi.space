import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import type { UseSection as UseSectionType } from "@/common/constants/uses";

const UseSection = ({ title, icon, items }: UseSectionType) => (
  <section className="space-y-3">
    <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
      <span>{icon}</span>
      <h2 className="text-base font-semibold">{title}</h2>
    </div>

    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((item, i) => (
        <SpotlightCard
          key={i}
          className="border border-neutral-200 p-4 dark:border-neutral-800"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
              {item.name}
            </h3>
            {item.link && (
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${item.name}`}
                className="text-neutral-500 hover:text-primary"
              >
                <HiOutlineExternalLink size={14} />
              </Link>
            )}
          </div>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            {item.description}
          </p>
        </SpotlightCard>
      ))}
    </div>
  </section>
);

export default UseSection;
