import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Story from '../components/Story';
import WhyGhost from '../components/WhyGhost';
import Roadmap from '../components/Roadmap';
import SneakPeek from '../components/SneakPeek';
import CtaSection from '../components/CtaSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background w-full overflow-hidden text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <main>
        <Hero />
        <Story />
        <WhyGhost />
        <Roadmap />
        <SneakPeek />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
