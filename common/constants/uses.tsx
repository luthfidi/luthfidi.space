import {
  HiOutlineDesktopComputer,
  HiOutlineCode,
  HiOutlineTerminal,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { TbApps } from "react-icons/tb";

export type LocalizedString = { en: string; id: string };

export interface UseItem {
  name: string;
  description: LocalizedString;
  link?: string;
}

export interface UseSection {
  title: LocalizedString;
  icon: React.ReactNode;
  items: UseItem[];
}

const iconSize = 22;

export const USES: UseSection[] = [
  {
    title: { en: "Hardware", id: "Perangkat Keras" },
    icon: <HiOutlineDesktopComputer size={iconSize} />,
    items: [
      {
        name: "ASUS Laptop",
        description: {
          en: "My daily driver for all development work.",
          id: "Daily driver utama untuk semua pekerjaan development.",
        },
      },
      {
        name: "Wireless Mouse",
        description: {
          en: "Ergonomic mouse for comfortable everyday use.",
          id: "Mouse ergonomis untuk kenyamanan pemakaian sehari-hari.",
        },
      },
    ],
  },
  {
    title: { en: "Editor", id: "Editor" },
    icon: <HiOutlineCode size={iconSize} />,
    items: [
      {
        name: "Visual Studio Code",
        description: {
          en: "Primary editor for web and product development.",
          id: "Editor utama untuk pengembangan web dan produk.",
        },
        link: "https://code.visualstudio.com",
      },
      {
        name: "Visual Studio",
        description: {
          en: "For ASP.NET / C# work.",
          id: "Untuk pekerjaan ASP.NET / C#.",
        },
        link: "https://visualstudio.microsoft.com",
      },
      {
        name: "Dev C++",
        description: {
          en: "Lightweight editor for C/C++ exercises.",
          id: "Editor ringan untuk latihan C/C++.",
        },
        link: "https://www.bloodshed.net",
      },
      {
        name: "Eclipse IDE",
        description: {
          en: "Used for Java coursework and projects.",
          id: "Dipakai untuk tugas dan proyek Java.",
        },
        link: "https://www.eclipse.org",
      },
      {
        name: "Remix IDE",
        description: {
          en: "Browser-based editor for Solidity smart contracts.",
          id: "Editor berbasis browser untuk smart contract Solidity.",
        },
        link: "https://remix.ethereum.org",
      },
    ],
  },
  {
    title: { en: "Terminal", id: "Terminal" },
    icon: <HiOutlineTerminal size={iconSize} />,
    items: [
      {
        name: "Windows Terminal",
        description: {
          en: "Default terminal multiplexer on Windows.",
          id: "Terminal default di Windows.",
        },
      },
      {
        name: "PowerShell",
        description: {
          en: "Primary shell for scripting and Windows tooling.",
          id: "Shell utama untuk scripting dan tooling Windows.",
        },
      },
      {
        name: "Git Bash",
        description: {
          en: "Unix-style shell for Git workflows.",
          id: "Shell ala Unix untuk workflow Git.",
        },
      },
      {
        name: "Ubuntu",
        description: {
          en: "Linux environment via WSL for Unix tooling.",
          id: "Environment Linux via WSL untuk tooling Unix.",
        },
      },
    ],
  },
  {
    title: { en: "Apps", id: "Aplikasi" },
    icon: <TbApps size={iconSize} />,
    items: [
      {
        name: "Microsoft 365",
        description: {
          en: "Word, Excel, PowerPoint for documentation and reports.",
          id: "Word, Excel, PowerPoint untuk dokumentasi dan laporan.",
        },
      },
      {
        name: "Google Workspace",
        description: {
          en: "Docs, Sheets, Drive, and Calendar for collaboration.",
          id: "Docs, Sheets, Drive, dan Calendar untuk kolaborasi.",
        },
        link: "https://workspace.google.com",
      },
      {
        name: "Figma",
        description: {
          en: "Design and product prototyping.",
          id: "Desain dan prototyping produk.",
        },
        link: "https://figma.com",
      },
      {
        name: "Canva",
        description: {
          en: "Quick visuals and social media assets.",
          id: "Bikin visual cepat dan aset media sosial.",
        },
        link: "https://canva.com",
      },
      {
        name: "ClickUp",
        description: {
          en: "Project and task management for client work.",
          id: "Manajemen proyek dan task untuk pekerjaan klien.",
        },
        link: "https://clickup.com",
      },
      {
        name: "Adobe Premiere Pro",
        description: {
          en: "Professional video editing.",
          id: "Editing video profesional.",
        },
        link: "https://www.adobe.com/products/premiere.html",
      },
      {
        name: "CapCut",
        description: {
          en: "Lightweight editor for short-form content.",
          id: "Editor ringan untuk konten short-form.",
        },
        link: "https://www.capcut.com",
      },
    ],
  },
  {
    title: { en: "Browser", id: "Browser" },
    icon: <HiOutlineGlobeAlt size={iconSize} />,
    items: [
      {
        name: "Google Chrome",
        description: {
          en: "Primary browser, DevTools, and Lighthouse audits.",
          id: "Browser utama, DevTools, dan audit Lighthouse.",
        },
        link: "https://www.google.com/chrome",
      },
      {
        name: "React Developer Tools",
        description: {
          en: "Browser extension for inspecting React component trees and props.",
          id: "Ekstensi browser untuk inspeksi komponen React dan props-nya.",
        },
        link: "https://react.dev/learn/react-developer-tools",
      },
      {
        name: "Wappalyzer",
        description: {
          en: "Identifies the technology stack of any website at a glance.",
          id: "Mengidentifikasi technology stack website apa saja secara cepat.",
        },
        link: "https://www.wappalyzer.com",
      },
    ],
  },
];
