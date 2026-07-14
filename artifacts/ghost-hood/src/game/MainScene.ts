import Phaser from 'phaser';

// ─── Constants ────────────────────────────────────────────────────────────────
const W = 880;
const H = 500;
const FLOOR_Y = H - 40;
const PLAYER_X = 100;
const PLAYER_Y = FLOOR_Y - 55;

const GRAVITY = 270;        // px/s²
const MAX_POWER = 950;      // px/s at full charge
const MAX_CHARGE_MS = 1500;

const BULLSEYE_R = 14;
const INNER_R = 30;
const OUTER_R = 52;
const BULLSEYE_PTS = 50;
const INNER_PTS = 25;
const OUTER_PTS = 10;
const BONE_PTS = 40;

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
  speed: number;         // radians/s
  phase: number;
  rings: Phaser.GameObjects.Arc[];
  thread: Phaser.GameObjects.Line;
  container: Phaser.GameObjects.Container;
}

interface ArrowData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  line: Phaser.GameObjects.Line;
  tip: Phaser.GameObjects.Arc;
  alive: boolean;
  stuckTimer: number;
}

// ─── Scene ────────────────────────────────────────────────────────────────────
export class MainScene extends Phaser.Scene {
  // State
  private score = 0;
  private arrowsLeft = 5;
  private wind = 0;
  private isCharging = false;
  private chargeStart = 0;
  private mx = W / 2;
  private my = PLAYER_Y - 100;
  private gameOver = false;

  // Display
  private mascot!: Phaser.GameObjects.Image;
  private bowGfx!: Phaser.GameObjects.Graphics;
  private aimGfx!: Phaser.GameObjects.Graphics;
  private arrowPool: ArrowData[] = [];

  // Targets
  private targets: TargetDef[] = [];

  // Bone
  private boneGfx!: Phaser.GameObjects.Graphics;
  private boneActive = false;
  private boneX = 0;
  private boneY = 0;
  private boneBaseY = 0;
  private bonePhase = 0;

  // HUD
  private scoreText!: Phaser.GameObjects.Text;
  private windGfx!: Phaser.GameObjects.Graphics;
  private arrowText!: Phaser.GameObjects.Text;
  private feedText!: Phaser.GameObjects.Text;
  private powerGfx!: Phaser.GameObjects.Graphics;
  private powerLabel!: Phaser.GameObjects.Text;

  // Game over
  private goOverlay!: Phaser.GameObjects.Container;

  constructor() { super({ key: 'MainScene' }); }

  // ── Preload ───────────────────────────────────────────────────────────────
  preload() {
    const url = (window as any).__GH_MASCOT__;
    if (url) this.load.image('mascot', url);
  }

  // ── Create ────────────────────────────────────────────────────────────────
  create() {
    this.score = 0;
    this.arrowsLeft = 5;
    this.gameOver = false;
    this.isCharging = false;
    this.arrowPool = [];
    this.boneActive = false;
    this.randomiseWind();

    this.drawBackground();
    this.buildTargets();
    this.buildMascot();
    this.buildHUD();
    this.buildGameOver();

    // Graphics layers drawn every frame
    this.aimGfx   = this.add.graphics().setDepth(8);
    this.bowGfx   = this.add.graphics().setDepth(9);
    this.boneGfx  = this.add.graphics().setDepth(7);
    this.powerGfx = this.add.graphics().setDepth(15);

    // Input
    this.input.on('pointerdown', this.onDown, this);
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => { this.mx = p.x; this.my = p.y; });
    this.input.on('pointerup',   this.onUp,   this);

    // Wind timer
    this.time.addEvent({ delay: 6000, loop: true, callback: this.randomiseWind, callbackScope: this });
    // Bone timer
    this.time.addEvent({ delay: 9000, loop: true, callback: this.maybeSpawnBone, callbackScope: this });
  }

  // ── Update ────────────────────────────────────────────────────────────────
  update(_t: number, rawDelta: number) {
    if (this.gameOver) return;
    const dt = Math.min(rawDelta, 50) / 1000;

    this.animateTargets(dt);
    this.tickArrows(dt);
    this.tickBone(dt);
    this.drawBow();
    this.drawAimDots();
    this.drawHUD();
    this.drawBone();
    this.drawPower();
  }

  // ── Background (drawn once) ───────────────────────────────────────────────
  private drawBackground() {
    const g = this.add.graphics().setDepth(0);

    // Sky
    g.fillStyle(C_DARK);
    g.fillRect(0, 0, W, H);

    // Scanlines
    for (let y = 0; y < H; y += 18) {
      g.fillStyle(0x111a11, 0.4);
      g.fillRect(0, y, W, 1);
    }

    // Trees — back layer
    this.drawTreeLayer(g, 0x0d1a0d, 85, 130, 22, 0, H - 110);
    // Trees — mid layer
    this.drawTreeLayer(g, 0x0f2210, 55, 100, 20, 30, H - 70);
    // Trees — front layer
    this.drawTreeLayer(g, 0x112914, 40, 75, 18, 60, FLOOR_Y);

    // Ground
    g.fillStyle(C_MIDGRN);
    g.fillRect(0, FLOOR_Y, W, H - FLOOR_Y);

    // Ground highlight
    g.fillStyle(C_PRIMARY, 0.3);
    g.fillRect(0, FLOOR_Y, W, 2);

    // Grid lines on ground
    g.fillStyle(0x1a3a1a, 0.5);
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
      const x  = xOff + i * spacing + Math.sin(i * 1.9) * 18;
      const h  = minH + ((i * 77 + 13) % (maxH - minH));
      const hw = h * 0.35;
      g.fillTriangle(x - hw, baseY, x + hw, baseY, x, baseY - h);
      g.fillTriangle(x - hw * 0.5, baseY - h * 0.4, x + hw * 0.5, baseY - h * 0.4, x, baseY - h * 1.2);
    }
  }

  // ── Targets ────────────────────────────────────────────────────────────────
  private buildTargets() {
    const defs = [
      { cx: 380, baseY: 200, amplitude: 55, speed: 0.7, phase: 0 },
      { cx: 570, baseY: 255, amplitude: 42, speed: 1.0, phase: Math.PI },
      { cx: 740, baseY: 190, amplitude: 62, speed: 0.55, phase: Math.PI / 2 },
    ];

    for (const d of defs) {
      // Thread (line from top to target)
      const thread = this.add.line(0, 0, d.cx, 0, d.cx, d.baseY, C_OFFWHITE, 0.25).setDepth(3);

      // Rings as native Arc objects (persistent, no redraw needed)
      const outer  = this.add.arc(d.cx, d.baseY, OUTER_R, 0, 360, false, C_DARKGRN).setDepth(4);
      const inner  = this.add.arc(d.cx, d.baseY, INNER_R, 0, 360, false, 0x112911).setDepth(4);
      const bull   = this.add.arc(d.cx, d.baseY, BULLSEYE_R, 0, 360, false, C_PRIMARY).setDepth(4);
      const center = this.add.arc(d.cx, d.baseY, 4, 0, 360, false, C_DARK).setDepth(4);

      // Stroke rings with #CCFF00
      outer.setStrokeStyle(2.5, C_PRIMARY, 0.9);
      inner.setStrokeStyle(2,   C_PRIMARY, 0.65);

      // Group all rings so we can move them together
      const container = this.add.container(d.cx, d.baseY, [outer, inner, bull, center]).setDepth(4);
      // Container positions are relative so reset arc positions to 0,0
      outer.setPosition(0, 0);
      inner.setPosition(0, 0);
      bull.setPosition(0, 0);
      center.setPosition(0, 0);

      this.targets.push({
        cx: d.cx,
        baseY: d.baseY,
        amplitude: d.amplitude,
        speed: d.speed,
        phase: d.phase,
        rings: [outer, inner, bull, center],
        thread,
        container,
      });
    }
  }

  private animateTargets(dt: number) {
    for (const t of this.targets) {
      t.phase += t.speed * dt;
      const cy = t.baseY + Math.sin(t.phase) * t.amplitude;
      t.container.setPosition(t.cx, cy);
      // Update thread endpoint
      t.thread.setTo(t.cx, 0, t.cx, cy - OUTER_R);
    }
  }

  private targetCY(t: TargetDef) {
    return t.baseY + Math.sin(t.phase) * t.amplitude;
  }

  // ── Mascot ────────────────────────────────────────────────────────────────
  private buildMascot() {
    if (this.textures.exists('mascot')) {
      this.mascot = this.add.image(PLAYER_X, PLAYER_Y - 8, 'mascot')
        .setScale(0.042)
        .setBlendMode(Phaser.BlendModes.SCREEN)
        .setDepth(6);
    }
  }

  // ── HUD ───────────────────────────────────────────────────────────────────
  private buildHUD() {
    const labelStyle = { fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#5a8a5a', letterSpacing: 3 };
    const valStyle   = { fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontStyle: 'bold', color: '#ccff00' };
    const arrStyle   = { fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontStyle: 'bold', color: '#ccff00' };

    this.add.text(20, 14, 'PURSE', labelStyle as any).setDepth(20);
    this.scoreText = this.add.text(20, 30, '0', valStyle as any).setDepth(20);

    this.add.text(W / 2, 14, 'WIND', { ...labelStyle, align: 'center' } as any).setOrigin(0.5, 0).setDepth(20);
    this.windGfx = this.add.graphics().setDepth(20);

    this.add.text(W - 20, 14, 'ARROWS', { ...labelStyle } as any).setOrigin(1, 0).setDepth(20);
    this.arrowText = this.add.text(W - 20, 32, '|||||', arrStyle as any).setOrigin(1, 0).setDepth(20);

    this.feedText = this.add.text(W / 2, H / 2 - 60, '', {
      fontFamily: 'Poppins, sans-serif', fontSize: '34px', fontStyle: 'bold',
      color: '#ccff00', stroke: '#0b100c', strokeThickness: 6,
    } as any).setOrigin(0.5).setDepth(25).setAlpha(0);

    this.powerLabel = this.add.text(20, H - 42, 'POWER', {
      fontFamily: 'Poppins, sans-serif', fontSize: '10px', color: '#5a8a5a', letterSpacing: 3,
    } as any).setDepth(15).setAlpha(0);
  }

  private drawHUD() {
    this.scoreText.setText(String(this.score));
    this.arrowText.setText('|'.repeat(Math.max(0, this.arrowsLeft)));

    // Wind indicator
    const g = this.windGfx;
    g.clear();
    const wx = W / 2;
    const wy = 40;
    const maxLen = 50;
    const len = Math.min(Math.abs(this.wind) / 250 * maxLen, maxLen);
    const dir = this.wind >= 0 ? 1 : -1;
    const col = Math.abs(this.wind) < 30 ? 0x3a5a3a : C_PRIMARY;
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

  // ── Bow & Aim ─────────────────────────────────────────────────────────────
  private drawBow() {
    const g = this.bowGfx;
    g.clear();

    const angle   = Math.atan2(this.my - PLAYER_Y, this.mx - PLAYER_X);
    const power   = this.isCharging ? this.chargePower() : 0;
    const pull    = power / MAX_POWER;

    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const bowLen = 26;

    // Bow arc endpoints (perpendicular to aim)
    const topX = PLAYER_X + sinA  * bowLen * 0.75;
    const topY = PLAYER_Y - cosA  * bowLen * 0.75;
    const botX = PLAYER_X - sinA  * bowLen * 0.75;
    const botY = PLAYER_Y + cosA  * bowLen * 0.75;

    // String midpoint (pulled back)
    const midX = PLAYER_X - cosA * (bowLen * 0.8 * pull);
    const midY = PLAYER_Y - sinA * (bowLen * 0.8 * pull);

    // Bow limbs
    g.lineStyle(3, 0xa07030, 1);
    g.lineBetween(topX, topY, botX, botY);

    // String
    g.lineStyle(1.5, C_OFFWHITE, 0.8);
    g.lineBetween(topX, topY, midX, midY);
    g.lineBetween(botX, botY, midX, midY);

    // Nocked arrow
    if (this.arrowsLeft > 0) {
      const tipX = midX + cosA * 28;
      const tipY = midY + sinA * 28;
      g.lineStyle(2, C_PRIMARY, 0.85);
      g.lineBetween(midX - cosA * 4, midY - sinA * 4, tipX, tipY);
      // Tip dot
      g.fillStyle(C_PRIMARY);
      g.fillCircle(tipX, tipY, 3);
    }
  }

  private drawAimDots() {
    const g = this.aimGfx;
    g.clear();
    if (!this.isCharging || this.arrowsLeft <= 0) return;

    const angle = Math.atan2(this.my - PLAYER_Y, this.mx - PLAYER_X);
    const power = this.chargePower();
    let px = PLAYER_X, py = PLAYER_Y;
    let vx = Math.cos(angle) * power;
    let vy = Math.sin(angle) * power;
    const step = 0.055;

    for (let i = 0; i < 24; i++) {
      px += vx * step; py += vy * step;
      vx += this.wind * step; vy += GRAVITY * step;
      if (py > FLOOR_Y || px > W + 10) break;
      const alpha = Math.max(0, 0.5 - i * 0.018);
      const r = Math.max(0.8, 3 - i * 0.09);
      g.fillStyle(C_PRIMARY, alpha);
      g.fillCircle(px, py, r);
    }
  }

  // ── Power bar ─────────────────────────────────────────────────────────────
  private drawPower() {
    const g = this.powerGfx;
    g.clear();
    this.powerLabel.setAlpha(this.isCharging ? 1 : 0);
    if (!this.isCharging) return;

    const bw = 130, bh = 10, bx = 20, by = H - 26;
    const t = Math.min((Date.now() - this.chargeStart) / MAX_CHARGE_MS, 1);
    const fw = t * bw;
    const col = t > 0.8 ? 0xff4444 : t > 0.5 ? 0xffaa00 : C_PRIMARY;

    g.fillStyle(0x1a3a1a, 0.9);
    g.fillRoundedRect(bx, by, bw, bh, 4);
    g.lineStyle(1.5, C_PRIMARY, 0.35);
    g.strokeRoundedRect(bx, by, bw, bh, 4);
    g.fillStyle(col, 0.95);
    g.fillRoundedRect(bx, by, fw, bh, 4);
  }

  // ── Arrows ────────────────────────────────────────────────────────────────
  private fireArrow() {
    if (this.arrowsLeft <= 0 || this.gameOver) return;
    this.arrowsLeft--;

    const angle = Math.atan2(this.my - PLAYER_Y, this.mx - PLAYER_X);
    const power = this.chargePower();

    const line = this.add.line(0, 0,
      PLAYER_X, PLAYER_Y, PLAYER_X + Math.cos(angle) * 20, PLAYER_Y + Math.sin(angle) * 20,
      C_OFFWHITE, 1
    ).setLineWidth(2.5).setDepth(10);

    const tip = this.add.arc(
      PLAYER_X + Math.cos(angle) * 20,
      PLAYER_Y + Math.sin(angle) * 20,
      3, 0, 360, false, C_PRIMARY
    ).setDepth(11);

    this.arrowPool.push({
      x: PLAYER_X, y: PLAYER_Y,
      vx: Math.cos(angle) * power,
      vy: Math.sin(angle) * power,
      line, tip,
      alive: true,
      stuckTimer: 0,
    });

    if (this.arrowsLeft === 0) {
      this.time.delayedCall(2800, () => this.tryGameOver(), [], this);
    }
  }

  private tickArrows(dt: number) {
    for (const a of this.arrowPool) {
      if (!a.alive) continue;
      if (a.stuckTimer > 0) {
        a.stuckTimer -= dt;
        if (a.stuckTimer <= 0) { a.line.destroy(); a.tip.destroy(); a.alive = false; }
        continue;
      }

      a.vx += this.wind * dt;
      a.vy += GRAVITY * dt;
      a.x  += a.vx * dt;
      a.y  += a.vy * dt;

      // Floor
      if (a.y >= FLOOR_Y) {
        a.y = FLOOR_Y - 2;
        a.line.setTo(a.x - 14, FLOOR_Y, a.x + 3, FLOOR_Y - 3);
        a.tip.setPosition(a.x + 3, FLOOR_Y - 3);
        a.stuckTimer = 2.5;
        continue;
      }
      // Off screen
      if (a.x > W + 60 || a.x < -60 || a.y < -60) {
        a.line.destroy(); a.tip.destroy(); a.alive = false;
        continue;
      }

      // Update visuals
      const tailX = a.x - Math.cos(Math.atan2(a.vy, a.vx)) * 14;
      const tailY = a.y - Math.sin(Math.atan2(a.vy, a.vx)) * 14;
      a.line.setTo(tailX, tailY, a.x, a.y);
      a.tip.setPosition(a.x, a.y);

      // Collision
      this.checkHit(a);
    }

    this.arrowPool = this.arrowPool.filter(a => a.alive || a.stuckTimer > 0);
  }

  private checkHit(a: ArrowData) {
    // Bone
    if (this.boneActive) {
      const dx = a.x - this.boneX, dy = a.y - this.boneY;
      if (Math.hypot(dx, dy) < 26) {
        this.score += BONE_PTS;
        this.arrowsLeft++;
        this.boneActive = false;
        this.boneGfx.clear();
        a.stuckTimer = 0.1;
        this.flashFeedback(`+${BONE_PTS} BONE!  +1 ARROW`, C_GOLD);
        return;
      }
    }

    // Targets
    for (const t of this.targets) {
      const cy = this.targetCY(t);
      const dist = Math.hypot(a.x - t.cx, a.y - cy);
      if (dist > OUTER_R) continue;

      let pts = OUTER_PTS, label = 'HIT!';
      if (dist <= BULLSEYE_R) { pts = BULLSEYE_PTS; label = 'BULLSEYE!'; }
      else if (dist <= INNER_R) { pts = INNER_PTS; label = 'INNER'; }

      this.score += pts;
      a.stuckTimer = 2.0;
      this.flashFeedback(`+${pts}  ${label}`, pts === BULLSEYE_PTS ? C_PRIMARY : C_OFFWHITE);
      return;
    }
  }

  // ── Bone bonus ────────────────────────────────────────────────────────────
  private maybeSpawnBone() {
    if (this.gameOver || this.boneActive) return;
    if (Math.random() < 0.55) {
      this.boneX = 340 + Math.random() * 350;
      this.boneBaseY = 140 + Math.random() * 150;
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
    g.fillStyle(C_GOLD);
    g.fillRect(x - 14, y - 4, 28, 8);
    g.fillCircle(x - 18, y - 5, 6); g.fillCircle(x - 18, y + 5, 6);
    g.fillCircle(x + 18, y - 5, 6); g.fillCircle(x + 18, y + 5, 6);
    g.lineStyle(2, C_GOLD, 0.45);
    g.strokeCircle(x, y, 24);
  }

  // ── Feedback ──────────────────────────────────────────────────────────────
  private flashFeedback(msg: string, color: number) {
    const hex = '#' + color.toString(16).padStart(6, '0');
    this.feedText.setText(msg).setColor(hex).setAlpha(1).setScale(1.15).setY(H / 2 - 60);
    this.tweens.add({
      targets: this.feedText,
      alpha: 0, scaleX: 1, scaleY: 1,
      y: H / 2 - 95,
      duration: 1100,
      ease: 'Quad.easeOut',
    });
  }

  // ── Game Over ──────────────────────────────────────────────────────────────
  private tryGameOver() {
    const anyFlying = this.arrowPool.some(a => a.alive && a.stuckTimer === 0);
    if (anyFlying) { this.time.delayedCall(800, () => this.tryGameOver(), [], this); return; }
    this.gameOver = true;
    this.goOverlay.setVisible(true);
    (this.goOverlay.getAt(1) as Phaser.GameObjects.Text).setText(String(this.score));
  }

  private buildGameOver() {
    const bg = this.add.graphics();
    bg.fillStyle(C_DARK, 0.88);
    bg.fillRect(0, 0, W, H);

    const scoreTxt = this.add.text(W / 2, H / 2 - 15, '0', {
      fontFamily: 'Poppins, sans-serif', fontSize: '60px', fontStyle: 'bold', color: '#e9f3ea',
    } as any).setOrigin(0.5);

    const title = this.add.text(W / 2, H / 2 - 90, 'GAME OVER', {
      fontFamily: 'Poppins, sans-serif', fontSize: '44px', fontStyle: 'bold',
      color: '#ccff00', stroke: '#0b100c', strokeThickness: 6,
    } as any).setOrigin(0.5);

    const pts = this.add.text(W / 2, H / 2 + 38, 'POINTS', {
      fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#5a8a5a',
    } as any).setOrigin(0.5);

    const btn = this.add.text(W / 2, H / 2 + 105, '[ PLAY AGAIN ]', {
      fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontStyle: 'bold',
      color: '#0b100c', backgroundColor: '#ccff00', padding: { x: 24, y: 12 },
    } as any).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => { btn.setColor('#ccff00'); btn.setBackgroundColor('#0b100c'); });
    btn.on('pointerout',  () => { btn.setColor('#0b100c'); btn.setBackgroundColor('#ccff00'); });
    btn.on('pointerdown', () => this.scene.restart());

    this.goOverlay = this.add.container(0, 0, [bg, scoreTxt, title, pts, btn])
      .setDepth(30).setVisible(false);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  private randomiseWind() {
    this.wind = (Math.random() - 0.5) * 300;
  }

  private chargePower() {
    if (!this.isCharging) return 0;
    return Math.min((Date.now() - this.chargeStart) / MAX_CHARGE_MS, 1) * MAX_POWER;
  }

  private onDown(p: Phaser.Input.Pointer) {
    if (this.gameOver || this.arrowsLeft <= 0) return;
    this.isCharging = true;
    this.chargeStart = Date.now();
    this.mx = p.x; this.my = p.y;
  }

  private onUp(p: Phaser.Input.Pointer) {
    if (!this.isCharging) return;
    this.isCharging = false;
    this.mx = p.x; this.my = p.y;
    if (!this.gameOver && this.chargePower() > 40) this.fireArrow();
  }
}
