"use client";

import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface FollowingCursorProps {
  name?: string;
  color?: string;
}

const PRESS_SPRING = { type: "spring" as const, stiffness: 300, damping: 22 };

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [data-cursor-interactive], input[type="submit"], input[type="button"], input[type="checkbox"], input[type="radio"], select, label, summary, [tabindex]:not([tabindex="-1"])';

const isInteractive = (target: EventTarget | null): boolean => {
  if (!(target instanceof Element)) return false;
  return !!target.closest(INTERACTIVE_SELECTOR);
};

const FollowingCursor = ({
  name = "Guest",
  color = "#60a5fa",
}: FollowingCursorProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isOverIframe, setIsOverIframe] = useState(false);
  const [active, setActive] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    setActive(true);

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setIsVisible(true);
      }
    };
    const handleMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };
    const handleMouseEnter = () => {
      visibleRef.current = true;
      setIsVisible(true);
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      setIsOverIframe(target instanceof Element && target.tagName === "IFRAME");
      setIsHovering(isInteractive(target));
    };
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    document.documentElement.classList.add("custom-cursor-active");
    document.documentElement.style.setProperty("cursor", "none", "important");
    document.body.style.setProperty("cursor", "none", "important");

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      document.documentElement.style.removeProperty("cursor");
      document.body.style.removeProperty("cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [x, y]);

  if (!active) return null;

  return (
    <AnimatePresence>
      {isVisible && !isOverIframe && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[2147483647] will-change-transform"
          style={{ x, y }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            scale: isPressed ? 0.92 : isHovering ? 1.15 : 1,
            opacity: 1,
          }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={PRESS_SPRING}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill={color}
            stroke="white"
            strokeWidth="1"
            className="-translate-x-[5px] -rotate-[70deg] transform"
          >
            <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
          </svg>
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            style={{ backgroundColor: color }}
            className="ml-3 mt-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium text-white shadow-md"
          >
            {name}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FollowingCursor;
