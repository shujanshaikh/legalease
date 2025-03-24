"use client";

import { FaFire, FaQuestionCircle, FaListUl, FaBalanceScale } from "react-icons/fa";

export default function RightNav({ className }) {
  return (
    <div
      className={`fixed top-28 right-0 flex flex-col space-y-4 pr-2 translate-x-1/2 ${className} hidden md:flex`}
    >
      <button className="flex items-center space-x-4 bg-[#7A3E3E] text-white px-4 py-3 rounded-l-lg shadow-lg hover:translate-x-[-60px] transition-transform duration-300">
        <FaFire />
        <span>Hot Topics</span>
      </button>
      <button className="flex items-center space-x-4 bg-[#7A3E3E] text-white px-4 py-3 rounded-l-lg shadow-lg hover:translate-x-[-60px] transition-transform duration-300">
        <FaQuestionCircle />
        <span>FAQS</span>
      </button>
      <button className="flex items-center space-x-4 bg-[#7A3E3E] text-white px-4 py-3 rounded-l-lg shadow-lg hover:translate-x-[-60px] transition-transform duration-300">
        <FaListUl />
        <span>Sections</span>
      </button>
      <button className="flex items-center space-x-4 bg-[#7A3E3E] text-white px-4 py-3 rounded-l-lg shadow-lg hover:translate-x-[-60px] transition-transform duration-300">
        <FaBalanceScale />
        <span>Rights</span>
      </button>
    </div>
  );
}
