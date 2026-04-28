import {
  HiOutlineDesktopComputer,
  HiOutlineCode,
  HiOutlineTerminal,
  HiOutlineGlobeAlt,
  HiOutlineCube,
} from "react-icons/hi";
import { TbApps } from "react-icons/tb";

export interface UseItem {
  name: string;
  description: string;
  link?: string;
}

export interface UseSection {
  title: string;
  icon: React.ReactNode;
  items: UseItem[];
}

const iconSize = 22;

export const USES: UseSection[] = [
  {
    title: "Hardware",
    icon: <HiOutlineDesktopComputer size={iconSize} />,
    items: [
      {
        name: "MacBook Pro 14\" (M-series)",
        description: "Daily driver for development.",
      },
      {
        name: "External Monitor",
        description: "Secondary screen for split-view debugging.",
      },
      {
        name: "Mechanical Keyboard",
        description: "Tactile switches for long coding sessions.",
      },
    ],
  },
  {
    title: "Editor",
    icon: <HiOutlineCode size={iconSize} />,
    items: [
      {
        name: "Visual Studio Code",
        description: "Primary editor for everything.",
        link: "https://code.visualstudio.com",
      },
      {
        name: "Cursor",
        description: "AI-assisted editor for heavier features.",
        link: "https://cursor.com",
      },
      {
        name: "Theme: One Dark Pro",
        description: "Long-running favorite color scheme.",
      },
    ],
  },
  {
    title: "Terminal",
    icon: <HiOutlineTerminal size={iconSize} />,
    items: [
      {
        name: "iTerm2",
        description: "Default terminal on macOS.",
        link: "https://iterm2.com",
      },
      {
        name: "Zsh + Oh My Zsh",
        description: "Shell + plugin manager.",
      },
      {
        name: "Starship",
        description: "Cross-shell prompt.",
        link: "https://starship.rs",
      },
    ],
  },
  {
    title: "Apps",
    icon: <TbApps size={iconSize} />,
    items: [
      {
        name: "Notion",
        description: "Notes, knowledge base, planning.",
        link: "https://notion.so",
      },
      {
        name: "Figma",
        description: "Design and prototyping.",
        link: "https://figma.com",
      },
      {
        name: "ClickUp",
        description: "Project and task management.",
        link: "https://clickup.com",
      },
      {
        name: "Slack",
        description: "Team communication.",
        link: "https://slack.com",
      },
    ],
  },
  {
    title: "Browser",
    icon: <HiOutlineGlobeAlt size={iconSize} />,
    items: [
      {
        name: "Arc",
        description: "Daily-driver browser.",
        link: "https://arc.net",
      },
      {
        name: "Chrome",
        description: "For DevTools and Lighthouse.",
        link: "https://www.google.com/chrome",
      },
    ],
  },
  {
    title: "Tech Stack",
    icon: <HiOutlineCube size={iconSize} />,
    items: [
      {
        name: "Next.js + TypeScript",
        description: "Frontend framework and language of choice.",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first styling.",
      },
      {
        name: "Golang (Echo, GORM)",
        description: "Backend services.",
      },
      {
        name: "Solidity / Foundry",
        description: "Smart contract development on Lisk.",
      },
      {
        name: "PostgreSQL",
        description: "Primary database.",
      },
    ],
  },
];
