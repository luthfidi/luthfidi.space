"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import type { MouseEventHandler, PropsWithChildren } from "react";

interface SpotlightCardProps extends PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

const SPRING_CONFIG = { damping: 25, stiffness: 180, mass: 0.4 };
const DEFAULT_DARK_SPOTLIGHT = "rgba(255, 255, 255, 0.10)";
const DEFAULT_LIGHT_SPOTLIGHT = "rgba(0, 0, 0, 0.30)";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor,
}: SpotlightCardProps) => {
  const { resolvedTheme } = useTheme();
  const effectiveColor: string =
    spotlightColor ??
    (resolvedTheme === "light" ? DEFAULT_LIGHT_SPOTLIGHT : DEFAULT_DARK_SPOTLIGHT);
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, SPRING_CONFIG);
  const y = useSpring(mouseY, SPRING_CONFIG);

  const background = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, ${effectiveColor}, transparent 80%)`;

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      mouseX.set(nx);
      mouseY.set(ny);
      x.jump(nx);
      y.jump(ny);
    }
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border-[1.5px] border-neutral-300 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{ opacity, background }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
