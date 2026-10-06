import Phaser from 'phaser';

// ─── Constants ────────────────────────────────────────────────────────────────
const W = 880;
const H = 500;
const FLOOR_Y = H - 40;
const PLAYER_X = 90;
const PLAYER_Y = FLOOR_Y - 42;     // feet on floor

const GRAVITY       = 280;          // px/s²
const MAX_POWER     = 1000;         // px/s at full charge
const MAX_CHARGE_MS = 1500;

const BULLSEYE_R  = 14;
const INNER_R     = 30;
const OUTER_R     = 52;
const BULLSEYE_PTS = 50;
const INNER_PTS    = 25;
const OUTER_PTS    = 10;
const BONE_PTS     = 40;

const C_PRIMARY  = 0xccff00;
const C_DARK     = 0x0b100c;
const C_OFFWHITE = 0xe9f3ea;
const C_GOLD     = 0xffd700;
const C_DARKGRN  = 0x1a3a1a;
const C_MIDGRN   = 0x0d1a0d;

// ─── Types ────────────────────────────────────────────────────────────────────
interface TargetDef {
  cx: number;
  baseY: number;
  amplitude: number;
  speed: number;       // rad/s
  phase: number;
  container: Phaser.GameObjects.Container;
  threadGfx: Phaser.GameObjects.Graphics;
}

interface ArrowData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alive: boolean;
  stuckTimer: number;  // >0 = stuck, 0 = flying
  stuckTargetIndex?: number;
  stuckOffsetY?: number;
  stuckAngle?: number;
}

// ─── Scene ────────────────────────────────────────────────────────────────────
export class MainScene extends Phaser.Scene {

  // ── State ─────────────────────────────────────────────────────────────────
  private score      = 0;
  private arrowsLeft = 5;
  private wind       = 0;     // px/s² horizontal acceleration
  private isCharging = false;
  private chargeStart = 0;
  private mx = W / 2;
  private my = PLAYER_Y - 80;
  private gameOver = false;

  // ── Game objects ──────────────────────────────────────────────────────────
  private mascot!: Phaser.GameObjects.Image;
  private mascotTween!: Phaser.Tweens.Tween;

  // All dynamic drawing goes through one Graphics per logical group
  private bgGfx!:     Phaser.GameObjects.Graphics;  // static bg, drawn once
  private bowGfx!:    Phaser.GameObjects.Graphics;  // redrawn every frame
  private aimGfx!:    Phaser.GameObjects.Graphics;  // redrawn every frame
  private arrowGfx!:  Phaser.GameObjects.Graphics;  // redrawn every frame
  private boneGfx!:   Phaser.GameObjects.Graphics;  // redrawn every frame
  private powerGfx!:  Phaser.GameObjects.Graphics;  // redrawn every frame
  private windGfx!:   Phaser.GameObjects.Graphics;  // redrawn every frame

  private arrows: ArrowData[] = [];
  private targets: TargetDef[] = [];

  // ── Bone ──────────────────────────────────────────────────────────────────
  private boneActive = false;
  private boneX = 0;
  private boneY = 0;
  private boneBaseY = 0;
  private bonePhase = 0;

  // ── HUD texts ─────────────────────────────────────────────────────────────
  private scoreText!:  Phaser.GameObjects.Text;
  private arrowText!:  Phaser.GameObjects.Text;
  private feedText!:   Phaser.GameObjects.Text;
  private powerLabel!: Phaser.GameObjects.Text;

  // ── Game-over overlay ─────────────────────────────────────────────────────
  private goOverlay!: Phaser.GameObjects.Container;

  constructor() { super({ key: 'MainScene' }); }

  // ── Preload ───────────────────────────────────────────────────────────────
  preload() {
    const url = (window as any).__GH_MASCOT__;
    if (url) this.load.image('mascot', url);
  }

  // ── Create ────────────────────────────────────────────────────────────────
  create() {
    this.score      = 0;
    this.arrowsLeft = 5;
    this.gameOver   = false;
    this.isCharging = false;
    this.arrows     = [];
    this.boneActive = false;
    this.randomiseWind();

    // Depth order (low → high):  0 bg  |  2 threads  |  3 arrows  |  4 targets  |  5 mascot  |  6 bow/aim  |  8 bone  |  10 hud  |  20 power  |  30 overlay
    this.bgGfx     = this.add.graphics().setDepth(0);
    this.drawBackground();                                    // drawn once

    this.buildTargets();

    this.arrowGfx  = this.add.graphics().setDepth(6);
    this.aimGfx    = this.add.graphics().setDepth(6);
    this.bowGfx    = this.add.graphics().setDepth(7);
    this.boneGfx   = this.add.graphics().setDepth(8);
    this.windGfx   = this.add.graphics().setDepth(10);
    this.powerGfx  = this.add.graphics().setDepth(20);

    // this.buildMascot();
    this.buildHUD();
    this.buildGameOver();

    // Input
    this.input.on('pointerdown', this.onDown, this);
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => { this.mx = p.x; this.my = p.y; });
    this.input.on('pointerup',   this.onUp,   this);

    // Timers
    this.time.addEvent({ delay: 6000, loop: true, callback: this.randomiseWind,  callbackScope: this });
    this.time.addEvent({ delay: 9000, loop: true, callback: this.maybeSpawnBone, callbackScope: this });
  }

  // ── Update ────────────────────────────────────────────────────────────────
  update(_t: number, rawDelta: number) {
    if (this.gameOver) return;
    const dt = Math.min(rawDelta, 50) / 1000;   // seconds, cap at 50 ms

    this.animateTargets(dt);
    this.tickArrows(dt);
    this.tickBone(dt);

    // Redraw dynamic layers
    this.drawArrows();
    this.drawBow();
    this.drawAim();
    this.drawBone();
    this.drawHUD();
    this.drawPower();
  }

  // ══════════════════════════════════════════════════════════════════════════
  // BACKGROUND  (drawn once in create)
  // ══════════════════════════════════════════════════════════════════════════
  private drawBackground() {
    const g = this.bgGfx;
    g.fillStyle(C_DARK);
    g.fillRect(0, 0, W, H);

    // Subtle scanlines
    g.fillStyle(0x0e1a0e, 0.45);
    for (let y = 0; y < H; y += 18) g.fillRect(0, y, W, 1);

    this.drawTreeLayer(g, 0x0c1a0c, 80, 130, 22, 0,  H - 105);
    this.drawTreeLayer(g, 0x0e2110, 55, 100, 20, 25, H -  65);
    this.drawTreeLayer(g, 0x102a12, 38,  72, 18, 55, FLOOR_Y);

    // Ground
    g.fillStyle(C_MIDGRN);
    g.fillRect(0, FLOOR_Y, W, H - FLOOR_Y);

    // Ground edge
    g.fillStyle(C_PRIMARY, 0.28);
    g.fillRect(0, FLOOR_Y, W, 2);

    // Grid on ground
    g.fillStyle(0x1a3a1a, 0.45);
    for (let x = 0; x < W; x += 40) g.fillRect(x, FLOOR_Y, 1, H - FLOOR_Y);
  }

  private drawTreeLayer(
    g: Phaser.GameObjects.Graphics,
    color: number, minH: number, maxH: number,
    count: number, xOff: number, baseY: number
  ) {
    g.fillStyle(color);
    const spacing = (W + 60) / count;
    for (let i = 0; i < count; i++) {
      const x  = xOff + i * spacing + Math.sin(i * 1.93) * 18;
      const h  = minH + ((i * 77 + 13) % (maxH - minH));
      const hw = h * 0.34;
      g.fillTriangle(x - hw, baseY, x + hw, baseY, x, baseY - h);
      g.fillTriangle(x - hw * 0.55, baseY - h * 0.38,
                     x + hw * 0.55, baseY - h * 0.38,
                     x, baseY - h * 1.22);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // TARGETS
  // ══════════════════════════════════════════════════════════════════════════
  private buildTargets() {
    const defs = [
      { cx: 380, baseY: 200, amplitude: 55, speed: 0.7,  phase: 0 },
      { cx: 570, baseY: 255, amplitude: 42, speed: 1.0,  phase: Math.PI },
      { cx: 740, baseY: 190, amplitude: 62, speed: 0.55, phase: Math.PI / 2 },
    ];

    for (const d of defs) {
      // Hanging thread (redrawn with target movement)
      const threadGfx = this.add.graphics().setDepth(2);

      // Concentric rings as native Phaser Arc objects — most reliable rendering
      const outer  = this.add.arc(0, 0, OUTER_R,    0, 360, false, C_DARKGRN).setStrokeStyle(2.5, C_PRIMARY, 0.9);
      const inner  = this.add.arc(0, 0, INNER_R,    0, 360, false, 0x112911) .setStrokeStyle(2,   C_PRIMARY, 0.6);
      const bull   = this.add.arc(0, 0, BULLSEYE_R, 0, 360, false, C_PRIMARY);
      const center = this.add.arc(0, 0, 4,           0, 360, false, C_DARK);

      const container = this.add.container(d.cx, d.baseY, [outer, inner, bull, center]).setDepth(4);

      this.targets.push({
        cx: d.cx, baseY: d.baseY,
        amplitude: d.amplitude, speed: d.speed, phase: d.phase,
        container, threadGfx,
      });
    }
  }

  private animateTargets(dt: number) {
    for (const t of this.targets) {
      t.phase += t.speed * dt;
      const cy = this.targetCY(t);
      t.container.setPosition(t.cx, cy);
      t.threadGfx.clear();
      t.threadGfx.lineStyle(1.5, C_OFFWHITE, 0.22);
      t.threadGfx.lineBetween(t.cx, 0, t.cx, cy - OUTER_R);
    }
  }

  private targetCY(t: TargetDef) {
    return t.baseY + Math.sin(t.phase) * t.amplitude;
  }

  // ══════════════════════════════════════════════════════════════════════════
  // MASCOT  (smaller + floating animation)
  // ══════════════════════════════════════════════════════════════════════════
  private buildMascot() {
    if (!this.textures.exists('mascot')) return;

    // Scale down so the character is game-appropriate
    this.mascot = this.add.image(PLAYER_X, PLAYER_Y, 'mascot')
      .setScale(0.18)
      .setDepth(5)
      .setOrigin(0.5, 1);   // anchor to feet

    // Gentle floating idle: bob up 6 px over 900 ms, then back
    this.mascotTween = this.tweens.add({
      targets: this.mascot,
      y:        PLAYER_Y - 6,
      duration: 900,
      ease:     'Sine.easeInOut',
      yoyo:     true,
      repeat:   -1,
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // BOW  (drawn every frame onto bowGfx)
  // ══════════════════════════════════════════════════════════════════════════
  private drawBow() {
    const g = this.bowGfx;
    g.clear();

    const angle  = Math.atan2(this.my - PLAYER_Y, this.mx - PLAYER_X);
    const power  = this.isCharging ? this.chargePower() : 0;
    const pull   = power / MAX_POWER;                 // 0..1

    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const bowR = 22;                                  // half-length of bow

    // Bow endpoints (perpendicular to aim direction)
    const topX = PLAYER_X + sinA  * bowR;
    const topY = PLAYER_Y - cosA  * bowR;
    const botX = PLAYER_X - sinA  * bowR;
    const botY = PLAYER_Y + cosA  * bowR;

    // String midpoint (pulled back when charging)
    const pullDist = bowR * 0.85 * pull;
    const midX = PLAYER_X - cosA * pullDist;
    const midY = PLAYER_Y - sinA * pullDist;

    // Bow limb
    g.lineStyle(3, 0xa07030, 1);
    g.beginPath();
    g.moveTo(topX, topY);
    // Slight curve via a quadratic approximation
    const curveX = PLAYER_X + cosA * 5;
    const curveY = PLAYER_Y + sinA * 5;
    g.lineTo(curveX, curveY);
    g.lineTo(botX, botY);
    g.strokePath();

    // String
    g.lineStyle(1.5, C_OFFWHITE, 0.85);
    g.lineBetween(topX, topY, midX, midY);
    g.lineBetween(botX, botY, midX, midY);

    // Nocked arrow on string (only if we still have arrows)
    if (this.arrowsLeft > 0) {
      const tipX = midX + cosA * 30;
      const tipY = midY + sinA * 30;
      g.lineStyle(2.5, C_PRIMARY, 0.9);
      g.lineBetween(midX - cosA * 4, midY - sinA * 4, tipX, tipY);
      g.fillStyle(C_PRIMARY);
      g.fillCircle(tipX, tipY, 3.5);
      // Feather
      g.lineStyle(1.5, 0xa08040, 0.8);
      const fx = midX - cosA * 6;
      const fy = midY - sinA * 6;
      g.lineBetween(fx + sinA * 5, fy - cosA * 5, fx, fy);
      g.lineBetween(fx - sinA * 5, fy + cosA * 5, fx, fy);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // AIM TRAJECTORY  (dotted arc preview)
  // ══════════════════════════════════════════════════════════════════════════
  private drawAim() {
    const g = this.aimGfx;
    g.clear();
    if (!this.isCharging || this.arrowsLeft <= 0) return;

    const angle = Math.atan2(this.my - PLAYER_Y, this.mx - PLAYER_X);
    const power = this.chargePower();
    let px = PLAYER_X, py = PLAYER_Y;
    let vx = Math.cos(angle) * power;
    let vy = Math.sin(angle) * power;
    const step = 0.055;

    for (let i = 0; i < 26; i++) {
      px += vx * step;
      py += vy * step;
      vx += this.wind  * step;
      vy += GRAVITY * step;
      if (py > FLOOR_Y || px > W + 10 || px < -10) break;
      const alpha  = Math.max(0, 0.52 - i * 0.018);
      const radius = Math.max(0.8, 3 - i * 0.09);
      g.fillStyle(C_PRIMARY, alpha);
      g.fillCircle(px, py, radius);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // ARROWS  (all arrows drawn onto one Graphics, cleared each frame)
  // ══════════════════════════════════════════════════════════════════════════
  private fireArrow(power: number) {
    if (this.arrowsLeft <= 0 || this.gameOver) return;
    this.arrowsLeft--;

    const angle = Math.atan2(this.my - PLAYER_Y, this.mx - PLAYER_X);

    this.arrows.push({
      x: PLAYER_X + Math.cos(angle) * 25,
      y: PLAYER_Y + Math.sin(angle) * 25,
      vx: Math.cos(angle) * power,
      vy: Math.sin(angle) * power,
      alive: true,
      stuckTimer: 0,
    });

    if (this.arrowsLeft === 0) {
      this.time.delayedCall(2800, () => this.tryGameOver(), [], this);
    }
  }

  private tickArrows(dt: number) {
    for (const a of this.arrows) {
      if (!a.alive) continue;

      if (a.stuckTimer > 0) {
        a.stuckTimer -= dt;
        if (a.stuckTimer <= 0) {
          a.alive = false;
        } else if (a.stuckTargetIndex !== undefined && a.stuckTargetIndex !== -1) {
          const t = this.targets[a.stuckTargetIndex];
          if (t) {
            a.y = this.targetCY(t) + (a.stuckOffsetY || 0);
          }
        }
        continue;
      }

      // Physics
      a.vx += this.wind   * dt;
      a.vy += GRAVITY * dt;
      a.x  += a.vx * dt;
      a.y  += a.vy * dt;

      // Floor
      if (a.y >= FLOOR_Y) {
        a.y = FLOOR_Y - 2;
        a.vx = 0; a.vy = 0;
        a.stuckTimer = 2.5;
        a.stuckTargetIndex = -1;
        continue;
      }

      // Off screen
      if (a.x > W + 80 || a.x < -80 || a.y < -80) {
        a.alive = false;
        continue;
      }

      // Collision check
      this.checkHit(a);
    }

    // Prune dead
    this.arrows = this.arrows.filter(a => a.alive);
  }

  /** Draw ALL arrows onto arrowGfx (cleared each frame) */
  private drawArrows() {
    const g = this.arrowGfx;
    g.clear();

    for (const a of this.arrows) {
      if (!a.alive) continue;

      const isFlying = a.stuckTimer === 0;
      let angle = 0;

      if (isFlying) {
        angle = Math.atan2(a.vy, a.vx);
      } else if (a.stuckTargetIndex !== undefined && a.stuckTargetIndex !== -1) {
        angle = a.stuckAngle || 0;
      } else {
        // Stuck in floor — nearly horizontal
        angle = -0.15;
      }

      const tailLen = 16;
      const tailX = a.x - Math.cos(angle) * tailLen;
      const tailY = a.y - Math.sin(angle) * tailLen;

      // Arrow shaft
      g.lineStyle(2.5, C_OFFWHITE, 1);
      g.lineBetween(tailX, tailY, a.x, a.y);

      // Tip
      g.fillStyle(C_PRIMARY);
      g.fillCircle(a.x, a.y, 3.5);

      // Feather at tail
      g.lineStyle(1.5, 0xa08040, 0.85);
      const fx = tailX - Math.cos(angle) * 3;
      const fy = tailY - Math.sin(angle) * 3;
      g.lineBetween(fx + Math.sin(angle) * 5, fy - Math.cos(angle) * 5, fx, fy);
      g.lineBetween(fx - Math.sin(angle) * 5, fy + Math.cos(angle) * 5, fx, fy);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // COLLISION
  // ══════════════════════════════════════════════════════════════════════════
  private checkHit(a: ArrowData) {
    // Bone
    if (this.boneActive) {
      if (Math.hypot(a.x - this.boneX, a.y - this.boneY) < 28) {
        this.score += BONE_PTS;
        this.arrowsLeft++;
        this.boneActive = false;
        this.boneGfx.clear();
        a.stuckTimer = 0.15;
        this.flashFeedback(`+${BONE_PTS}  BONE! +1 ARROW`, C_GOLD);
        return;
      }
    }

    // Targets
    for (let i = 0; i < this.targets.length; i++) {
      const t = this.targets[i];
      const cy   = this.targetCY(t);
      const dist = Math.hypot(a.x - t.cx, a.y - cy);
      if (dist > OUTER_R) continue;

      let pts = OUTER_PTS, label = 'HIT!';
      if      (dist <= BULLSEYE_R) { pts = BULLSEYE_PTS; label = 'BULLSEYE!'; }
      else if (dist <= INNER_R)    { pts = INNER_PTS;    label = 'INNER';     }

      this.score += pts;
      a.stuckTimer = 2.0;
      a.stuckTargetIndex = i;
      a.stuckOffsetY = a.y - cy;
      a.stuckAngle = Math.atan2(a.vy, a.vx);
      a.vx = 0;
      a.vy = 0;
      this.flashFeedback(`+${pts}  ${label}`, pts === BULLSEYE_PTS ? C_PRIMARY : C_OFFWHITE);
      return;
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // BONE BONUS
  // ══════════════════════════════════════════════════════════════════════════
  private maybeSpawnBone() {
    if (this.gameOver || this.boneActive) return;
    if (Math.random() < 0.55) {
      this.boneX = 340 + Math.random() * 360;
      this.boneBaseY = 135 + Math.random() * 145;
      this.boneY = this.boneBaseY;
      this.bonePhase = 0;
      this.boneActive = true;
    }
  }

  private tickBone(dt: number) {
    if (!this.boneActive) return;
    this.bonePhase += 1.3 * dt;
    this.boneY = this.boneBaseY + Math.sin(this.bonePhase) * 16;
  }

  private drawBone() {
    const g = this.boneGfx;
    g.clear();
    if (!this.boneActive) return;

    const { boneX: x, boneY: y } = this;

    // Glow ring
    g.lineStyle(2, C_GOLD, 0.4);
    g.strokeCircle(x, y, 26);

    // Shaft
    g.fillStyle(C_GOLD);
    g.fillRect(x - 13, y - 4, 26, 8);

    // End knobs (2 per side)
    for (const bx of [x - 17, x + 17]) {
      g.fillCircle(bx, y - 5, 6);
      g.fillCircle(bx, y + 5, 6);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // HUD
  // ══════════════════════════════════════════════════════════════════════════
  private buildHUD() {
    const lbl = (s: string): Phaser.Types.GameObjects.Text.TextStyle => ({
      fontFamily: 'Poppins, sans-serif', fontSize: '11px',
      color: '#4a7a4a', letterSpacing: 3,
    });
    const val = (s: string, big = false): Phaser.Types.GameObjects.Text.TextStyle => ({
      fontFamily: 'Poppins, sans-serif', fontSize: big ? '28px' : '20px',
      fontStyle: 'bold', color: '#ccff00',
    });

    // Score
    this.add.text(20, 14, 'PURSE',  lbl('')).setDepth(10);
    this.scoreText = this.add.text(20, 30, '0', val('', true)).setDepth(10);

    // Wind label (static) — indicator drawn on windGfx
    this.add.text(W / 2, 14, 'WIND', { ...lbl(''), align: 'center' } as any)
      .setOrigin(0.5, 0).setDepth(10);

    // Arrows
    this.add.text(W - 20, 14, 'ARROWS', lbl('')).setOrigin(1, 0).setDepth(10);
    this.arrowText = this.add.text(W - 20, 32, '|||||', val('')).setOrigin(1, 0).setDepth(10);

    // Feedback flash
    this.feedText = this.add.text(W / 2, H / 2 - 60, '', {
      fontFamily: 'Poppins, sans-serif', fontSize: '34px', fontStyle: 'bold',
      color: '#ccff00', stroke: '#0b100c', strokeThickness: 6,
    } as any).setOrigin(0.5).setDepth(25).setAlpha(0);

    // Power bar label (shows only while charging)
    this.powerLabel = this.add.text(20, H - 44, 'POWER', {
      fontFamily: 'Poppins, sans-serif', fontSize: '10px',
      color: '#4a7a4a', letterSpacing: '3',
    } as any).setDepth(20).setAlpha(0);
  }

  private drawHUD() {
    this.scoreText.setText(String(this.score));
    this.arrowText.setText('|'.repeat(Math.max(0, this.arrowsLeft)));

    // Wind indicator
    const g = this.windGfx;
    g.clear();
    const wx = W / 2, wy = 40;
    const maxLen = 52;
    const len = Math.min(Math.abs(this.wind) / 260 * maxLen, maxLen);
    const dir = this.wind >= 0 ? 1 : -1;
    const col = Math.abs(this.wind) < 25 ? 0x3a5a3a : C_PRIMARY;

    if (len > 3) {
      g.lineStyle(2.5, col, 0.9);
      g.lineBetween(wx - len * dir * 0.5, wy, wx + len * dir * 0.5, wy);
      g.fillStyle(col);
      const tip = wx + len * dir * 0.5;
      g.fillTriangle(tip, wy, tip - dir * 9, wy - 5, tip - dir * 9, wy + 5);
    } else {
      g.fillStyle(0x3a6a3a, 0.8);
      g.fillCircle(wx, wy, 4);
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // POWER BAR
  // ══════════════════════════════════════════════════════════════════════════
  private drawPower() {
    const g = this.powerGfx;
    g.clear();
    this.powerLabel.setAlpha(this.isCharging ? 1 : 0);
    if (!this.isCharging) return;

    const bw = 130, bh = 10, bx = 20, by = H - 28;
    const t  = Math.min((Date.now() - this.chargeStart) / MAX_CHARGE_MS, 1);
    const fw = t * bw;
    const col = t > 0.8 ? 0xff4444 : t > 0.5 ? 0xffaa00 : C_PRIMARY;

    g.fillStyle(0x1a3a1a, 0.9);
    g.fillRoundedRect(bx, by, bw, bh, 4);
    g.lineStyle(1.5, C_PRIMARY, 0.3);
    g.strokeRoundedRect(bx, by, bw, bh, 4);
    g.fillStyle(col, 0.95);
    g.fillRoundedRect(bx, by, fw, bh, 4);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // FEEDBACK
  // ══════════════════════════════════════════════════════════════════════════
  private flashFeedback(msg: string, color: number) {
    const hex = '#' + color.toString(16).padStart(6, '0');
    this.feedText.setText(msg).setColor(hex).setAlpha(1).setScale(1.15).setY(H / 2 - 60);
    this.tweens.killTweensOf(this.feedText);
    this.tweens.add({
      targets:  this.feedText,
      alpha:    0,
      scaleX:   1,
      scaleY:   1,
      y:        H / 2 - 96,
      duration: 1100,
      ease:     'Quad.easeOut',
    });
  }

  // ══════════════════════════════════════════════════════════════════════════
  // GAME OVER
  // ══════════════════════════════════════════════════════════════════════════
  private tryGameOver() {
    const anyFlying = this.arrows.some(a => a.alive && a.stuckTimer === 0);
    if (anyFlying) {
      this.time.delayedCall(600, () => this.tryGameOver(), [], this);
      return;
    }
    this.gameOver = true;
    this.goOverlay.setVisible(true);
    (this.goOverlay.getAt(1) as Phaser.GameObjects.Text).setText(String(this.score));
  }

  private buildGameOver() {
    const panel = this.add.graphics();
    panel.fillStyle(C_DARK, 0.88);
    panel.fillRect(0, 0, W, H);

    const finalScore = this.add.text(W / 2, H / 2 - 15, '0', {
      fontFamily: 'Poppins, sans-serif', fontSize: '60px',
      fontStyle: 'bold', color: '#e9f3ea',
    } as any).setOrigin(0.5);

    const title = this.add.text(W / 2, H / 2 - 90, 'GAME OVER', {
      fontFamily: 'Poppins, sans-serif', fontSize: '44px',
      fontStyle: 'bold', color: '#ccff00',
      stroke: '#0b100c', strokeThickness: 6,
    } as any).setOrigin(0.5);

    const pts = this.add.text(W / 2, H / 2 + 38, 'POINTS', {
      fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#4a7a4a',
    } as any).setOrigin(0.5);

    const btn = this.add.text(W / 2, H / 2 + 108, '[ PLAY AGAIN ]', {
      fontFamily: 'Poppins, sans-serif', fontSize: '20px',
      fontStyle: 'bold', color: '#0b100c',
      backgroundColor: '#ccff00', padding: { x: 24, y: 12 },
    } as any).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => { btn.setColor('#ccff00'); btn.setBackgroundColor('#0b100c'); });
    btn.on('pointerout',  () => { btn.setColor('#0b100c'); btn.setBackgroundColor('#ccff00'); });
    btn.on('pointerdown', () => this.scene.restart());

    this.goOverlay = this.add.container(0, 0, [panel, finalScore, title, pts, btn])
      .setDepth(30).setVisible(false);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // HELPERS
  // ══════════════════════════════════════════════════════════════════════════
  private randomiseWind() {
    this.wind = (Math.random() - 0.5) * 290;   // ±145 px/s²
  }

  private chargePower() {
    if (!this.isCharging) return 0;
    return Math.min((Date.now() - this.chargeStart) / MAX_CHARGE_MS, 1) * MAX_POWER;
  }

  private onDown(p: Phaser.Input.Pointer) {
    if (this.gameOver || this.arrowsLeft <= 0) return;
    this.isCharging  = true;
    this.chargeStart = Date.now();
    this.mx = p.x;
    this.my = p.y;
  }

  private onUp(p: Phaser.Input.Pointer) {
    if (!this.isCharging) return;
    const power = this.chargePower();
    this.isCharging = false;
    this.mx = p.x;
    this.my = p.y;
    if (!this.gameOver && power > 30) this.fireArrow(power);
  }
}
