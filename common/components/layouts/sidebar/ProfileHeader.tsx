import Link from "next/link";
import { HiOutlineDocumentText as CvIcon } from "react-icons/hi2";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import { useTranslations } from "next-intl";

import ThemeToggle from "./ThemeToggle";
import IntlToggle from "./IntlToggle";
import Tooltip from "../../elements/Tooltip";
import Image from "../../elements/Image";

interface ProfileHeaderProps {
  imageSize: number;
}

const ProfileHeader = ({ imageSize }: ProfileHeaderProps) => {
  const t = useTranslations("Navigation");

  return (
    <div className="flex w-full flex-grow items-center gap-4 lg:flex-col lg:gap-0.5">
      <Image
        src={"/images/profile.jpg"}
        width={imageSize}
        height={imageSize}
        alt="Luthfi Hadi"
        priority
        className="border-2 border-neutral-400 dark:border-neutral-600 lg:hover:scale-105"
        rounded="rounded-full"
      />

      <div className="mt-1 flex items-center gap-2 lg:mt-4">
        <Link href="/" passHref>
          <h2 className="flex-grow text-lg font-medium lg:text-xl">
            Luthfi Hadi
          </h2>
        </Link>

        <Tooltip title="Verified">
          <VerifiedIcon size={18} className="text-blue-400" />
        </Tooltip>
      </div>

      <div className="hidden text-sm text-neutral-600 transition-all duration-300 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-400 lg:flex">
        @luthfidi
      </div>

      <Link
        href="/files/Luthfi-Hadi-CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 hidden items-center gap-1.5 rounded-md border border-neutral-300 px-2.5 py-1 text-xs font-medium text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-200 lg:flex"
      >
        <CvIcon size={14} />
        {t("view_cv")}
      </Link>

      <div className="hidden justify-between gap-6 lg:mt-4 lg:flex">
        <IntlToggle />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ProfileHeader;
