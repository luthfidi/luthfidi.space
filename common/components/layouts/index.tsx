"use client";

import dynamic from "next/dynamic";

import Sidebar from "./sidebar";

const NextTopLoader = dynamic(() => import("nextjs-toploader"), { ssr: false });
const FollowingCursor = dynamic(() => import("../elements/FollowingCursor"), {
  ssr: false,
});

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts = ({ children }: LayoutsProps) => {
  return (
    <div className="mx-auto max-w-7xl lg:px-12">
      <NextTopLoader
        color="#60a5fa"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #60a5fa,0 0 5px #dbeafe"
      />
      <div className="mx-auto flex flex-col lg:min-h-screen lg:flex-row lg:gap-5">
        <Sidebar />
        <main className="max-w-[854px] lg:w-4/5 lg:py-4">
          {children}
        </main>
      </div>
      <FollowingCursor />
    </div>
  );
};

export default Layouts;
