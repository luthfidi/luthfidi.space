import React from "react";

import { MENU_ITEMS } from "@/common/constants/menu";

import Breakline from "../../elements/Breakline";
import Profile from "./Profile";
import Menu from "./Menu";

export default function Sidebar() {
  const filteredMenu = MENU_ITEMS?.filter((item) => item?.isShow);
  return (
    <header className="lg:w-1/5">
      <div className="sticky top-4 z-10 flex flex-col lg:py-8">
        <Profile />
        <div className="hidden lg:block">
          <Breakline />
          <Menu list={filteredMenu} />
          <Breakline />
        </div>
      </div>
    </header>
  );
}
