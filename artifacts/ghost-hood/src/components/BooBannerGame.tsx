import React, { useEffect, useRef } from 'react';

export default function BooBannerGame() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const $ = (id: string) => root.querySelector(`#${id}`) as HTMLElement;

    const sky = $('sky');
    const flock = $('flock');
    const nameIn = $('name') as HTMLInputElement;

    /* ════════════════════════════════════════
       BACKGROUND
    ═══════════════════════════════════════ */
    const bg = $('bg') as HTMLCanvasElement;
    const bctx = bg.getContext('2d')!;
    let W: number, H: number, DPR: number;

    function sizeBg() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      const r = sky.getBoundingClientRect();
      W = r.width;
      H = r.height;
      bg.width = W * DPR;
      bg.height = H * DPR;
      bctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildStars();
      buildProps();
    }

    let stars: any[] = [];
    function buildStars() {
      stars = [];
      for (let i = 0; i < 90; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H * 0.68,
          r: Math.random() * 1.5 + 0.4,
          tw: Math.random() * Math.PI * 2,
          sp: 0.6 + Math.random() * 2,
        });
      }
    }

    const bats = Array.from({ length: 5 }, () => ({
      x: Math.random(),
      y: 0.1 + Math.random() * 0.3,
      sp: 0.0006 + Math.random() * 0.0009,
      size: 9 + Math.random() * 8,
      flap: Math.random() * Math.PI * 2,
    }));

    function buildProps() {
      const host = $('props');
      if (!host) return;
      host.innerHTML = '';
      [
        ['pumpkin', 8],
        ['stone', 18],
        ['tree', 29],
        ['pumpkin', 40],
        ['stone', 54],
        ['pumpkin', 68],
        ['tree', 79],
        ['stone', 90],
      ].forEach(([kind, left], i) => {
        const p = document.createElement('div');
        p.className = 'prop ' + kind;
        p.style.left = left + '%';
        p.style.animationDelay = i * 0.3 + 's';
        if (kind === 'stone') p.style.bottom = 6 + Math.random() * 6 + '%';
        host.appendChild(p);
      });
    }

    /* ════════════════════════════════════════
       STATE
    ═══════════════════════════════════════ */
    const COLORS = ['#ff8a2b', '#a3f34a', '#ff5ec4', '#4de4ff', '#ffd93d', '#b17bff'];

    const GHOST_SVG = `
<div class="fly-ghost">
  <svg viewBox="0 0 120 142">
    <path class="g-body" d="M60 6C32 6 16 30 16 58v62c0 8 7 11 12 6l9-9c3-3 8-3 11 0l8 8c3 3 8 3 11 0l8-8c3-3 8-3 11 0l9 9c5 5 12 2 12-6V58C104 30 88 6 60 6z"/>
    <ellipse class="g-eye" cx="43" cy="52" rx="8" ry="9"/>
    <ellipse class="g-eye" cx="77" cy="52" rx="8" ry="9"/>
    <circle class="g-shine" cx="46" cy="49" r="2.6"/>
    <circle class="g-shine" cx="80" cy="49" r="2.6"/>
    <ellipse class="g-mouth" cx="60" cy="80" rx="9" ry="11"/>
    <ellipse class="g-blush" cx="30" cy="70" rx="8" ry="5"/>
    <ellipse class="g-blush" cx="90" cy="70" rx="8" ry="5"/>
  </svg>
</div>`;

    let flyers: any[] = [];
    let groupX = 0;
    let T = 0;
    let speed = 5;
    let spooks = 0;
    let laps = 0;

    let GAP = 74;
    const WAVE = 0.72;

    /* ════════════════════════════════════════
       BUILD THE FLOCK
    ═══════════════════════════════════════ */
    function launch() {
      const text = nameIn.value.trim().slice(0, 10);
      const btn = $('boo');

      if (!text) {
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 360);
        nameIn.focus();
        return;
      }

      flock.innerHTML = '';
      flyers = [];
      const hint = $('hint');
      if (hint) hint.style.opacity = '0';

      GAP = Math.min(78, Math.max(42, (W * 0.82) / text.length));

      text.split('').forEach((ch, i) => {
        const el = document.createElement('div');
        el.className = 'flyer pop drop';
        el.style.animationDelay = i * 70 + 'ms';
        el.innerHTML = `
          ${GHOST_SVG}
          <span class="string"></span>
          <div class="tile" style="background:${COLORS[i % COLORS.length]}; animation-delay:${i * 0.18}s">
            ${ch === ' ' ? '·' : ch.toUpperCase()}
          </div>`;

        el.addEventListener('click', (e) => {
          e.stopPropagation();
          pokeFlyer(i);
        });

        flock.appendChild(el);
        flyers.push({ el, x: 0, y: 0 });
      });

      groupX = -GAP * text.length - 40;

      spooks += text.length;
      bumpStat('spooks', spooks);
      updateMeter();
      confetti(W * 0.5, H * 0.4, 20);
    }

    /* ════════════════════════════════════════
       LOOP
    ═══════════════════════════════════════ */
    let animId: number;

    function loop() {
      T += 0.016;

      bctx.clearRect(0, 0, W, H);

      stars.forEach((s) => {
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(T * s.sp * 2.6 + s.tw));
        bctx.fillStyle = `rgba(255,250,235,${tw * 0.85})`;
        bctx.beginPath();
        bctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        bctx.fill();
      });

      bats.forEach((b) => {
        b.x += b.sp * (1 + speed * 0.1);
        b.flap += 0.22;
        if (b.x > 1.1) {
          b.x = -0.1;
          b.y = 0.08 + Math.random() * 0.34;
        }
        const bx = b.x * W,
          by = b.y * H + Math.sin(T * 5 + b.flap) * 7;
        const w = Math.sin(b.flap) * b.size * 0.55;
        bctx.strokeStyle = 'rgba(16,8,28,0.85)';
        bctx.lineWidth = 2.4;
        bctx.lineCap = 'round';
        bctx.beginPath();
        bctx.moveTo(bx - b.size, by + w);
        bctx.quadraticCurveTo(bx - b.size * 0.4, by - b.size * 0.45, bx, by);
        bctx.quadraticCurveTo(bx + b.size * 0.4, by - b.size * 0.45, bx + b.size, by + w);
        bctx.stroke();
      });

      if (flyers.length) {
        groupX += 0.6 + speed * 0.42;

        const total = GAP * flyers.length;
        if (groupX > W + total * 0.2) {
          groupX = -total - 40;
          laps++;
          bumpStat('laps', laps);
        }

        const baseY = H * 0.42;
        const amp = H * 0.13;

        flyers.forEach((f, i) => {
          const x = groupX + i * GAP;
          const ph = T * 1.5 - i * WAVE;
          const y = baseY + Math.sin(ph) * amp + Math.sin(T * 3.1 + i) * 5;

          const slope = Math.cos(ph) * amp * 0.09;
          const tilt = Math.max(-18, Math.min(18, slope));

          f.x = x;
          f.y = y;
          f.el.style.transform = `translate(${x}px, ${y}px) rotate(${tilt}deg)`;

          if (Math.random() < 0.012) spark(x, y + 14);

          if (Math.random() < 0.0022) {
            f.el.classList.add('blink');
            setTimeout(() => f.el.classList.remove('blink'), 140);
          }
        });
      }

      animId = requestAnimationFrame(loop);
    }

    /* ════════════════════════════════════════
       POKE
    ═══════════════════════════════════════ */
    function pokeFlyer(i: number) {
      const f = flyers[i];
      if (!f) return;
      f.el.classList.add('boo');
      setTimeout(() => f.el.classList.remove('boo'), 460);
      booPop(f.x, f.y);
      confetti(f.x, f.y + 20, 12);
      spooks++;
      bumpStat('spooks', spooks);
      updateMeter();

      [i - 1, i + 1].forEach((j, k) => {
        const n = flyers[j];
        if (!n) return;
        setTimeout(() => {
          n.el.classList.add('boo');
          setTimeout(() => n.el.classList.remove('boo'), 360);
        }, 110 + k * 60);
      });
    }

    /* ════════════════════════════════════════
       EFFECTS
    ═══════════════════════════════════════ */
    function spark(x: number, y: number) {
      const s = document.createElement('i');
      s.className = 'spark';
      const sz = 3 + Math.random() * 4;
      s.style.cssText = `
        left:${x + (Math.random() - 0.5) * 24}px;
        top:${y + (Math.random() - 0.5) * 18}px;
        width:${sz}px; height:${sz}px;
        background:${COLORS[(Math.random() * COLORS.length) | 0]};
        box-shadow:0 0 10px currentColor;`;
      sky.appendChild(s);
      s.animate(
        [
          { transform: 'scale(1) translateY(0)', opacity: 0.9 },
          { transform: 'scale(0) translateY(26px)', opacity: 0 },
        ],
        { duration: 700 + Math.random() * 500, easing: 'cubic-bezier(.3,1,.5,1)' },
      );
      setTimeout(() => s.remove(), 1250);
    }

    function confetti(x: number, y: number, n = 14) {
      for (let i = 0; i < n; i++) {
        const c = document.createElement('i');
        c.className = 'conf';
        const w = 5 + Math.random() * 7;
        c.style.cssText = `
          left:${x}px; top:${y}px;
          width:${w}px; height:${w * 0.6}px;
          background:${COLORS[i % COLORS.length]};`;
        sky.appendChild(c);
        const a = (Math.PI * 2 * i) / n + Math.random() * 0.5;
        const d = 60 + Math.random() * 100;
        c.animate(
          [
            { transform: 'translate(0,0) rotate(0)', opacity: 1 },
            {
              transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d + 70}px) rotate(${
                Math.random() * 720
              }deg)`,
              opacity: 0,
            },
          ],
          { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.8,.3,1)' },
        );
        setTimeout(() => c.remove(), 1500);
      }
    }

    function booPop(x: number, y: number) {
      const p = document.createElement('div');
      p.className = 'boo-pop go';
      p.textContent = 'BOO!';
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      sky.appendChild(p);
      setTimeout(() => p.remove(), 900);
    }

    function bumpStat(id: string, val: number) {
      const el = $(id);
      if (!el) return;
      el.textContent = String(val);
      el.classList.remove('bump');
      void el.offsetWidth;
      el.classList.add('bump');
    }

    /* ════════════════════════════════════════
       METER
    ═══════════════════════════════════════ */
    const RANKS: [number, string][] = [
      [0, 'MILD'],
      [6, 'EERIE'],
      [14, 'CREEPY'],
      [24, 'HAUNTED'],
      [38, 'CURSED'],
      [55, 'LEGENDARY'],
    ];
    function updateMeter() {
      const fill = $('meter-fill');
      if (fill) fill.style.width = Math.min(100, (spooks / 60) * 100) + '%';
      let r = RANKS[0][1];
      RANKS.forEach(([n, label]) => {
        if (spooks >= n) r = label;
      });
      const rankEl = $('rank');
      if (rankEl) rankEl.textContent = r;
    }

    /* ════════════════════════════════════════
       INPUT
    ═══════════════════════════════════════ */
    const onInput = () => {
      const n = nameIn.value.length;
      const c = $('count');
      if (c) {
        c.textContent = `${n}/10`;
        c.classList.toggle('full', n >= 10);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        launch();
      }
    };
    const onBooClick = () => launch();
    const onSpeedInput = (e: Event) => {
      speed = +(e.target as HTMLInputElement).value;
    };
    const onSkyClick = (e: MouseEvent) => {
      const r = sky.getBoundingClientRect();
      confetti(e.clientX - r.left, e.clientY - r.top, 8);
    };

    nameIn.addEventListener('input', onInput);
    nameIn.addEventListener('keydown', onKeyDown);
    $('boo').addEventListener('click', onBooClick);
    $('speed').addEventListener('input', onSpeedInput);
    sky.addEventListener('click', onSkyClick);

    /* ════════════════════════════════════════
       BOOT
    ═══════════════════════════════════════ */
    let resizeTimer: any;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        sizeBg();
        if (flyers.length) launch();
      }, 250);
    };
    window.addEventListener('resize', onResize);

    sizeBg();
    updateMeter();
    loop();

    nameIn.value = 'GHOSTCAT';
    onInput();

    const startTimer = setTimeout(() => {
      sizeBg();
      nameIn.value = 'GHOSTCAT';
      onInput();
      launch();
    }, 250);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(startTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      nameIn.removeEventListener('input', onInput);
      nameIn.removeEventListener('keydown', onKeyDown);
      const b = $('boo');
      if (b) b.removeEventListener('click', onBooClick);
      const sp = $('speed');
      if (sp) sp.removeEventListener('input', onSpeedInput);
      if (sky) sky.removeEventListener('click', onSkyClick);
    };
  }, []);

  return (
    <div className="boo-banner-scope w-full flex flex-col items-center justify-center py-4">
      <style>{`
        .boo-banner-scope {
          --night:   #190e2e;
          --panel:   #241140;
          --panel-2: #32195a;
          --edge:    #120822;
          --moon:    #fff6d8;
          --orange:  #ff8a2b;
          --orange-2:#ff6b1a;
          --lime:    #a3f34a;
          --pink:    #ff5ec4;
          --cyan:    #4de4ff;
          --purple:  #b17bff;
          --yellow:  #ffd93d;
          --cream:   #fff4e6;
          --display: 'Bungee', Impact, sans-serif;
          --sans:    'Fredoka', system-ui, sans-serif;
          font-family: var(--sans);
          color: var(--cream);
          width: 100%;
        }

        .boo-banner-scope button, .boo-banner-scope input { font-family: inherit; color: inherit; }
        .boo-banner-scope button { cursor: pointer; border: none; background: none; }

        .boo-banner-scope .game {
          width: 100%;
          max-width: 940px;
          min-height: 580px;
          height: min(760px, calc(100vh - 120px));
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 0 auto;
        }

        /* ══ SKY ══ */
        .boo-banner-scope .sky {
          position: relative;
          flex: 1;
          min-height: 380px;
          border-radius: 22px;
          overflow: hidden;
          background: linear-gradient(180deg, #1a0d33 0%, #2b1455 45%, #4a2070 78%, #6b2d6b 100%);
          border: 4px solid var(--edge);
          box-shadow: 0 24px 60px rgba(0,0,0,0.6), inset 0 0 90px rgba(0,0,0,0.5);
          cursor: crosshair;
        }
        .boo-banner-scope #bg { position: absolute; inset: 0; width: 100%; height: 100%; }

        .boo-banner-scope .moon {
          position: absolute;
          top: 7%; right: 9%;
          width: clamp(70px, 13vw, 118px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle at 36% 32%, #fffdf2, var(--moon) 55%, #e8d6a4);
          box-shadow:
            0 0 50px rgba(255,246,216,0.55),
            0 0 110px rgba(255,220,150,0.3),
            inset -8px -8px 22px rgba(190,165,110,0.35);
          z-index: 1;
        }
        .boo-banner-scope .crater { position: absolute; border-radius: 50%; background: rgba(190,168,116,0.4); box-shadow: inset 1px 1px 3px rgba(150,125,80,0.5); }
        .boo-banner-scope .c1 { width: 22%; height: 22%; top: 24%; left: 22%; }
        .boo-banner-scope .c2 { width: 14%; height: 14%; top: 52%; left: 54%; }
        .boo-banner-scope .c3 { width: 10%; height: 10%; top: 30%; left: 62%; }

        .boo-banner-scope .fog {
          position: absolute;
          left: -20%; right: -20%;
          height: 120px;
          pointer-events: none;
          z-index: 4;
          background:
            radial-gradient(ellipse 50% 60% at 30% 50%, rgba(220,200,255,0.16), transparent 70%),
            radial-gradient(ellipse 45% 55% at 70% 45%, rgba(200,180,255,0.13), transparent 70%);
          filter: blur(6px);
        }
        .boo-banner-scope .f1 { bottom: 10%; animation: fog 26s linear infinite; }
        .boo-banner-scope .f2 { bottom: 2%;  animation: fog 38s linear infinite reverse; opacity: 0.75; }
        @keyframes fog { from { transform: translateX(-12%); } to { transform: translateX(12%); } }

        .boo-banner-scope .ground { position: absolute; left: 0; right: 0; bottom: 0; height: 32%; z-index: 3; }
        .boo-banner-scope .hills { position: absolute; inset: 0; width: 100%; height: 100%; }
        .boo-banner-scope .hills path { fill: #140a22; }
        .boo-banner-scope .props { position: absolute; inset: 0; }
        .boo-banner-scope .prop { position: absolute; bottom: 8%; transform-origin: 50% 100%; }
        .boo-banner-scope .prop.pumpkin {
          width: 34px; height: 28px;
          border-radius: 50% 50% 46% 46%;
          background: radial-gradient(circle at 36% 32%, #ff9f45, var(--orange) 55%, #c9541a);
          box-shadow: 0 0 22px rgba(255,138,43,0.5);
          animation: squish 2.6s ease-in-out infinite;
        }
        .boo-banner-scope .prop.pumpkin::before {
          content: ''; position: absolute; top: -7px; left: 50%;
          transform: translateX(-50%);
          width: 5px; height: 9px; border-radius: 2px; background: #4a7a2a;
        }
        .boo-banner-scope .prop.pumpkin::after {
          content: ''; position: absolute; inset: 0;
          background:
            radial-gradient(circle 3px at 32% 42%, #2a0d00 99%, transparent),
            radial-gradient(circle 3px at 68% 42%, #2a0d00 99%, transparent),
            radial-gradient(ellipse 7px 4px at 50% 66%, #2a0d00 99%, transparent);
        }
        @keyframes squish { 50% { transform: scaleX(1.07) scaleY(0.94); } }
        .boo-banner-scope .prop.stone {
          width: 26px; height: 34px;
          border-radius: 13px 13px 2px 2px;
          background: #241433;
          box-shadow: inset -3px 0 0 rgba(0,0,0,0.3);
        }
        .boo-banner-scope .prop.tree { width: 3px; height: 54px; background: #1a0e28; }
        .boo-banner-scope .prop.tree::before, .boo-banner-scope .prop.tree::after {
          content: ''; position: absolute;
          width: 20px; height: 3px; background: #1a0e28; border-radius: 2px;
        }
        .boo-banner-scope .prop.tree::before { top: 10px; left: 2px; transform: rotate(-32deg); transform-origin: left; }
        .boo-banner-scope .prop.tree::after  { top: 22px; right: 2px; transform: rotate(28deg); transform-origin: right; }

        /* ══ FLOCK ══ */
        .boo-banner-scope .flock { position: absolute; inset: 0; z-index: 6; }

        .boo-banner-scope .flyer {
          position: absolute;
          left: 0; top: 0;
          width: 62px;
          margin-left: -31px;
          will-change: transform;
          cursor: pointer;
        }
        .boo-banner-scope .flyer.drop { animation: dropIn 0.5s cubic-bezier(.22,1.5,.36,1) backwards; }
        @keyframes dropIn {
          from { opacity: 0; }
        }

        /* ghost */
        .boo-banner-scope .fly-ghost { position: relative; width: 100%; }
        .boo-banner-scope .fly-ghost svg { width: 100%; display: block; }
        .boo-banner-scope .g-body {
          fill: rgba(255,255,255,0.96);
          filter: drop-shadow(0 0 14px rgba(190,220,255,0.55));
        }
        .boo-banner-scope .g-eye { fill: #26133f; transition: ry 0.1s; }
        .boo-banner-scope .g-shine { fill: #fff; }
        .boo-banner-scope .g-mouth { fill: #26133f; transition: rx 0.18s, ry 0.18s; }
        .boo-banner-scope .g-blush { fill: rgba(255,94,196,0.38); }
        .boo-banner-scope .flyer.blink .g-eye { ry: 1.4; }
        .boo-banner-scope .flyer.boo .g-mouth { rx: 13; ry: 16; }
        .boo-banner-scope .flyer.boo .fly-ghost { animation: squeeze 0.4s cubic-bezier(.22,1.5,.36,1); }
        @keyframes squeeze {
          40% { transform: scale(1.25, 0.8); }
          70% { transform: scale(0.9, 1.12); }
        }

        /* the string */
        .boo-banner-scope .string {
          display: block;
          width: 2px;
          height: 13px;
          margin: 0 auto;
          background: rgba(255,255,255,0.4);
          border-radius: 2px;
        }

        /* letter tile */
        .boo-banner-scope .tile {
          width: 42px; height: 42px;
          margin: 0 auto;
          border-radius: 13px;
          display: grid;
          place-items: center;
          font-family: var(--display);
          font-size: 21px;
          color: #1a0c2e;
          border: 3px solid rgba(0,0,0,0.32);
          box-shadow: 0 4px 0 rgba(0,0,0,0.3), inset 0 3px 0 rgba(255,255,255,0.5);
          animation: swing 2.4s ease-in-out infinite;
          transform-origin: 50% -12px;
        }
        @keyframes swing {
          0%,100% { transform: rotate(-7deg); }
          50%     { transform: rotate(7deg); }
        }
        .boo-banner-scope .flyer.pop .tile { animation: tilePop 0.5s cubic-bezier(.22,1.6,.36,1) backwards, swing 2.4s ease-in-out infinite 0.5s; }
        @keyframes tilePop {
          from { transform: scale(0) rotate(-200deg); }
        }

        /* boo bubble */
        .boo-banner-scope .boo-pop {
          position: absolute;
          z-index: 9;
          font-family: var(--display);
          font-size: 28px;
          color: var(--yellow);
          text-shadow: 0 4px 0 #c47f00, 0 0 24px rgba(255,217,61,0.8);
          pointer-events: none;
          transform: translate(-50%, -50%);
        }
        .boo-banner-scope .boo-pop.go { animation: booPop 0.85s cubic-bezier(.22,1.4,.36,1) forwards; }
        @keyframes booPop {
          0%   { opacity: 0; transform: translate(-50%,-50%) scale(0.3) rotate(-14deg); }
          35%  { opacity: 1; transform: translate(-50%,-90%) scale(1.2) rotate(6deg); }
          100% { opacity: 0; transform: translate(-50%,-160%) scale(1) rotate(-4deg); }
        }

        .boo-banner-scope .spark { position: absolute; border-radius: 50%; pointer-events: none; z-index: 5; }
        .boo-banner-scope .conf  { position: absolute; pointer-events: none; z-index: 9; border-radius: 2px; }

        .boo-banner-scope .hint {
          position: absolute;
          left: 50%; bottom: 7%;
          transform: translateX(-50%);
          z-index: 7;
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(255,244,230,0.55);
          background: rgba(20,10,34,0.5);
          padding: 6px 14px;
          border-radius: 999px;
          backdrop-filter: blur(4px);
          pointer-events: none;
          transition: opacity 0.5s;
        }

        /* ══ PANEL ══ */
        .boo-banner-scope .panel {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 14px;
          align-items: center;
          background: linear-gradient(180deg, var(--panel-2), var(--panel));
          border: 4px solid var(--edge);
          border-radius: 20px;
          padding: 14px 18px;
          box-shadow: 0 10px 0 var(--edge), 0 18px 40px rgba(0,0,0,0.5);
        }
        .boo-banner-scope .p-label {
          display: block;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.2em;
          color: var(--purple);
          margin-bottom: 6px;
        }
        .boo-banner-scope .field { position: relative; }
        .boo-banner-scope #name {
          width: 100%;
          background: #16092b;
          border: 3px solid #4b2b7a;
          border-radius: 12px;
          padding: 11px 56px 11px 14px;
          font-family: var(--display);
          font-size: 18px;
          letter-spacing: 0.04em;
          color: var(--cream);
          outline: none;
          transition: all 0.18s;
          box-shadow: inset 0 3px 8px rgba(0,0,0,0.5);
        }
        .boo-banner-scope #name::placeholder { font-family: var(--sans); font-weight: 500; color: #6a4f91; letter-spacing: 0; }
        .boo-banner-scope #name:focus { border-color: var(--lime); box-shadow: inset 0 3px 8px rgba(0,0,0,0.5), 0 0 0 4px rgba(163,243,74,0.16); }
        .boo-banner-scope .count {
          position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%);
          font-size: 11px; font-weight: 700; color: #7a5aa8;
          pointer-events: none;
        }
        .boo-banner-scope .count.full { color: var(--pink); }

        .boo-banner-scope .boo-btn { position: relative; padding: 0; border-radius: 18px; }
        .boo-banner-scope .bb-face {
          display: block; position: relative; z-index: 2;
          font-family: var(--display);
          font-size: clamp(18px, 3.4vw, 26px);
          color: #2a1000;
          padding: 14px 30px;
          border-radius: 18px;
          background: linear-gradient(180deg, #ffc44d, var(--orange) 55%, var(--orange-2));
          border: 3px solid #a33f0a;
          text-shadow: 0 2px 0 rgba(255,255,255,0.35);
          transition: transform 0.1s;
        }
        .boo-banner-scope .bb-shadow { position: absolute; inset: 7px 0 -7px 0; border-radius: 18px; background: #8a3208; z-index: 1; }
        .boo-banner-scope .boo-btn:hover .bb-face { transform: translateY(-2px); }
        .boo-banner-scope .boo-btn:active .bb-face { transform: translateY(6px); }
        .boo-banner-scope .boo-btn.shake { animation: btnShake 0.35s; }
        @keyframes btnShake {
          25% { transform: translateX(-5px) rotate(-2deg); }
          75% { transform: translateX(5px) rotate(2deg); }
        }

        .boo-banner-scope .p-right { display: flex; gap: 10px; align-items: center; justify-content: flex-end; }
        .boo-banner-scope .stat {
          background: #16092b;
          border: 3px solid #4b2b7a;
          border-radius: 12px;
          padding: 7px 13px;
          text-align: center;
          min-width: 62px;
        }
        .boo-banner-scope .stat span { display: block; font-size: 8.5px; font-weight: 700; letter-spacing: 0.16em; color: #7a5aa8; }
        .boo-banner-scope .stat b {
          display: block;
          font-family: var(--display);
          font-size: 18px;
          color: var(--lime);
          line-height: 1.2;
        }
        .boo-banner-scope .stat b.bump { animation: bump 0.35s cubic-bezier(.22,1.6,.36,1); }
        @keyframes bump { 40% { transform: scale(1.5); color: var(--yellow); } }

        .boo-banner-scope .speed { display: flex; flex-direction: column; gap: 5px; }
        .boo-banner-scope .speed span { font-size: 8.5px; font-weight: 700; letter-spacing: 0.16em; color: #7a5aa8; }
        .boo-banner-scope input[type="range"] {
          -webkit-appearance: none; appearance: none;
          width: 84px; height: 7px;
          border-radius: 4px;
          background: #16092b;
          border: 2px solid #4b2b7a;
          outline: none; cursor: grab;
        }
        .boo-banner-scope input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 17px; height: 17px; border-radius: 50%;
          background: radial-gradient(circle at 34% 30%, #d4ff8f, var(--lime) 55%, #6cb01f);
          border: 2px solid #2d5c08; cursor: grab;
        }
        .boo-banner-scope input[type="range"]::-moz-range-thumb {
          width: 17px; height: 17px; border-radius: 50%;
          background: var(--lime); border: 2px solid #2d5c08;
        }

        .boo-banner-scope .meter-row { display: flex; align-items: center; gap: 12px; }
        .boo-banner-scope .m-label, .boo-banner-scope .m-rank {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--purple);
          white-space: nowrap;
        }
        .boo-banner-scope .m-rank { color: var(--lime); min-width: 76px; text-align: right; }
        .boo-banner-scope .meter {
          flex: 1; height: 14px;
          background: #16092b;
          border: 3px solid var(--edge);
          border-radius: 999px;
          overflow: hidden;
        }
        .boo-banner-scope .meter i {
          display: block; height: 100%; width: 0%;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--lime), var(--yellow) 40%, var(--orange) 70%, var(--pink));
          transition: width 0.4s cubic-bezier(.22,1,.36,1);
          box-shadow: 0 0 16px rgba(255,217,61,0.6);
        }

        @media (max-width: 720px) {
          .boo-banner-scope .panel { grid-template-columns: 1fr; gap: 12px; }
          .boo-banner-scope .p-right { justify-content: space-between; }
          .boo-banner-scope .boo-btn, .boo-banner-scope .bb-face { width: 100%; }
          .boo-banner-scope .flyer { width: 48px; margin-left: -24px; }
          .boo-banner-scope .tile { width: 34px; height: 34px; font-size: 17px; }
        }
      `}</style>

      <div ref={rootRef} className="w-full flex justify-center">
        <div className="game">
          {/* ══ SKY ══ */}
          <div className="sky" id="sky">
            <canvas id="bg"></canvas>

            <div className="moon">
              <i className="crater c1"></i>
              <i className="crater c2"></i>
              <i className="crater c3"></i>
            </div>

            <div className="fog f1"></div>
            <div className="fog f2"></div>

            <div className="ground">
              <svg className="hills" viewBox="0 0 1200 180" preserveAspectRatio="none">
                <path d="M0 95 Q150 55 300 85 T600 70 T900 92 T1200 66 V180 H0 Z" />
              </svg>
              <div className="props" id="props"></div>
            </div>

            {/* the flock lives here */}
            <div className="flock" id="flock"></div>

            <div className="hint" id="hint">👆 poke a ghost</div>
          </div>

          {/* ══ CONTROL PANEL ══ */}
          <div className="panel">
            <div className="p-left">
              <label className="p-label" htmlFor="name">YOUR NAME</label>
              <div className="field">
                <input
                  id="name"
                  defaultValue="GHOSTCAT"
                  maxLength={10}
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="type here"
                  aria-label="Name to haunt"
                />
                <span className="count" id="count">8/10</span>
              </div>
            </div>

            <button className="boo-btn" id="boo">
              <span className="bb-face">BOO!</span>
              <span className="bb-shadow"></span>
            </button>

            <div className="p-right">
              <div className="stat">
                <span>SPOOKS</span>
                <b id="spooks">0</b>
              </div>
              <div className="stat">
                <span>LAPS</span>
                <b id="laps">0</b>
              </div>
              <div className="speed">
                <span>SPEED</span>
                <input type="range" id="speed" min="1" max="10" defaultValue="5" />
              </div>
            </div>
          </div>

          <div className="meter-row">
            <span className="m-label">SPOOK METER</span>
            <div className="meter"><i id="meter-fill"></i></div>
            <span className="m-rank" id="rank">MILD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
