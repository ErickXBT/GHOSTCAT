import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { ghostCatLogo } from '@/assets';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Story', href: '#story' },
  { name: 'Why $GHOSTCAT', href: '#why-ghost' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'Gallery', href: '#gallery' },
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
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-100 py-3.5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-2.5 z-50 group"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-gray-200 group-hover:border-[#0052FF] transition-colors shrink-0 shadow-xs">
            <img src={ghostCatLogo} alt="GHOSTCAT" className="w-full h-full object-cover" />
          </div>
          <span
            className="font-black tracking-[0.16em] text-sm uppercase text-gray-950"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            GHOST<span className="text-[#0052FF]">CAT</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-xs font-semibold tracking-wider uppercase transition-colors py-1 ${
                activeSection === link.href.substring(1)
                  ? 'text-[#0052FF]'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/game"
            className="px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase border border-gray-200 text-gray-700 hover:text-black hover:border-gray-400 bg-gray-50/60 transition-colors rounded-lg"
          >
            Ghost Game
          </Link>
          <button
            className="px-4 py-2 text-xs font-black tracking-widest uppercase rounded-lg transition-all hover:bg-blue-600 active:scale-95 text-white shadow-xs"
            style={{ backgroundColor: '#0052FF' }}
          >
            $GHOSTCAT
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-900 z-50 p-1 rounded-md border border-gray-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-0 left-0 right-0 h-screen bg-white/98 backdrop-blur-xl border-b border-gray-200 pt-20 px-6 md:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-lg font-bold uppercase tracking-wider ${
                    activeSection === link.href.substring(1) ? 'text-[#0052FF]' : 'text-gray-900'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/game" onClick={() => setMobileMenuOpen(false)}>
                  <span className="block px-6 py-3 border border-gray-200 text-center font-bold tracking-wider uppercase text-sm text-gray-800 rounded-lg bg-gray-50">
                    Ghost Game
                  </span>
                </Link>
                <button
                  className="px-6 py-3 font-black text-sm tracking-widest uppercase rounded-lg text-white"
                  style={{ backgroundColor: '#0052FF' }}
                >
                  Buy $GHOSTCAT
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
