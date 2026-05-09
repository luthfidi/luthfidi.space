import { motion } from "motion/react";
import Link from "next/link";
import { HiOutlineDocumentText as CvIcon } from "react-icons/hi2";

import { MENU_ITEMS } from "@/common/constants/menu";
import { useMenu } from "@/common/stores/menu";

import Breakline from "../../elements/Breakline";

import Menu from "./Menu";

const MobileMenu = () => {
  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
  const { hideMenu } = useMenu();

  return (
    <motion.div
      className="my-3 flex flex-col"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Breakline />
      <Menu list={filteredMenu} />
      <Breakline />
      <Link
        href="/files/Luthfi-Hadi-CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={hideMenu}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-neutral-700 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
      >
        <CvIcon size={20} />
        <span className="flex-grow">View CV</span>
      </Link>
    </motion.div>
  );
};

export default MobileMenu;
