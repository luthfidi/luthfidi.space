"use client";

import { useState, useEffect, useId, useRef } from "react";
import { useTranslations } from "next-intl";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import { HiOutlineArrowSmRight as ViewIcon } from "react-icons/hi";
import { IoClose as CloseIcon } from "react-icons/io5";
import { AchievementItem } from "@/common/types/achievements";

import Image from "@/common/components/elements/Image";
import SpotlightCard from "@/common/components/elements/SpotlightCard";
import Portal from "@/common/components/elements/Portal";
import Link from "next/link";

const AchievementCard = ({
  id,
  name,
  issuing_organization,
  issue_date,
  image,
  type,
  category,
  credential_id,
  url_credential,
}: AchievementItem) => {
  const layoutKey = `${id}-${image}`;
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("AchievementsPage");
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const issueDate = issue_date ? format(parseISO(issue_date), "MMMM yyyy") : "";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Move focus into the modal so screen readers + keyboard users land here
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    // Return focus to the card that opened the modal
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      <motion.div
        ref={triggerRef}
        layoutId={`card-${layoutKey}`}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={t("card.view_details_for", { name })}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        className="h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
      >
        <SpotlightCard className="group flex h-full flex-col overflow-hidden border border-neutral-200 dark:border-neutral-800">
          <div className="relative overflow-hidden">
            <motion.div layoutId={`image-${layoutKey}`}>
              <Image
                src={image}
                alt={name}
                width={500}
                height={250}
                className="min-h-[180px] w-full rounded-t-xl object-cover transition-transform duration-500 group-hover:scale-105 md:h-[170px]"
              />
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-sm font-medium">{t("card.view_detail")}</span>
              <ViewIcon size={20} />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
            <div className="space-y-2">
              <h3 className="line-clamp-2 text-sm font-medium text-neutral-900 dark:text-neutral-200">
                {name}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {issuing_organization}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-[11px] capitalize text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                  {type}
                </span>
                <span className="rounded-full border border-neutral-300 bg-neutral-100 px-2 py-0.5 text-[11px] capitalize text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                  {category}
                </span>
              </div>

              <div className="border-t border-neutral-100 pt-2 dark:border-neutral-800">
                <p className="text-[11px] uppercase text-neutral-400 dark:text-neutral-500">
                  {t("card.issued_on", { date: issueDate })}
                </p>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>

      <Portal>
        <AnimatePresence>
          {isOpen && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            >
              {/* Backdrop Blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              <motion.div
                layoutId={`card-${layoutKey}`}
                className="relative z-[10000] flex max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-neutral-900"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleClose}
                  aria-label={t("card.close")}
                  className="absolute right-4 top-4 z-[10001] rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
                >
                  <CloseIcon size={20} />
                </button>

                <div className="flex flex-col md:flex-row">
                  <div className="w-full bg-neutral-100 dark:bg-neutral-800">
                    <motion.div layoutId={`image-${layoutKey}`}>
                      <Image
                        src={image}
                        alt={name}
                        width={1000}
                        height={700}
                        className="h-full max-h-[70vh] w-full object-contain md:max-h-[85vh]"
                      />
                    </motion.div>
                  </div>

                  <div className="w-90 hidden flex-col border-l border-neutral-200 py-4 pl-8 pr-20 dark:border-neutral-800 md:flex">
                    <h2
                      id={titleId}
                      className="text-lg font-bold text-neutral-900 dark:text-white"
                    >
                      {name}
                    </h2>
                    <p className="mt-2 text-neutral-500">
                      {issuing_organization}
                    </p>
                    <div className="mt-6 space-y-4">
                      <div>
                        <p className="text-xs uppercase text-neutral-400">
                          {t("card.type")}
                        </p>
                        <p className="text-sm capitalize dark:text-neutral-300">
                          {type || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase text-neutral-400">
                          {t("card.category")}
                        </p>
                        <p className="text-sm capitalize dark:text-neutral-300">
                          {category || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase text-neutral-400">
                          {t("card.issue_date")}
                        </p>
                        <p className="text-sm dark:text-neutral-300">
                          {issueDate}
                        </p>
                      </div>
                    </div>

                    {url_credential && (
                      <Link
                        href={url_credential}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex w-fit justify-between gap-2 rounded-full bg-primary px-3 py-3 text-dark transition duration-300 hover:scale-105 hover:bg-primary-400"
                      >
                        <p className="text-sm font-semibold ">{t("card.credential_url")}</p>
                        <ViewIcon size={20} className=" " />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};

export default AchievementCard;
