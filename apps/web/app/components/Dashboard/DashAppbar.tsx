"use client";

import TabButton from "../appBar/tabButtons/TabButton";



export function DashAppbar({}) {
  return (
    <div className="w-full p-6 sticky top-0 shadow-lg flex items-center justify-between bg-dark">
      <div className="flex items-center space-x-4">
        <span className="text-3xl">⚖️</span>
        <h1 className="text-4xl font-bold text-ivory">
          Legal<span className="text-accent">Ease</span>
        </h1>
      </div>
      <div className="flex items-center  space-x-8">
        <TabButton tab="Home" />
        <TabButton tab= "Case-briefs" />
        <TabButton tab="Attorneys" />
        <TabButton tab="About" />
        <TabButton tab="Contact" />
      </div>
        <div className="flex items-center space-x-4 min-w-[160px]">
          User Logged In
        </div>
        <div className="min-w-[40px]">
        </div>
    </div>
  );
}



