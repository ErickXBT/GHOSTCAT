import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import AboutGhost from '../components/AboutGhost';
import Story from '../components/Story';
import WhyGhost from '../components/WhyGhost';
import Roadmap from '../components/Roadmap';
import Gallery from '../components/Gallery';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white w-full overflow-hidden text-gray-900 selection:bg-[#0052FF] selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        <Ticker />
        <AboutGhost />
        <Story />
        <Ticker />
        <WhyGhost />
        <Roadmap />
        <Gallery />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
