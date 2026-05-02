"use client";

import { useTranslations } from "next-intl";
import { HiOutlineBriefcase as CareerIcon } from "react-icons/hi";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import { CAREERS } from "@/common/constants/carreers";

import CareerCard from "./CareerCard";

const CareerList = () => {
  const t = useTranslations("AboutPage.career");

  // Sort: active roles first (by start_date desc), then ended roles (by end_date desc)
  const sortedCareers = CAREERS?.filter((c) => c.isShow).slice().sort((a, b) => {
    const aActive = !a.end_date;
    const bActive = !b.end_date;
    if (aActive !== bActive) return aActive ? -1 : 1;
    if (aActive && bActive) return b.start_date.localeCompare(a.start_date);
    return (b.end_date ?? "").localeCompare(a.end_date ?? "");
  });

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title={t("title")} icon={<CareerIcon />} />
        <SectionSubHeading>
          <p>{t("sub_title")}</p>
        </SectionSubHeading>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sortedCareers?.map((career, index) => (
          <CareerCard key={index} indexCareer={index} {...career} />
        ))}
      </div>
    </section>
  );
};

export default CareerList;
