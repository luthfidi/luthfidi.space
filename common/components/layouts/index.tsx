"use client";

import dynamic from "next/dynamic";

import Sidebar from "./sidebar";

const Notif = dynamic(() => import("../elements/Notif"), { ssr: false });

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts = ({ children }: LayoutsProps) => {
  return (
    <div className="mx-auto max-w-7xl lg:px-12">
      <div className="mx-auto flex flex-col lg:min-h-screen lg:flex-row lg:gap-5">
        <Sidebar />
        <main className="max-w-[854px] lg:w-4/5 lg:py-4">
          {children}
        </main>
      </div>
      <Notif />
    </div>
  );
};

export default Layouts;
