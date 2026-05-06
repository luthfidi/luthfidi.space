import type { ReactNode } from "react";
import { BiLogoPostgresql } from "react-icons/bi";
import { BsFillBootstrapFill, BsRobot } from "react-icons/bs";
import { TbBrandFramerMotion } from "react-icons/tb";
import { FaNpm, FaGolang, FaJava } from "react-icons/fa6";
import {
  SiCss,
  SiExpress,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiLaravel,
  SiPhp,
  SiRedux,
  SiVuedotjs,
  SiFirebase,
  SiReactrouter,
  SiReacthookform,
  SiReacttable,
  SiMysql,
  SiMongodb,
  SiBun,
  SiYarn,
  SiNestjs,
  SiSupabase,
  SiJest,
  SiDocker,
  SiKotlin,
  SiJetpackcompose,
  SiZod,
  SiShadcnui,
  SiAxios,
  SiChakraui,
  SiDotnet,
  SiSolidity,
  SiRust,
  SiPython,
  SiWordpress,
  SiC,
  SiSwagger,
  SiGin,
  SiTwilio,
} from "react-icons/si";
import { RiShieldKeyholeFill } from "react-icons/ri";

export type SkillCategory =
  | "frontend"
  | "backend"
  | "mobile"
  | "database"
  | "blockchain"
  | "other"
  | "tools";

export type SkillProps = {
  [key: string]: {
    icon: ReactNode;
    background: string;
    color: string;
    isActive?: boolean;
    category?: SkillCategory;
  };
};

const iconSize = 26;

export const STACKS: SkillProps = {
  // ── Frontend: base ──────────────────────────────────────
  HTML: {
    icon: <SiHtml5 size={iconSize} />,
    background: "bg-orange-500",
    color: "text-orange-500",
    isActive: true,
    category: "frontend",
  },
  CSS: {
    icon: <SiCss size={iconSize} />,
    background: "bg-blue-500",
    color: "text-blue-500",
    isActive: true,
    category: "frontend",
  },
  JavaScript: {
    icon: <SiJavascript size={iconSize} />,
    background: "bg-blue-500",
    color: "text-blue-500",
    isActive: true,
    category: "frontend",
  },
  TypeScript: {
    icon: <SiTypescript size={iconSize} />,
    background: "bg-blue-500",
    color: "text-blue-500",
    isActive: true,
    category: "frontend",
  },
  // ── Frontend: CSS frameworks & UI libraries ──────────────
  Bootstrap: {
    icon: <BsFillBootstrapFill size={iconSize} />,
    background: "bg-violet-600",
    color: "text-violet-600",
    isActive: false,
    category: "frontend",
  },
  TailwindCSS: {
    icon: <SiTailwindcss size={iconSize} />,
    background: "bg-sky-400",
    color: "text-sky-400",
    isActive: true,
    category: "frontend",
  },
  "Shadcn UI": {
    icon: <SiShadcnui size={iconSize} />,
    background: "bg-neutral-800",
    color: "text-neutral-800 dark:text-neutral-100",
    isActive: true,
    category: "frontend",
  },
  "Chakra UI": {
    icon: <SiChakraui size={iconSize} />,
    background: "bg-teal-400",
    color: "text-teal-400",
    isActive: true,
    category: "frontend",
  },
  // ── Frontend: React ecosystem ────────────────────────────
  "React.js": {
    icon: <SiReact size={iconSize} />,
    background: "bg-cyan-400",
    color: "text-cyan-400",
    isActive: true,
    category: "frontend",
  },
  "Next.js": {
    icon: <SiNextdotjs size={iconSize} />,
    background: "bg-neutral-800",
    color: "text-neutral-900 dark:text-neutral-100",
    isActive: true,
    category: "frontend",
  },
  Redux: {
    icon: <SiRedux size={iconSize} />,
    background: "bg-violet-500",
    color: "text-violet-500",
    isActive: false,
    category: "frontend",
  },
  "React Router": {
    icon: <SiReactrouter size={iconSize} />,
    background: "bg-red-500",
    color: "text-red-500",
    isActive: false,
    category: "frontend",
  },
  "React Hook Form": {
    icon: <SiReacthookform size={iconSize} />,
    background: "bg-pink-500",
    color: "text-pink-500",
    isActive: false,
    category: "frontend",
  },
  "React Table": {
    icon: <SiReacttable size={iconSize} />,
    background: "bg-rose-600",
    color: "text-rose-600",
    isActive: false,
    category: "frontend",
  },
  TanStack: {
    icon: <img src="/icons/tanstack.png" alt="TanStack" width={iconSize} height={iconSize} className="object-contain" />,
    background: "bg-amber-500",
    color: "",
    isActive: true,
    category: "frontend",
  },
  // ── Frontend: other frameworks & utilities ───────────────
  Vite: {
    icon: <img src="/icons/vite.svg" alt="Vite" width={iconSize} height={iconSize} className="object-contain" />,
    background: "bg-purple-500",
    color: "",
    isActive: true,
    category: "frontend",
  },
  "Astro.js": {
    icon: <img src="/icons/astro.png" alt="Astro.js" width={iconSize} height={iconSize} className="object-contain" />,
    background: "bg-violet-600",
    color: "",
    isActive: true,
    category: "frontend",
  },
  "Vue.js": {
    icon: <SiVuedotjs size={iconSize} />,
    background: "bg-green-400",
    color: "text-green-400",
    isActive: false,
    category: "frontend",
  },
  Axios: {
    icon: <SiAxios size={iconSize} />,
    background: "bg-violet-600",
    color: "text-violet-600",
    isActive: true,
    category: "frontend",
  },
  Zod: {
    icon: <SiZod size={iconSize} />,
    background: "bg-blue-500",
    color: "text-blue-500",
    isActive: true,
    category: "frontend",
  },
  "Framer Motion": {
    icon: <TbBrandFramerMotion size={iconSize} />,
    background: "bg-blue-500",
    color: "text-blue-500",
    isActive: true,
    category: "frontend",
  },
  "NextAuth.js": {
    icon: <RiShieldKeyholeFill size={iconSize} />,
    background: "bg-slate-800",
    color: "text-slate-800",
    isActive: false,
    category: "frontend",
  },
  // ── Backend: Node ecosystem ──────────────────────────────
  "Node.js": {
    icon: <SiNodedotjs size={iconSize} />,
    background: "bg-green-600",
    color: "text-green-600",
    isActive: false,
    category: "backend",
  },
  "Express.js": {
    icon: <SiExpress size={iconSize} />,
    background: "bg-neutral-800",
    color: "text-neutral-900 dark:text-neutral-100",
    isActive: false,
    category: "backend",
  },
  "Nest.js": {
    icon: <SiNestjs size={iconSize} />,
    background: "bg-rose-600",
    color: "text-rose-600",
    isActive: false,
    category: "backend",
  },
  Prisma: {
    icon: <SiPrisma size={iconSize} />,
    background: "bg-teal-500",
    color: "text-teal-500",
    isActive: false,
    category: "backend",
  },
  // ── Backend: PHP ecosystem ───────────────────────────────
  PHP: {
    icon: <SiPhp size={iconSize} />,
    background: "bg-indigo-400",
    color: "text-indigo-400",
    isActive: true,
    category: "backend",
  },
  Laravel: {
    icon: <SiLaravel size={iconSize} />,
    background: "bg-red-700",
    color: "text-red-700",
    isActive: true,
    category: "backend",
  },
  // ── Backend: Go ecosystem ────────────────────────────────
  Go: {
    icon: <FaGolang size={iconSize} />,
    background: "bg-sky-500",
    color: "text-sky-500",
    isActive: true,
    category: "backend",
  },
  "Gin Gonic": {
    icon: <SiGin size={iconSize} />,
    background: "bg-cyan-500",
    color: "text-cyan-500",
    isActive: false,
    category: "backend",
  },
  Swagger: {
    icon: <SiSwagger size={iconSize} />,
    background: "bg-green-500",
    color: "text-green-500",
    isActive: false,
    category: "backend",
  },
  // ── Backend: Integrations ────────────────────────────────
  Twilio: {
    icon: <SiTwilio size={iconSize} />,
    background: "bg-red-500",
    color: "text-red-500",
    isActive: true,
    category: "backend",
  },
  // ── Backend: C# ecosystem ────────────────────────────────
  "C#": {
    icon: <img src="/icons/csharp.svg" alt="C#" width={iconSize} height={iconSize} className="object-contain" />,
    background: "bg-violet-700",
    color: "",
    isActive: true,
    category: "backend",
  },
  "ASP.NET": {
    icon: <SiDotnet size={iconSize} />,
    background: "bg-purple-700",
    color: "text-purple-700",
    isActive: true,
    category: "backend",
  },
  // ── Mobile ───────────────────────────────────────────────
  Kotlin: {
    icon: <SiKotlin size={iconSize} />,
    background: "bg-violet-600",
    color: "text-violet-600",
    isActive: false,
    category: "mobile",
  },
  "Jetpack Compose": {
    icon: <SiJetpackcompose size={iconSize} />,
    background: "bg-cyan-800",
    color: "text-cyan-800",
    isActive: false,
    category: "mobile",
  },
  // ── Database ─────────────────────────────────────────────
  PostgreSql: {
    icon: <BiLogoPostgresql size={iconSize} />,
    background: "bg-blue-500",
    color: "text-blue-500",
    isActive: true,
    category: "database",
  },
  MySql: {
    icon: <SiMysql size={iconSize} />,
    background: "bg-cyan-700",
    color: "text-cyan-700",
    isActive: true,
    category: "database",
  },
  MongoDb: {
    icon: <SiMongodb size={iconSize} />,
    background: "bg-green-600",
    color: "text-green-600",
    isActive: false,
    category: "database",
  },
  Firebase: {
    icon: <SiFirebase size={iconSize} />,
    background: "bg-amber-500",
    color: "text-amber-500",
    isActive: true,
    category: "database",
  },
  Supabase: {
    icon: <SiSupabase size={iconSize} />,
    background: "bg-emerald-500",
    color: "text-emerald-500",
    isActive: true,
    category: "database",
  },
  // ── Blockchain ───────────────────────────────────────────
  Solidity: {
    icon: <SiSolidity size={iconSize} />,
    background: "bg-slate-700",
    color: "text-slate-500 dark:text-slate-300",
    isActive: true,
    category: "blockchain",
  },
  Foundry: {
    icon: <img src="/icons/foundry.png" alt="Foundry" width={iconSize} height={iconSize} className="object-contain" />,
    background: "bg-gray-700",
    color: "",
    isActive: true,
    category: "blockchain",
  },
  Rust: {
    icon: <SiRust size={iconSize} />,
    background: "bg-orange-700",
    color: "text-orange-700",
    isActive: true,
    category: "blockchain",
  },
  // ── Tools ────────────────────────────────────────────────
  Docker: {
    icon: <SiDocker size={iconSize} />,
    background: "bg-blue-500",
    color: "text-blue-500",
    isActive: true,
    category: "tools",
  },
  Github: {
    icon: <SiGithub size={iconSize} />,
    background: "bg-slate-800",
    color: "text-neutral-900 dark:text-neutral-100",
    isActive: true,
    category: "tools",
  },
  Npm: {
    icon: <FaNpm size={iconSize} />,
    background: "bg-red-700",
    color: "text-red-500",
    isActive: true,
    category: "tools",
  },
  Yarn: {
    icon: <SiYarn size={iconSize} />,
    background: "bg-violet-800",
    color: "text-sky-400",
    isActive: false,
    category: "tools",
  },
  bun: {
    icon: <SiBun size={iconSize} />,
    background: "bg-orange-100",
    color: "text-amber-600 dark:text-amber-400",
    isActive: true,
    category: "tools",
  },
  Jest: {
    icon: <SiJest size={iconSize} />,
    background: "bg-pink-600",
    color: "text-pink-600",
    isActive: false,
    category: "tools",
  },
  AI: {
    icon: <BsRobot size={iconSize} />,
    background: "bg-fuchsia-700",
    color: "text-fuchsia-700",
    isActive: false,
    category: "tools",
  },
  // ── Other ────────────────────────────────────────────────
  C: {
    icon: <SiC size={iconSize} />,
    background: "bg-blue-700",
    color: "text-blue-700",
    isActive: true,
    category: "other",
  },
  Java: {
    icon: <FaJava size={iconSize} />,
    background: "bg-red-600",
    color: "text-red-600",
    isActive: true,
    category: "other",
  },
  Python: {
    icon: <SiPython size={iconSize} />,
    background: "bg-blue-500",
    color: "text-blue-500",
    isActive: true,
    category: "other",
  },
  WordPress: {
    icon: <SiWordpress size={iconSize} />,
    background: "bg-blue-500",
    color: "text-blue-500",
    isActive: true,
    category: "other",
  },
};
