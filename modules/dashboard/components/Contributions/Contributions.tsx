"use client";

import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { BsGithub as GithubIcon } from "react-icons/bs";
import { useTranslations } from "next-intl";

import Overview from "./Overview";
import Calendar from "./Calendar";
import YearSelector from "./YearSelector";
import Streak from "./Streak";
import TopLanguages from "./TopLanguages";

import SectionHeading from "@/common/components/elements/SectionHeading";
import SectionSubHeading from "@/common/components/elements/SectionSubHeading";
import ContributionsSkeleton from "./ContributionsSkeleton";
import EmptyState from "@/common/components/elements/EmptyState";
import { GITHUB_ACCOUNTS } from "@/common/constants/github";
import { fetcher } from "@/services/fetcher";

interface ContributionsProps {
  endpoint: string;
}

const Contributions = ({ endpoint }: ContributionsProps) => {
  const [year, setYear] = useState<number | null>(null);

  const url = year !== null ? `${endpoint}?year=${year}` : endpoint;
  const { data, isLoading, error } = useSWR(url, fetcher, {
    keepPreviousData: true,
  });

  const contributionCalendar =
    data?.contributionsCollection?.contributionCalendar;

  const earliestYear = data?.createdAt
    ? new Date(data.createdAt).getFullYear()
    : undefined;

  const { github_url, is_active } = GITHUB_ACCOUNTS;
  const t = useTranslations("DashboardPage");

  if (!is_active) return null;

  return (
    <section className="space-y-3">
      <SectionHeading title={t("github.title")} icon={<GithubIcon />} />
      <SectionSubHeading>
        <p>{t("github.sub_title")}</p>
        <Link
          href={github_url}
          target="_blank"
          className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-400"
        >
          @{GITHUB_ACCOUNTS.username}
        </Link>
      </SectionSubHeading>

      {error ? (
        <EmptyState message={t("error")} />
      ) : isLoading && !data ? (
        <ContributionsSkeleton />
      ) : (
        <div className="space-y-4">
          <Overview data={contributionCalendar} />

          {contributionCalendar?.weeks && (
            <Streak weeks={contributionCalendar.weeks} />
          )}

          {data?.topRepos?.nodes && (
            <TopLanguages repos={data.topRepos.nodes} />
          )}

          <Calendar
            data={contributionCalendar}
            rightSlot={
              <YearSelector
                value={year}
                onChange={setYear}
                earliestYear={earliestYear}
              />
            }
          />
        </div>
      )}
    </section>
  );
};

export default Contributions;
