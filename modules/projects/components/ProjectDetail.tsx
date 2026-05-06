import { useTranslations } from "next-intl";
import { HiOutlinePlay as PlayIcon } from "react-icons/hi";

import Tooltip from "@/common/components/elements/Tooltip";
import Image from "@/common/components/elements/Image";
import MDXComponent from "@/common/components/elements/MDXComponent";
import { ProjectItem } from "@/common/types/projects";
import { STACKS } from "@/common/constants/stacks";

import ProjectLink from "./ProjectLink";

const getYoutubeVideoId = (url: string): string | null => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
};

const ProjectDetail = ({
  title,
  image,
  stacks,
  link_demo,
  link_github,
  link_video,
  content,
}: ProjectItem) => {
  const t = useTranslations("ProjectsPage");
  const videoId = link_video ? getYoutubeVideoId(link_video) : null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-between gap-5 sm:flex-row lg:flex-row lg:items-start">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mb-1 text-sm text-neutral-700 dark:text-neutral-300">
            {t("tech_stack")} :{" "}
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {(stacks ?? []).map((stack: string, index: number) => {
              const stackData = STACKS[stack];

              if (!stackData) {
                return (
                  <Tooltip title={stack} key={index}>
                    <span className="rounded-full border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                      {stack}
                    </span>
                  </Tooltip>
                );
              }

              return (
                <Tooltip title={stack} key={index}>
                  <div className={`${stackData.color}`}>{stackData.icon}</div>
                </Tooltip>
              );
            })}
          </div>
        </div>
        <ProjectLink
          title={title}
          link_demo={link_demo || ""}
          link_github={link_github || ""}
        />
      </div>

      <div className="overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={1000}
          height={400}
          className="transition duration-500 hover:scale-[1.04]"
        />
      </div>

      {videoId && link_video && (
        <a
          href={link_video}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-xl"
          aria-label={`Watch ${title} demo video`}
        >
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={`${title} demo video thumbnail`}
            width={1000}
            height={563}
            className="w-full transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/50">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
              <PlayIcon size={32} className="ml-1" />
            </span>
          </div>
          <div className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
            Watch demo video
          </div>
        </a>
      )}

      {content ? (
        <div className="mt-5 space-y-6 leading-[1.8] dark:text-neutral-300">
          <MDXComponent>{content}</MDXComponent>
        </div>
      ) : null}
    </div>
  );
};

export default ProjectDetail;
