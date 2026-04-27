import {
  BiHomeCircle as HomeIcon,
  BiUser as AboutIcon,
  BiCollection as ProjectIcon,
  BiCategory as DashboardIcon,
  BiBook as ContactIcon,
} from "react-icons/bi";
import { IoPhonePortraitOutline as ContentIcon } from "react-icons/io5";
import { PiCertificate as AchievementIcon } from "react-icons/pi";
import { TbDeviceDesktopCog as UsesIcon } from "react-icons/tb";

import { MenuItemProps } from "../types/menu";

const iconSize = 20;

export const MENU_ITEMS: MenuItemProps[] = [
  {
    title: "Home",
    href: "/",
    icon: <HomeIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Home",
  },
  {
    title: "About",
    href: "/about",
    icon: <AboutIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: About",
  },
  {
    title: "Creations",
    href: "/creations",
    icon: <ContentIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Creations",
  },
  {
    title: "Projects",
    href: "/projects",
    icon: <ProjectIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Projects",
  },
  {
    title: "Achievements",
    href: "/achievements",
    icon: <AchievementIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Achievements",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <DashboardIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Dashboard",
  },
  {
    title: "Uses",
    href: "/uses",
    icon: <UsesIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Uses",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: <ContactIcon size={iconSize} />,
    isShow: true,
    isExternal: false,
    eventName: "Pages: Contact",
  },
];
