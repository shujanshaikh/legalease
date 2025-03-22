"use client";
import { DashAppbar } from '../components/Dashboard/DashAppbar';
import RightNav from '../components/home-page/Right-side-tabs/RightNav';
import HeroSection from '../components/home-page/hero-section/HeroSection';



export default function Dashboard() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-ivory">
<DashAppbar />
   <RightNav />
   <HeroSection />
    </div>
  );
}
