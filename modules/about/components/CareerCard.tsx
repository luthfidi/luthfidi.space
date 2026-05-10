"use client";

import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import * as Flags from "country-flag-icons/react/3x2";
import {
  BsListCheck as ResponsibilityIcon,
  BsBuildings as CompanyIcon,
  BsLightbulb as LearnIcon,
} from "react-icons/bs";
import { HiChevronRight as ChevronIcon } from "react-icons/hi";
import { HiOutlineRocketLaunch as ImpactIcon } from "react-icons/hi2";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { differenceInMonths, differenceInYears, format } from "date-fns";

import SpotlightCard from "@/common/components/elements/SpotlightCard";
import { parseFlagFromText } from "@/common/libs/parseFlag";
import { CareerProps } from "@/common/types/careers";

const CareerCard = ({
  position,
  company,
  logo,
  location,
  start_date,
  end_date,
  link,
  type,
  location_type,
  responsibilities,
  lessons_learned,
  impact,
}: CareerProps) => {
  const [isShowDetails, setIsShowDetails] = useState(false);

  const t = useTranslations("AboutPage.career");

  const startDate = new Date(start_date);
  const endDate = end_date ? new Date(end_date) : new Date();

  const durationYears = differenceInYears(endDate, startDate);
  const durationMonths = differenceInMonths(endDate, startDate) % 12;

  const yearText = durationYears > 1 ? t("years") : t("year");
  const monthText = durationMonths > 1 ? t("months") : t("month");

  let durationText = "";
  if (durationYears > 0) {
    durationText += `${durationYears} ${yearText} `;
  }
  if (durationMonths > 0 || durationYears === 0) {
    durationText += `${durationMonths} ${monthText}`;
  }

  const detailsText = t("details");
  const learnedLabel = t("what_i_learned");
  const impactLabel = t("impact");
  const responsibilityLabel = t("responsibilities");

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setIsShowDetails(!isShowDetails)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setIsShowDetails(!isShowDetails)}
      className="cursor-pointer"
    >
    <SpotlightCard className="flex items-start gap-4 p-5 md:gap-5 md:p-6">
      {logo ? (
        <Image
          width={75}
          height={75}
          src={logo}
          alt={company}
          className="h-[60px] w-[60px] shrink-0 rounded-lg border-[1.5px] border-neutral-300 bg-neutral-100 dark:border-neutral-700 md:h-[75px] md:w-[75px]"
        />
      ) : (
        <CompanyIcon className="h-[60px] w-[60px] shrink-0 text-neutral-500 md:h-[75px] md:w-[75px]" />
      )}

      <div className="w-full space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h5>{position}</h5>
          <div className="flex shrink-0 items-center gap-0.5 text-xs text-neutral-400 dark:text-neutral-500">
            <span>{detailsText}</span>
            <motion.span
              animate={{ rotate: isShowDetails ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="inline-block"
            >
              <ChevronIcon size={15} />
            </motion.span>
          </div>
        </div>
        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link href={link || "#"} target="_blank" onClick={(e) => e.stopPropagation()}>
              <span className="cursor-pointer hover:text-neutral-900 hover:underline hover:dark:text-neutral-50">
                {company}
              </span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="flex items-center gap-1">
              {(() => {
                const { code, cleanText } = parseFlagFromText(location);
                const FlagComp = code ? Flags[code as keyof typeof Flags] : null;
                return (
                  <>
                    {cleanText}
                    {FlagComp && <FlagComp className="h-2.5 w-3.5 shrink-0 rounded-sm" />}
                  </>
                );
              })()}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
            <div className="flex gap-1 text-neutral-600 dark:text-neutral-400">
              <span>{format(startDate, "MMM yyyy")}</span> -{" "}
              <span>{end_date ? format(endDate, "MMM yyyy") : "Present"}</span>
            </div>

            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="text-neutral-500">{durationText}</span>

            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="text-neutral-600 dark:text-neutral-400">
              {type}
            </span>

            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="text-neutral-600 dark:text-neutral-400">
              {location_type}
            </span>
          </div>

          <AnimatePresence>
              {isShowDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 py-3 leading-normal text-neutral-600 dark:text-neutral-400">
                    {/* Responsibilities Section */}
                    {responsibilities && responsibilities.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-semibold text-primary">
                          <ResponsibilityIcon size={16} />
                          <span className="text-xs uppercase tracking-wider">
                            {responsibilityLabel}
                          </span>
                        </div>
                        <ul className="space-y-1 text-xs leading-relaxed opacity-90">
                          {responsibilities.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="font-bold text-neutral-700 dark:text-neutral-300">
                                ✓
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Lessons Learned & Impact Grid */}
                    <div className="grid grid-cols-1 gap-4 dark:border-neutral-800 sm:grid-cols-2 md:mt-4 md:border-t md:border-neutral-200 md:pt-4">
                      {/* What I Learned */}
                      {lessons_learned && lessons_learned.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 font-semibold text-primary">
                            <LearnIcon size={16} />
                            <span className="text-xs uppercase tracking-wider">
                              {learnedLabel}
                            </span>
                          </div>
                          <ul className="space-y-1 text-xs leading-relaxed opacity-90">
                            {lessons_learned.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <span className="font-bold text-neutral-700 dark:text-neutral-300">
                                  ✓
                                </span>{" "}
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Impact */}
                      {impact && impact.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 font-semibold text-primary dark:text-primary">
                            <ImpactIcon size={16} />
                            <span className="text-xs uppercase tracking-wider ">
                              {impactLabel}
                            </span>
                          </div>
                          <ul className="space-y-1 text-xs leading-relaxed opacity-90">
                            {impact.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <span className="font-bold text-neutral-700 dark:text-neutral-300">
                                  ✓
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </div>
    </SpotlightCard>
    </div>
  );
};

export default CareerCard;
