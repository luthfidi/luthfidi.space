"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  MdDarkMode as DarkModeIcon,
  MdLightMode as LightModeIcon,
} from "react-icons/md";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  // Render a same-shape placeholder before hydration so server and client
  // markup match — useTheme returns undefined on the server, so any
  // theme-dependent rendering causes a hydration mismatch.
  if (!mounted) {
    return (
      <div className="flex items-center justify-center">
        <div className="hidden h-10 w-[5.25rem] rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 lg:block" />
        <div className="h-10 w-10 rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 lg:hidden" />
      </div>
    );
  }

  const isLightMode = resolvedTheme === "light";

  return (
    <div className="flex items-center justify-center">
      <div className="relative hidden items-center gap-2 rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 p-1 dark:border-neutral-700 dark:bg-neutral-800 lg:flex">
        <motion.div
          className="absolute bottom-1 top-1 w-8 rounded-full bg-neutral-300 dark:bg-neutral-700"
          animate={{
            x: isLightMode ? 0 : 40,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />

        <motion.button
          className="relative z-10 flex h-8 w-8 items-center justify-center transition duration-200"
          onClick={() => setTheme("light")}
          aria-label="Switch to light theme"
          aria-pressed={isLightMode}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              color: isLightMode ? "#171717" : "#FFFFFF",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <LightModeIcon size={17} />
          </motion.div>
        </motion.button>

        <motion.button
          className="relative z-10 flex h-8 w-8 items-center justify-center transition duration-200"
          onClick={() => setTheme("dark")}
          aria-label="Switch to dark theme"
          aria-pressed={!isLightMode}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              color: !isLightMode ? "#FFFFFF" : "#737373",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <DarkModeIcon size={17} />
          </motion.div>
        </motion.button>
      </div>

      <button
        className="flex items-center gap-2 rounded-full border-[1.5px] border-neutral-300 bg-neutral-100 p-1 transition duration-200 hover:scale-110 dark:border-neutral-700 dark:bg-neutral-800 lg:hidden"
        onClick={() => setTheme(isLightMode ? "dark" : "light")}
        aria-label={isLightMode ? "Switch to dark theme" : "Switch to light theme"}
      >
        <motion.div
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-300 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-50"
        >
          {isLightMode ? (
            <DarkModeIcon size={17} />
          ) : (
            <LightModeIcon size={17} />
          )}
        </motion.div>
      </button>
    </div>
  );
};

export default ThemeToggle;
