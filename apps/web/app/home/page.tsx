"use client";
import { useState } from 'react';
import RightNav from '../components/home-page/Right-side-tabs/RightNav';
import HeroSection from '../components/home-page/hero-section/HeroSection';
import { Appbar } from '../components/appBar/AppBar';


export default function LandingPage() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-ivory">
<Appbar/>
   <RightNav />

   <HeroSection />

    </div>
  );
}
