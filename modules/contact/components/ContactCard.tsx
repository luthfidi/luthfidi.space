import Link from "next/link";
import { useTranslations } from "next-intl";

import { SocialMediaProps } from "@/common/types/socialMedia";
import SpotlightCard from "@/common/components/elements/SpotlightCard";

const ContactCard = ({
  name,
  handle,
  href,
  icon,
  backgroundIcon,
  backgroundGradientColor,
  borderColor,
  textColor,
  colSpan,
}: SocialMediaProps) => {
  const t = useTranslations("ContactPage");

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${name}`}
      data-umami-event={`click_contact_${name}`}
      className="block transition-transform duration-300 hover:-translate-y-0.5"
    >
      <SpotlightCard
        className={`relative grid w-full grid-cols-[2.5fr_1fr] overflow-hidden rounded-md border-2 border-neutral-300 p-5 dark:border-neutral-700 md:p-6 ${colSpan} ${backgroundGradientColor}`}
      >
        <div className="pointer-events-none absolute -left-14 -top-14 text-neutral-50/10">
          {backgroundIcon}
        </div>

        <div className={`${textColor} z-10 flex flex-col justify-between gap-y-2`}>
          <h4 className="text-lg font-semibold tracking-wide">
            {t(`social_media.${name}.title`)}
          </h4>
          <p className="break-all text-xs opacity-90">{handle}</p>
        </div>

        <div className="flex items-end justify-end">
          <div
            className={`rounded-2xl border-2 p-3 ${textColor} ${borderColor}`}
          >
            {icon}
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
};

export default ContactCard;
