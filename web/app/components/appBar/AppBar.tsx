"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import TabButton from "./tabButtons/TabButton";



export function Appbar() {
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
      <SignedOut>
        <div className="flex items-center space-x-4 min-w-[160px]">

          <SignInButton>
            <button className="px-4 py-2 rounded-lg text-lg bg-accent text-dark transition transform duration-100 hover:scale-110">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton>
            <button className="px-4 py-2 rounded-lg text-lg border border-accent bg-accent text-dark transition transform duration-100 hover:scale-110">
              Sign Up
            </button>
          </SignUpButton>

        </div>
      </SignedOut>
      <SignedIn>
        <div className="min-w-[40px]">
        <UserButton
          appearance={{
            elements: {
              userButtonOuter: "rounded-full border-2 border-gray-500",
            },
          }}
        />
        </div>
      </SignedIn>
    </div>
  );
}



