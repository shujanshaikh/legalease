"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabButton({ tab = "" }) {
  const pathname = usePathname();
  const isActive = pathname === `/${tab.toLowerCase()}`; // Check if current path matches tab

  return (
    <Link href={`/${tab.toLowerCase()}`} passHref>
      <button
        className={`px-4 py-2 text-base font-bold rounded-full transition-all duration-300 
        hover:bg-ivory hover:text-white active:bg-accent
        ${isActive ? "bg-accent text-white" : "bg-transparent text-black"}`}
      >
        {tab}
      </button>
    </Link>
  );
}
