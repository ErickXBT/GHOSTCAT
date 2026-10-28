import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import Phaser from 'phaser';
import { MainScene } from '../game/MainScene';
import AirHockeyGame from '../components/AirHockeyGame';
import BooBannerGame from '../components/BooBannerGame';
import { ghostCatLogo, ghostCatGamingHaven } from '@/assets';
import { Target, Zap, Ghost } from 'lucide-react';

const GAME_W = 880;
const GAME_H = 500;

export default function Game() {
  const [activeGame, setActiveGame] = useState<'air-hockey' | 'boo-banner' | 'prince'>('air-hockey');
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (activeGame !== 'prince') {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      return;
    }

    if (!containerRef.current || gameRef.current) return;

    (window as any).__GH_MASCOT__ = ghostCatGamingHaven;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: GAME_W,
      height: GAME_H,
      parent: containerRef.current,
      backgroundColor: '#0b100c',
      scene: [MainScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [activeGame]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 selection:bg-[#0052FF] selection:text-white">
      {/* ── Minimal game navbar ─────────────────────────────── */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-gray-200 group-hover:border-[#0052FF] transition-colors shrink-0">
            <img src={ghostCatLogo} alt="GHOSTCAT" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none font-black tracking-wider">
            <span className="text-gray-950 text-sm">GHOST<span className="text-[#0052FF]">CAT</span></span>
          </div>
        </Link>

        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#0052FF]">
            Ghost Arcade
          </p>
          <p className="text-gray-950 font-black text-base tracking-tight leading-none">
            GAMES HUB
          </p>
        </div>

        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        >
          ← Back
        </Link>
      </header>

      {/* ── Game Selector Cards ─────────────────────────────── */}
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="text-center mb-6">
          <p className="text-[10px] font-mono tracking-[0.24em] uppercase text-[#0052FF] mb-1">
            SELECT ARCADE GAME
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-gray-950">Choose Your <span className="text-[#0052FF]">Game</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Air Hockey */}
          <button
            onClick={() => setActiveGame('air-hockey')}
            className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 relative overflow-hidden ${
              activeGame === 'air-hockey'
                ? 'border-[#0052FF] bg-blue-50/60 shadow-lg shadow-blue-500/10 ring-2 ring-[#0052FF]/20'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div
              className={`p-3 rounded-xl border shrink-0 ${
                activeGame === 'air-hockey'
                  ? 'bg-[#0052FF] text-white border-[#0052FF]'
                  : 'bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              <Zap size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#0052FF]">
                  CANVAS 2D • VS CPU
                </span>
                {activeGame === 'air-hockey' && (
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#0052FF] text-white">
                    PLAYING
                  </span>
                )}
              </div>
              <h3 className="text-gray-950 font-bold text-base leading-snug truncate">Neon Air Hockey</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">
                Fast-paced air hockey with CPU AI, slo-mo game points, and first to 7 wins.
              </p>
            </div>
          </button>

          {/* Card 2: Boo Banner */}
          <button
            onClick={() => setActiveGame('boo-banner')}
            className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 relative overflow-hidden ${
              activeGame === 'boo-banner'
                ? 'border-[#0052FF] bg-blue-50/60 shadow-lg shadow-blue-500/10 ring-2 ring-[#0052FF]/20'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div
              className={`p-3 rounded-xl border shrink-0 ${
                activeGame === 'boo-banner'
                  ? 'bg-[#0052FF] text-white border-[#0052FF]'
                  : 'bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              <Ghost size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#0052FF]">
                  INTERACTIVE • FLOCK
                </span>
                {activeGame === 'boo-banner' && (
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#0052FF] text-white">
                    PLAYING
                  </span>
                )}
              </div>
              <h3 className="text-gray-950 font-bold text-base leading-snug truncate">Boo Banner</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">
                Type your name to launch a flying ghost flock across the night sky. Poke ghosts and trigger BOO!
              </p>
            </div>
          </button>

          {/* Card 3: Prince of GHOSTCAT */}
          <button
            onClick={() => setActiveGame('prince')}
            className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 relative overflow-hidden ${
              activeGame === 'prince'
                ? 'border-[#0052FF] bg-blue-50/60 shadow-lg shadow-blue-500/10 ring-2 ring-[#0052FF]/20'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div
              className={`p-3 rounded-xl border shrink-0 ${
                activeGame === 'prince'
                  ? 'bg-[#0052FF] text-white border-[#0052FF]'
                  : 'bg-gray-100 text-gray-700 border-gray-200'
              }`}
            >
              <Target size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#0052FF]">
                  PHASER 2D • ARCHERY
                </span>
                {activeGame === 'prince' && (
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#0052FF] text-white">
                    PLAYING
                  </span>
                )}
              </div>
              <h3 className="text-gray-950 font-bold text-base leading-snug truncate">Prince of GHOSTCAT</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">
                Precision archery game. Calculate wind vectors, release arrows, and hit the golden bones.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* ── Active Game Arena ───────────────────────────────── */}
      {activeGame === 'air-hockey' && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
          <AirHockeyGame />
        </div>
      )}

      {activeGame === 'boo-banner' && (
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
          <BooBannerGame />
        </div>
      )}

      {activeGame === 'prince' && (
        <>
          <div className="text-center py-2 px-4">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-950">
              <span className="text-[#0052FF]">$GHOSTCAT</span> / Prince of GHOSTCAT
            </h1>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-500">
              Click &amp; Hold · Release · Mind the Wind
            </p>
          </div>

          <div className="flex flex-1 justify-center items-start pb-6 px-4">
            <div
              className="rounded-2xl overflow-hidden shadow-2xl bg-black border border-gray-300"
              style={{
                width: '100%',
                maxWidth: GAME_W,
              }}
            >
              <div ref={containerRef} style={{ width: '100%', aspectRatio: `${GAME_W}/${GAME_H}` }} />
            </div>
          </div>

          <div className="text-center pb-8 px-4 text-xs font-bold uppercase tracking-widest space-x-4 text-gray-600">
            <span>
              Bullseye <span className="text-[#0052FF] font-black">50</span>
            </span>
            <span>·</span>
            <span>
              Inner <span className="text-[#0052FF] font-black">25</span>
            </span>
            <span>·</span>
            <span>
              Outer <span className="text-[#0052FF] font-black">10</span>
            </span>
            <span>·</span>
            <span>
              Golden Bone <span className="text-[#0052FF] font-black">+40 &amp; Extra Arrow</span>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
