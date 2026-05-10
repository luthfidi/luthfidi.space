import Image from "next/image";
import * as Flags from "country-flag-icons/react/3x2";
import { BsBuildings as CompanyIcon } from "react-icons/bs";

import { EducationProps } from "@/common/types/education";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { parseFlagFromText } from "@/common/libs/parseFlag";

const EducationCard = ({
  school,
  major,
  logo,
  degree,
  start_year,
  end_year,
  link,
  location,
  GPA,
}: EducationProps) => {
  const { code, cleanText } = parseFlagFromText(location);
  const FlagComp = code ? Flags[code as keyof typeof Flags] : null;

  return (
    <SpotlightCard className="flex items-start gap-4 p-5 md:gap-5 md:p-6">
      {logo ? (
        <Image
          width={75}
          height={75}
          src={logo}
          alt={school}
          className="h-[60px] w-[60px] shrink-0 rounded-lg border-[1.5px] border-neutral-300 bg-neutral-100 dark:border-neutral-700 md:h-[75px] md:w-[75px]"
        />
      ) : (
        <CompanyIcon className="h-[60px] w-[60px] shrink-0 text-neutral-500 md:h-[75px] md:w-[75px]" />
      )}

      <div className="space-y-1">
        <a href={link || "#"} target="_blank">
          <h6>{school}</h6>
        </a>
        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{degree}</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span>{major}</span>
            {GPA && (
              <>
                <span className="text-neutral-300 dark:text-neutral-700">•</span>
                <span>GPA: {GPA}</span>
              </>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px]">
            <span className="dark:text-neutral-500">
              {start_year} - {end_year}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="flex items-center gap-1">
              {cleanText}
              {FlagComp && <FlagComp className="h-2.5 w-3.5 shrink-0 rounded-sm" />}
            </span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default EducationCard;
