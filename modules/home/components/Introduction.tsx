import { useTranslations } from "next-intl";
import ID from "country-flag-icons/react/3x2/ID";

const Introduction = () => {
  const t = useTranslations("HomePage");

  const paragraphData = [{ index: 1 }, { index: 2 }];

  return (
    <section className="space-y-2 bg-cover bg-no-repeat">
      <div className="text-2xl font-medium text-neutral-900 dark:text-neutral-50 md:text-3xl">
        <h1>{t("intro")}</h1>
      </div>

      <div className="space-y-4">
        <ul className="ml-5 flex list-disc flex-col gap-x-10 gap-y-2 text-neutral-700 dark:text-neutral-400 md:flex-row">
          <li>
            <span className="inline-flex items-center gap-1.5">
              {t("location").replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, "").trim()}
              <ID className="h-2.5 w-3.5 shrink-0 rounded-sm" />
            </span>
          </li>
          <li>{t("location_type")}</li>
        </ul>
        <div className="mt-6 space-y-4 leading-6 text-neutral-600 dark:text-neutral-300 md:leading-7">
          {paragraphData.map((paragraph) => (
            <div key={paragraph.index}>
              {t(`resume.paragraph_${paragraph.index}`)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;
