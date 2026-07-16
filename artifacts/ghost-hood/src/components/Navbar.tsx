import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import catFaceImg from '@assets/GHOST_HOOD_1784018789875.jpg';

const navLinks = [
  { name: 'Story', href: '#story' },
  { name: 'Why $GHOST', href: '#why-ghost' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'Sneak Peek', href: '#sneak-peek' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = ['home', ...navLinks.map(l => l.href.substring(1))];
      let current = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 150) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-white/[0.06] py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-2.5 z-50 group"
        >
          <div className="w-7 h-7 rounded overflow-hidden border border-primary/40 group-hover:border-primary transition-colors shrink-0">
            <img src={catFaceImg} alt="Ghost Hood" className="w-full h-full object-cover" />
          </div>
          <span
            className="font-bold tracking-[0.18em] text-sm uppercase"
            style={{ color: '#E9F3EA', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.18em' }}
          >
            GHOST HOOD
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-xs font-medium tracking-[0.1em] uppercase transition-colors py-1 ${
                activeSection === link.href.substring(1)
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href="/game"
            className="px-3 py-1.5 text-xs font-semibold tracking-wider uppercase border border-white/15 text-muted-foreground hover:text-white hover:border-white/30 transition-colors rounded-sm"
          >
            Ghost Game
          </Link>
          {/* $GHOST badge button — compact rectangular style like $CC */}
          <button
            className="px-3.5 py-1.5 text-xs font-black tracking-widest uppercase rounded-sm transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#CCFF00', color: '#0B100C' }}
          >
            $GHOST
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-0 left-0 right-0 h-screen bg-background/98 backdrop-blur-xl border-b border-white/10 pt-20 px-6 md:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-xl font-bold uppercase tracking-wider ${
                    activeSection === link.href.substring(1) ? 'text-primary' : 'text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/game" onClick={() => setMobileMenuOpen(false)}>
                  <span className="block px-6 py-3 border border-white/15 text-center font-semibold tracking-wider uppercase text-sm text-white rounded-sm">
                    Ghost Game
                  </span>
                </Link>
                <button
                  className="px-6 py-3 font-black text-sm tracking-widest uppercase rounded-sm"
                  style={{ backgroundColor: '#CCFF00', color: '#0B100C' }}
                >
                  Buy $GHOST
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
