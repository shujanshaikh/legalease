"use client";

import Appbar from '../../components/appBar/AppBar';
import HeroSection from '../../components/home-page/hero-section/HeroSection';
import RightNav from '../../components/home-page/Right-side-tabs/RightNav';



export default function LandingPage() {
  return (
   <div className="min-h-screen flex flex-col items-center justify-start relative bg-dark">
      {/* Appbar at the top */}
      <Appbar />

      {/* Main content area */}
      <div className="flex flex-col md:flex-row w-full md:items-start md:justify-between">
        {/* Right navigation */}
        <RightNav className="w-full md:w-1/4 lg:w-1/5 hidden md:block" />

        {/* Hero section */}
        <HeroSection className="w-full md:w-3/4 lg:w-4/5 px-4 md:px-8" />
      </div>
    </div>
  );
}
