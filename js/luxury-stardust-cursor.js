// ==========================================================================
// GARGI PHOTOGRAPHIC ARTS - DUAL-THEME CINEMATIC LUXURY & SACRED PEACOCK CURSOR ENGINE
// High-Performance Hardware-Accelerated 120FPS Direct Pointer Sync (Zero Stutter)
// Themes:
// 1. "default": 24K Gold Diamond Sparkle Star & Rotating Aperture Ring with Champagne Stardust
// 2. "peacock" / "janmashtami": Divine Golden Peacock Feather (Mor Pankh) with Long Peacock-Teal Stardust Trail
// ==========================================================================

(function() {
  'use strict';

  // Touch / Mobile screen check
  if (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.innerWidth <= 992
  ) {
    return;
  }

  // Global desktop cursor replacement class
  document.documentElement.classList.add('custom-luxury-cursor-active');

  let currentTheme = 'default'; // 'default' or 'peacock'
  let targetX = -200;
  let targetY = -200;
  let currentX = -200;
  let currentY = -200;
  let prevX = -200;
  let prevY = -200;
  let velocityX = 0;
  let velocityY = 0;
  let isHovering = false;
  let isClicking = false;
  let isVisible = false;
  let rotationAngle = 0;
  let currentTilt = 0;
  let targetTilt = 0;
  let frameCount = 0;

  // DOM Elements
  let cursorWrapper = null;
  let ringElement = null;
  let starElement = null;
  let peacockPivotElement = null;
  let peacockContainer = null;
  let shockwaveElement = null;
  let canvas = null;
  let ctx = null;
  let particles = [];
  const MAX_PARTICLES = 160;

  // Color Palettes
  const GOLD_PALETTE = [
    [255, 239, 166], // Champagne Gold
    [255, 215, 0],   // 24K Gold
    [212, 175, 55],  // Metallic Gold
    [255, 255, 255], // Diamond White
    [255, 248, 220]  // Warm Glow
  ];

  const PEACOCK_PALETTE = [
    [0, 245, 212],   // Electric Peacock Teal
    [0, 229, 255],   // Cyan Starlight
    [0, 230, 118],   // Emerald Shimmer
    [41, 121, 255],  // Royal Sapphire
    [255, 215, 0],   // 24K Gold
    [255, 239, 166], // Champagne Gold
    [255, 255, 255]  // Diamond White
  ];

  function createCursorDOM() {
    canvas = document.createElement('canvas');
    canvas.id = 'luxuryStardustCanvas';
    canvas.className = 'luxury-stardust-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d', { alpha: true });
    document.body.appendChild(canvas);

    window.addEventListener('resize', () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, { passive: true });

    cursorWrapper = document.createElement('div');
    cursorWrapper.id = 'luxuryStardustCursor';
    cursorWrapper.className = 'luxury-stardust-cursor theme-default';

    cursorWrapper.innerHTML = `
      <!-- THEME 1: CLASSIC DIAMOND STAR & APERTURE (Default) -->
      <div class="stardust-cursor-inner theme-star-node" id="stardustCursorInner">
        <!-- Outer Rotating Aperture Ring -->
        <svg class="cursor-aperture-ring" viewBox="0 0 50 50" width="36" height="36">
          <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(212, 175, 55, 0.55)" stroke-width="1" stroke-dasharray="3 3" />
          <circle cx="25" cy="25" r="16" fill="none" stroke="rgba(255, 239, 166, 0.75)" stroke-width="0.8" />
        </svg>

        <!-- Center 4-Point Golden Diamond Sparkle Star & Focus Dot -->
        <svg class="cursor-diamond-star" viewBox="0 0 40 40" width="22" height="22">
          <defs>
            <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="35%" stop-color="#FFEFA6" />
              <stop offset="70%" stop-color="#D4AF37" />
              <stop offset="100%" stop-color="#AA7C11" />
            </linearGradient>
          </defs>
          <path d="M20 2 Q20 20 2 20 Q20 20 20 38 Q20 20 38 20 Q20 20 20 2 Z" fill="url(#goldStarGrad)" />
          <path d="M20 9 Q20 20 9 20 Q20 20 20 31 Q20 20 31 20 Q20 20 20 9 Z" fill="#FFEFA6" opacity="0.75" />
          <circle cx="20" cy="20" r="2.2" fill="#FFFFFF" />
        </svg>
      </div>

      <!-- THEME 2: AUTHENTIC GOLDEN PEACOCK FEATHER (Janmashtami / Kids) -->
      <div class="peacock-cursor-anchor peacock-cursor-node" id="peacockCursorNode" style="display: none;">
        <div class="peacock-feather-pivot" id="peacockLuxuryPivot">
          <div class="peacock-divine-aura" id="peacockDivineAura"></div>
          <img 
            src="assets/images/cursor/peacock-feather.png" 
            srcset="assets/images/cursor/peacock-feather.webp 1x, assets/images/cursor/peacock-feather.png 1x"
            alt="Shri Krishna Golden Peacock Feather (Mor Pankh)" 
            class="peacock-feather-img" 
            id="peacockFeatherImg"
            draggable="false"
          />
        </div>
      </div>

      <!-- Click Shockwave Wave -->
      <div class="cursor-click-shockwave" id="cursorClickShockwave"></div>
    `;

    document.body.appendChild(cursorWrapper);
    ringElement = cursorWrapper.querySelector('.cursor-aperture-ring');
    starElement = document.getElementById('stardustCursorInner');
    peacockContainer = document.getElementById('peacockCursorNode');
    peacockPivotElement = document.getElementById('peacockLuxuryPivot');
    shockwaveElement = document.getElementById('cursorClickShockwave');

    if (window.location.pathname.includes('kids-gallery') || window.location.href.includes('kids-gallery')) {
      setCursorTheme('peacock');
    }
  }

  function setCursorTheme(themeName) {
    if (themeName === 'janmashtami' || themeName === 'peacock' || themeName === 'kids') {
      currentTheme = 'peacock';
      if (cursorWrapper) {
        cursorWrapper.classList.remove('theme-default');
        cursorWrapper.classList.add('theme-peacock');
      }
      if (starElement) starElement.style.display = 'none';
      if (peacockContainer) peacockContainer.style.display = 'block';
    } else {
      currentTheme = 'default';
      if (cursorWrapper) {
        cursorWrapper.classList.remove('theme-peacock');
        cursorWrapper.classList.add('theme-default');
      }
      if (starElement) starElement.style.display = 'flex';
      if (peacockContainer) peacockContainer.style.display = 'none';
    }
  }

  class StardustFairyParticle {
    constructor(x, y, vx, vy, isBurst = false) {
      const isPeacock = currentTheme === 'peacock';
      this.x = x + (Math.random() - 0.5) * (isBurst ? (isPeacock ? 14 : 10) : (isPeacock ? 4 : 4));
      this.y = y + (Math.random() - 0.5) * (isBurst ? (isPeacock ? 14 : 10) : (isPeacock ? 4 : 4));
      
      const speedMult = isBurst ? (isPeacock ? 4.4 : 3.5) : (isPeacock ? 0.7 : 0.8);
      this.vx = vx * 0.12 + (Math.random() - 0.5) * 1.3 * speedMult;
      this.vy = vy * 0.12 + (Math.random() - 0.5) * 1.3 * speedMult - (isBurst ? 0 : (isPeacock ? 0.2 : 0));
      
      this.size = Math.random() * (isBurst ? 3.4 : 2.2) + 0.8;
      this.maxLife = isBurst ? (isPeacock ? 38 : 26) : (isPeacock ? 42 : 22);
      this.life = this.maxLife;
      this.alpha = 1.0;
      
      const palette = isPeacock ? PEACOCK_PALETTE : GOLD_PALETTE;
      const c = palette[Math.floor(Math.random() * palette.length)];
      this.r = c[0];
      this.g = c[1];
      this.b = c[2];
      this.isStar = Math.random() > (isPeacock ? 0.55 : 0.6);
      this.rotation = Math.random() * 6.28;
      this.rotSpeed = (Math.random() - 0.5) * 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.955;
      this.vy *= 0.955;
      this.life--;
      this.alpha = Math.max(0, this.life / this.maxLife);
      this.size *= 0.985;
      this.rotation += this.rotSpeed;
    }

    draw(ctx) {
      if (this.alpha <= 0.03) return;
      const a = this.alpha;

      if (this.isStar && this.size > 1.0) {
        const cx = this.x;
        const cy = this.y;
        const s = this.size * 1.5;
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(this.rotation);
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${a})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${this.r}, ${this.g}, ${this.b}, ${a * 0.8})`;

        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.3, -s * 0.3);
        ctx.lineTo(s, 0);
        ctx.lineTo(s * 0.3, s * 0.3);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.3, s * 0.3);
        ctx.lineTo(-s, 0);
        ctx.lineTo(-s * 0.3, -s * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else {
        ctx.save();
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${a * 0.9})`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = `rgba(${this.r}, ${this.g}, ${this.b}, ${a * 0.7})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 6.28318);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  function emitStardust(x0, y0, x1, y1) {
    if (particles.length >= MAX_PARTICLES) return;
    const dist = Math.hypot(x1 - x0, y1 - y0);
    if (dist < 1.5) return;

    const isPeacock = currentTheme === 'peacock';
    const count = isPeacock ? Math.min(5, Math.max(1, Math.floor(dist / 4.5))) : Math.min(3, Math.max(1, Math.floor(dist / 6)));
    const vx = x1 - x0;
    const vy = y1 - y0;

    for (let i = 0; i < count; i++) {
      if (particles.length >= MAX_PARTICLES) break;
      const t = (i + 1) / (count + 1);
      // Spawn trail directly from the contact point
      const spawnX = x0 + vx * t;
      const spawnY = y0 + vy * t;
      particles.push(new StardustFairyParticle(spawnX, spawnY, vx, vy, false));

      if (isPeacock && Math.random() > 0.65) {
        particles.push(new StardustFairyParticle(spawnX + 6, spawnY - 12, vx * 0.2, vy * 0.2, false));
      }
    }
  }

  function emitClickSupernova(x, y) {
    const isPeacock = currentTheme === 'peacock';
    const burstCount = isPeacock ? 30 : 18;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 / burstCount) * i + (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 4.4 + 1.6;
      particles.push(new StardustFairyParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, true));
    }
  }

  // Pure data input handler
  function handleMouseMove(e) {
    targetX = e.clientX;
    targetY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      currentX = targetX;
      currentY = targetY;
      prevX = targetX;
      prevY = targetY;
      if (cursorWrapper) cursorWrapper.classList.add('visible');
    }
  }

  // Unified single-pass interactive check
  const INTERACTIVE_SELECTOR = 'a, button, .gallery-card, .museum-frame-card, .category-tile, .filter-btn, .sub-filter-btn, .modal-close-btn, .lightbox-nav-arrow, .multi-edit-btn, .audio-control-btn, input, select, textarea, [role="button"]';

  function handleMouseOver(e) {
    const target = e.target;
    if (!target) return;

    const interactiveEl = target.closest(INTERACTIVE_SELECTOR);
    const isInteractive = Boolean(interactiveEl);

    if (isInteractive !== isHovering) {
      isHovering = isInteractive;
      if (cursorWrapper) {
        if (isHovering) {
          cursorWrapper.classList.add('hovering-interactive');
        } else {
          cursorWrapper.classList.remove('hovering-interactive');
        }
      }
    }
  }

  function handleMouseDown(e) {
    if (!cursorWrapper) return;
    isClicking = true;
    cursorWrapper.classList.add('clicking-active');

    if (shockwaveElement) {
      shockwaveElement.classList.remove('active-shockwave');
      void shockwaveElement.offsetWidth;
      shockwaveElement.classList.add('active-shockwave');
    }

    emitClickSupernova(e.clientX, e.clientY);
  }

  function handleMouseUp() {
    isClicking = false;
    if (cursorWrapper) {
      cursorWrapper.classList.remove('clicking-active');
    }
  }

  function handleMouseLeave() {
    isVisible = false;
    if (cursorWrapper) {
      cursorWrapper.classList.remove('visible');
    }
  }

  function handleMouseEnter(e) {
    isVisible = true;
    targetX = e.clientX;
    targetY = e.clientY;
    currentX = targetX;
    currentY = targetY;
    prevX = targetX;
    prevY = targetY;
    if (cursorWrapper) {
      cursorWrapper.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      cursorWrapper.classList.add('visible');
    }
  }

  // 120FPS Decoupled Render Loop
  function animationLoop() {
    frameCount++;

    if (isVisible && cursorWrapper) {
      currentX = targetX;
      currentY = targetY;
      cursorWrapper.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      velocityX = currentX - prevX;
      velocityY = currentY - prevY;

      if (prevX > 0 && prevY > 0) {
        emitStardust(prevX, prevY, currentX, currentY);
      }
      prevX = currentX;
      prevY = currentY;

      // Peacock theme organic sway around quill tip (0, 0)
      if (currentTheme === 'peacock') {
        const speed = Math.hypot(velocityX, velocityY);
        if (speed > 0.5) {
          targetTilt = Math.max(-14, Math.min(14, velocityX * 1.3));
        } else if (isHovering) {
          targetTilt = -4 + Math.sin(frameCount * 0.08) * 3;
        } else {
          targetTilt = Math.sin(frameCount * 0.05) * 1.8;
        }
        currentTilt += (targetTilt - currentTilt) * 0.15;

        if (peacockPivotElement) {
          const hoverScale = isHovering ? 1.15 : (isClicking ? 0.92 : 1.0);
          peacockPivotElement.style.transform = `rotate(${currentTilt}deg) scale(${hoverScale})`;
        }
      }
    }

    // Classic Aperture Rotation
    if (currentTheme === 'default' && ringElement) {
      rotationAngle += isHovering ? 1.5 : 0.4;
      ringElement.style.transform = `rotate(${rotationAngle}deg)`;
    }

    // Render Canvas Particles
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0 || p.alpha <= 0.03) {
          particles.splice(i, 1);
        }
      }
    }

    requestAnimationFrame(animationLoop);
  }

  function init() {
    createCursorDOM();
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    requestAnimationFrame(animationLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.cursorEngine = {
    setTheme: setCursorTheme,
    getTheme: () => currentTheme,
    emitBurst: emitClickSupernova
  };

})();
