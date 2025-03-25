"use client";
import TabButton from "./tabButtons/TabButton";
import { useState } from "react";
import Authentication from "./Authentication";

export default function Appbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full p-4 sticky top-0 shadow-lg flex items-center justify-between bg-dark z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <span className="text-3xl">⚖️</span>
        <h1 className="text-3xl md:text-4xl font-bold text-ivory">
          Legal<span className="text-accent">Ease</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-6">
        <TabButton tab="Home" />
        <TabButton tab="Case-briefs" />
        <TabButton tab="Attorneys" />
        <TabButton tab="About" />
        <TabButton tab="Contact" />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <button
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-ivory focus:outline-none"
        >
          {isMenuOpen ? "✖️" : "☰"}
        </button>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="absolute top-[70px] right-0 w-full bg-dark shadow-lg p-4 md:hidden">

          <div className="flex flex-col space-y-4">
            <TabButton tab="Home" />
            <TabButton tab="Case-briefs" />
            <TabButton tab="Attorneys" />
            <TabButton tab="About" />
            <TabButton tab="Contact" />
          </div>
        </div>
      )}

      {/* Auth Section */}
     <Authentication />
    </div>
  );
}
