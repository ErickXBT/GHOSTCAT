import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Eye, Download, Image as ImageIcon } from 'lucide-react';

// Import all 15 high-resolution artworks from @/assets
import {
  ghostCatMoonPoster,
  ghostCatTradingLair,
  ghostCatGamingHaven,
  ghostCatChessLounge,
  ghostCatBmx,
  ghostCatMoonLounge,
  ghostCatCandleKitchen,
  ghostCatChillVibes,
  ghostCatHeavenRally,
  ghostCatBeachSunset,
  ghostCatCryptoGarden,
  ghostCatChillOverlook,
  ghostCatBeachWorkspace,
  ghostCatSkatepark,
  ghostCatViceCity,
} from '@/assets';

interface GalleryItem {
  id: string;
  num: string;
  title: string;
  category: 'MEMES' | 'GAME SKINS' | 'COLLECTIBLES';
  image: string;
  desc: string;
  likes: number;
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    num: '01',
    title: 'To The Moon Neon Poster',
    category: 'MEMES',
    image: ghostCatMoonPoster,
    desc: 'The iconic high-voltage cyber ghost feline rocketing past every resistance.',
    likes: 1842,
  },
  {
    id: '2',
    num: '02',
    title: 'Chill Trading Lair',
    category: 'COLLECTIBLES',
    image: ghostCatTradingLair,
    desc: 'Dual-monitor setup, warm tea, and supreme unshakeable chill during market storms.',
    likes: 1619,
  },
  {
    id: '3',
    num: '03',
    title: 'Neon Gaming Haven',
    category: 'GAME SKINS',
    image: ghostCatGamingHaven,
    desc: 'Multi-screen arcade command center where the ghost cat masters every retro run.',
    likes: 1454,
  },
  {
    id: '4',
    num: '04',
    title: 'Neon Chess Lounge',
    category: 'COLLECTIBLES',
    image: ghostCatChessLounge,
    desc: 'Grandmaster feline planning 5 moves ahead in neon glow while degens scramble.',
    likes: 1277,
  },
  {
    id: '5',
    num: '05',
    title: 'BMX Halloween Ride',
    category: 'GAME SKINS',
    image: ghostCatBmx,
    desc: 'Ghost cat popping wheelies through neon pumpkin streets with pumpkin companions.',
    likes: 1905,
  },
  {
    id: '6',
    num: '06',
    title: 'Neon Moon Lounge',
    category: 'COLLECTIBLES',
    image: ghostCatMoonLounge,
    desc: 'Perched upon a glowing crescent moon, watching over the illuminated blockchain skyline.',
    likes: 1788,
  },
  {
    id: '7',
    num: '07',
    title: 'Neon Candle Kitchen',
    category: 'MEMES',
    image: ghostCatCandleKitchen,
    desc: 'Brewing spicy green potion candles and sweet pumpkin treats for the ghost squad.',
    likes: 1331,
  },
  {
    id: '8',
    num: '08',
    title: 'Chill Vibes Lounge',
    category: 'COLLECTIBLES',
    image: ghostCatChillVibes,
    desc: 'Cozy beanbag, vinyl records, and pure ambient frequency. Zero stress guaranteed.',
    likes: 1512,
  },
  {
    id: '9',
    num: '09',
    title: 'Heaven Rally Spirit',
    category: 'MEMES',
    image: ghostCatHeavenRally,
    desc: 'Leading the celestial rally above the clouds with golden horns and angelic glow.',
    likes: 1673,
  },
  {
    id: '10',
    num: '10',
    title: 'Beach Chill Sunset',
    category: 'COLLECTIBLES',
    image: ghostCatBeachSunset,
    desc: 'Tropical neon paradise with palm trees and ocean breeze. The ultimate unkillable vibe.',
    likes: 2189,
  },
  {
    id: '11',
    num: '11',
    title: 'Chill Crypto Garden',
    category: 'MEMES',
    image: ghostCatCryptoGarden,
    desc: 'Lush glowing flora, floating lanterns, and a meditative ghost cat watering digital vines.',
    likes: 1845,
  },
  {
    id: '12',
    num: '12',
    title: 'Chill Mountain Overlook',
    category: 'COLLECTIBLES',
    image: ghostCatChillOverlook,
    desc: 'Resting above the misty peaks, soaking in horizon-wide alpha and peaceful silence.',
    likes: 1980,
  },
  {
    id: '13',
    num: '13',
    title: 'Neon Beach Workspace',
    category: 'GAME SKINS',
    image: ghostCatBeachWorkspace,
    desc: 'Code, liquidity pools, and sunset coconut drinks on the cyber shoreline.',
    likes: 1720,
  },
  {
    id: '14',
    num: '14',
    title: 'Skatepark Kickflip',
    category: 'GAME SKINS',
    image: ghostCatSkatepark,
    desc: 'Sticking the landing over neon ramps with zero fear and full ghost style.',
    likes: 2045,
  },
  {
    id: '15',
    num: '15',
    title: 'Vice City Night Ride',
    category: 'MEMES',
    image: ghostCatViceCity,
    desc: 'Cruising down palm-lined neon boulevards with shades on and unkillable vibes.',
    likes: 2210,
  },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'MEMES' | 'GAME SKINS' | 'COLLECTIBLES'>('ALL');
  const [likesState, setLikesState] = useState<Record<string, number>>(
    Object.fromEntries(galleryItems.map(item => [item.id, item.likes]))
  );
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});
  const [previewImage, setPreviewImage] = useState<GalleryItem | null>(null);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHasLiked(prev => {
      const alreadyLiked = !!prev[id];
      setLikesState(current => ({
        ...current,
        [id]: alreadyLiked ? current[id] - 1 : current[id] + 1
      }));
      return { ...prev, [id]: !alreadyLiked };
    });
  };

  const filteredItems = activeFilter === 'ALL'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="gallery" className="relative py-28 overflow-hidden bg-white grid-bg">
      <div className="container mx-auto px-6 md:px-10">
        {/* Section label & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
              <span>MEMO 04 // MEME &amp; GAME VAULT</span>
            </div>
            <h2
              className="font-black leading-[0.94] tracking-tight text-gray-950"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.4rem, 5vw, 4.4rem)' }}
            >
              Ghost <span className="text-[#0052FF]">Gallery.</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-3 max-w-xl font-medium">
              A curated vault of {galleryItems.length} community memes, game sprites, and unkillable moments from the haunting side of crypto.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['ALL', 'MEMES', 'GAME SKINS', 'COLLECTIBLES'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase rounded-xl border transition-all ${
                  activeFilter === filter
                    ? 'text-white border-[#0052FF] bg-[#0052FF] shadow-xs'
                    : 'text-gray-700 border-gray-200 hover:border-gray-400 bg-white'
                }`}
              >
                {filter} {filter === 'ALL' && `(${galleryItems.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Large Cards Grid (1920x1080 / 16:9 Full Frame) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                onClick={() => setPreviewImage(item)}
                className="group border border-gray-200 hover:border-[#0052FF]/60 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer bg-white"
              >
                {/* Image Container: 1920x1080 (16:9) Full Frame */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-gray-900 border border-gray-200 shadow-xs">
                      #{item.num}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md backdrop-blur-md bg-[#0052FF] text-white shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Overlay Quick View icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black/20 backdrop-blur-[2px]">
                    <span className="p-3.5 rounded-full bg-white text-[#0052FF] shadow-xl transform scale-90 group-hover:scale-100 transition-transform font-bold">
                      <Eye size={22} />
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-gray-950 font-black text-base md:text-lg tracking-tight mb-1.5 group-hover:text-[#0052FF] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-2 font-medium">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Actions */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={(e) => toggleLike(item.id, e)}
                      className={`inline-flex items-center gap-2 text-xs md:text-sm font-mono font-bold transition-colors ${
                        hasLiked[item.id] ? 'text-[#0052FF]' : 'text-gray-500 hover:text-gray-900'
                      }`}
                      title="Like meme"
                    >
                      <Heart
                        size={15}
                        className={hasLiked[item.id] ? 'fill-[#0052FF] text-[#0052FF]' : ''}
                      />
                      <span>{likesState[item.id]}</span>
                    </button>

                    <span className="text-[11px] font-mono text-gray-400 tracking-wider font-semibold">
                      1920 × 1080 • VAULT
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Full View */}
        <AnimatePresence>
          {previewImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
              onClick={() => setPreviewImage(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full border border-gray-200 rounded-2xl overflow-hidden bg-white p-6 md:p-8 relative shadow-2xl"
              >
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-5 bg-gray-100 border border-gray-200">
                  <img
                    src={previewImage.image}
                    alt={previewImage.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs md:text-sm font-mono font-bold text-[#0052FF]">
                    #{previewImage.num} — {previewImage.category}
                  </span>
                  <button
                    onClick={() => setPreviewImage(null)}
                    className="text-gray-600 hover:text-black text-xs font-mono px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    CLOSE [ESC]
                  </button>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-950 mb-2">{previewImage.title}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed font-medium">{previewImage.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs md:text-sm font-mono text-gray-600 font-bold">
                    ❤️ {likesState[previewImage.id]} Community Likes
                  </span>
                  <a
                    href={previewImage.image}
                    download={`${previewImage.title.toLowerCase().replace(/\s+/g, '_')}.png`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all hover:bg-blue-600 active:scale-95 text-white shadow-xs"
                    style={{ backgroundColor: '#0052FF' }}
                  >
                    <Download size={14} />
                    <span>Download (1920×1080)</span>
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
