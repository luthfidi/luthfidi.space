import {
  HiOutlineDesktopComputer,
  HiOutlineCode,
  HiOutlineTerminal,
  HiOutlineGlobeAlt,
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
        name: "ASUS Laptop",
        description: "My daily driver for all development work.",
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic mouse for comfortable everyday use.",
      },
    ],
  },
  {
    title: "Editor",
    icon: <HiOutlineCode size={iconSize} />,
    items: [
      {
        name: "Visual Studio Code",
        description: "Primary editor for web and product development.",
        link: "https://code.visualstudio.com",
      },
      {
        name: "Visual Studio",
        description: "For ASP.NET / C# work.",
        link: "https://visualstudio.microsoft.com",
      },
      {
        name: "Dev C++",
        description: "Lightweight editor for C/C++ exercises.",
        link: "https://www.bloodshed.net",
      },
      {
        name: "Eclipse IDE",
        description: "Used for Java coursework and projects.",
        link: "https://www.eclipse.org",
      },
      {
        name: "Remix IDE",
        description: "Browser-based editor for Solidity smart contracts.",
        link: "https://remix.ethereum.org",
      },
    ],
  },
  {
    title: "Terminal",
    icon: <HiOutlineTerminal size={iconSize} />,
    items: [
      {
        name: "Windows Terminal",
        description: "Default terminal multiplexer on Windows.",
      },
      {
        name: "PowerShell",
        description: "Primary shell for scripting and Windows tooling.",
      },
      {
        name: "Git Bash",
        description: "Unix-style shell for Git workflows.",
      },
      {
        name: "Ubuntu",
        description: "Linux environment via WSL for Unix tooling.",
      },
    ],
  },
  {
    title: "Apps",
    icon: <TbApps size={iconSize} />,
    items: [
      {
        name: "Microsoft 365",
        description: "Word, Excel, PowerPoint for documentation and reports.",
      },
      {
        name: "Google Workspace",
        description: "Docs, Sheets, Drive, and Calendar for collaboration.",
        link: "https://workspace.google.com",
      },
      {
        name: "Figma",
        description: "Design and product prototyping.",
        link: "https://figma.com",
      },
      {
        name: "Canva",
        description: "Quick visuals and social media assets.",
        link: "https://canva.com",
      },
      {
        name: "ClickUp",
        description: "Project and task management for client work.",
        link: "https://clickup.com",
      },
      {
        name: "Adobe Premiere Pro",
        description: "Professional video editing.",
        link: "https://www.adobe.com/products/premiere.html",
      },
      {
        name: "CapCut",
        description: "Lightweight editor for short-form content.",
        link: "https://www.capcut.com",
      },
    ],
  },
  {
    title: "Browser",
    icon: <HiOutlineGlobeAlt size={iconSize} />,
    items: [
      {
        name: "Google Chrome",
        description: "Primary browser, DevTools, and Lighthouse audits.",
        link: "https://www.google.com/chrome",
      },
      {
        name: "React Developer Tools",
        description:
          "Browser extension for inspecting React component trees and props.",
        link: "https://react.dev/learn/react-developer-tools",
      },
      {
        name: "Wappalyzer",
        description:
          "Identifies the technology stack of any website at a glance.",
        link: "https://www.wappalyzer.com",
      },
    ],
  },
];
