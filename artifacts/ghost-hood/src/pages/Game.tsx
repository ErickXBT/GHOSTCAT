import React, { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import Phaser from 'phaser';
import { MainScene } from '../game/MainScene';
import mascotUrl from '@assets/2_1784019392022.png';
import catFaceUrl from '@assets/GHOST_HOOD_1784018789875.jpg';

const GAME_W = 880;
const GAME_H = 500;

export default function Game() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return;

    // Expose mascot URL for Phaser preload
    (window as any).__GH_MASCOT__ = mascotUrl;

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
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#0b100c' }}
    >
      {/* ── Minimal game navbar ─────────────────────────────── */}
      <header
        className="flex items-center justify-between px-6 md:px-12 py-4 border-b"
        style={{ borderColor: 'rgba(204,255,0,0.12)', backgroundColor: '#0b100c' }}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-full overflow-hidden border"
            style={{ borderColor: 'rgba(204,255,0,0.3)' }}
          >
            <img src={catFaceUrl} alt="GHOST HOOD" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none font-black tracking-wider">
            <span className="text-white text-base">GHOST</span>
            <span className="text-base" style={{ color: '#ccff00' }}>HOOD</span>
          </div>
        </Link>

        <div className="text-center">
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: 'rgba(204,255,0,0.6)' }}
          >
            Ghost Game
          </p>
          <p className="text-white font-black text-lg tracking-tight leading-none">
            GHOST CAT HOOD
          </p>
        </div>

        <Link
          href="/"
          className="text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full border transition-all hover:scale-105"
          style={{ color: '#ccff00', borderColor: 'rgba(204,255,0,0.35)' }}
        >
          ← Back
        </Link>
      </header>

      {/* ── Game title strip ────────────────────────────────── */}
      <div className="text-center py-6 px-4">
        <h1
          className="text-3xl md:text-4xl font-black tracking-tight"
          style={{ color: '#ccff00' }}
        >
          $GHOST{' '}
          <span className="text-white">/ Prince of Ghost Hood</span>
        </h1>
        <p
          className="mt-1 text-xs font-bold uppercase tracking-widest"
          style={{ color: 'rgba(233,243,234,0.5)', letterSpacing: '4px' }}
        >
          Click &amp; Hold · Release · Mind the Wind
        </p>
      </div>

      {/* ── Phaser canvas wrapper ───────────────────────────── */}
      <div className="flex flex-1 justify-center items-start pb-8 px-4">
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{
            border: '2px solid rgba(204,255,0,0.2)',
            boxShadow: '0 0 60px rgba(204,255,0,0.08)',
            width: '100%',
            maxWidth: GAME_W,
          }}
        >
          <div ref={containerRef} style={{ width: '100%', aspectRatio: `${GAME_W}/${GAME_H}` }} />
        </div>
      </div>

      {/* ── Score legend ────────────────────────────────────── */}
      <div
        className="text-center pb-8 px-4 text-xs font-bold uppercase tracking-widest space-x-4"
        style={{ color: 'rgba(233,243,234,0.45)', letterSpacing: '2px' }}
      >
        <span>
          Bullseye{' '}
          <span style={{ color: '#ccff00' }}>50</span>
        </span>
        <span>·</span>
        <span>
          Inner{' '}
          <span style={{ color: '#ccff00' }}>25</span>
        </span>
        <span>·</span>
        <span>
          Outer{' '}
          <span style={{ color: '#ccff00' }}>10</span>
        </span>
        <span>·</span>
        <span>
          Golden Bone{' '}
          <span style={{ color: '#ffd700' }}>+40 &amp; Extra Arrow</span>
        </span>
      </div>
    </div>
  );
}
