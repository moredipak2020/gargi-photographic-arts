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
  let peacockElement = null;
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
    [255, 239, 166],  // Champagne Gold
    [255, 255, 255]   // Diamond White
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

      <!-- THEME 2: DIVINE GOLDEN PEACOCK FEATHER (Janmashtami / Kids) -->
      <div class="peacock-cursor-node" id="peacockCursorNode" style="display: none;">
        <div class="peacock-feather-inner" id="peacockFeatherInner">
          <div class="peacock-divine-aura" id="peacockDivineAura"></div>

          <svg class="peacock-svg" id="peacockSvg" viewBox="0 0 120 120" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldQuillGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="25%" stop-color="#FFEFA6" />
                <stop offset="60%" stop-color="#FFD700" />
                <stop offset="85%" stop-color="#D4AF37" />
                <stop offset="100%" stop-color="#996515" />
              </linearGradient>

              <linearGradient id="barbIridescentGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00F5D4" />
                <stop offset="35%" stop-color="#00E5FF" />
                <stop offset="70%" stop-color="#00E676" />
                <stop offset="100%" stop-color="#FFD700" />
              </linearGradient>

              <radialGradient id="ocellusEmeraldHalo2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#00F5D4" />
                <stop offset="40%" stop-color="#00B0FF" />
                <stop offset="75%" stop-color="#00796B" />
                <stop offset="95%" stop-color="#FFD700" />
                <stop offset="100%" stop-color="transparent" />
              </radialGradient>

              <radialGradient id="ocellusTealRing2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="30%" stop-color="#A7FFEB" />
                <stop offset="65%" stop-color="#00E5FF" />
                <stop offset="100%" stop-color="#0091EA" />
              </radialGradient>

              <radialGradient id="ocellusSapphireCore2" cx="45%" cy="38%" r="60%">
                <stop offset="0%" stop-color="#7C4DFF" />
                <stop offset="45%" stop-color="#304FFE" />
                <stop offset="80%" stop-color="#1A237E" />
                <stop offset="100%" stop-color="#0A0914" />
              </radialGradient>

              <filter id="peacockGlowFilter2" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <!-- Golden Radial Flukes / Sunburst Filaments -->
            <g class="peacock-flukes" stroke="url(#goldQuillGrad2)" stroke-width="1.1" stroke-linecap="round" opacity="0.85">
              <line x1="76" y1="74" x2="60" y2="48" />
              <line x1="76" y1="74" x2="72" y2="44" />
              <line x1="76" y1="74" x2="88" y2="46" />
              <line x1="76" y1="74" x2="102" y2="56" />
              <line x1="76" y1="74" x2="110" y2="70" />
              <line x1="76" y1="74" x2="108" y2="88" />
              <line x1="76" y1="74" x2="98" y2="102" />
              <line x1="76" y1="74" x2="82" y2="106" />
              <line x1="76" y1="74" x2="66" y2="98" />
              <line x1="76" y1="74" x2="54" y2="84" />
            </g>

            <!-- Delicate Flowing Barbs / Vanes -->
            <g class="peacock-barbs" stroke="url(#barbIridescentGrad2)" stroke-width="1.15" stroke-linecap="round" opacity="0.82">
              <path d="M12 12 Q8 26 10 38" fill="none" />
              <path d="M22 22 Q16 38 20 52" fill="none" />
              <path d="M34 34 Q28 52 34 68" fill="none" />
              <path d="M46 46 Q40 66 48 80" fill="none" />
              
              <path d="M12 12 Q26 10 38 14" fill="none" />
              <path d="M22 22 Q38 18 52 24" fill="none" />
              <path d="M34 34 Q52 28 68 36" fill="none" />
              <path d="M46 46 Q66 40 82 50" fill="none" />
            </g>

            <!-- Central 24K Golden Rachis (Shaft) -->
            <path d="M4 4 Q38 34 76 74 Q86 84 96 96" fill="none" stroke="url(#goldQuillGrad2)" stroke-width="2.6" stroke-linecap="round" filter="url(#peacockGlowFilter2)" />
            <path d="M4 4 Q38 34 76 74" fill="none" stroke="#FFFFFF" stroke-width="0.9" stroke-linecap="round" opacity="0.9" />

            <!-- Golden Pointer Nib at Exact Hotspot (4, 4) -->
            <polygon points="1,1 7,2 2,7" fill="#FFFFFF" />
            <circle cx="3.5" cy="3.5" r="1.8" fill="#FFEFA6" />

            <!-- Outer Emerald-Gold Ocellus Oval -->
            <ellipse cx="76" cy="74" rx="22" ry="17" transform="rotate(40 76 74)" fill="url(#ocellusEmeraldHalo2)" stroke="url(#goldQuillGrad2)" stroke-width="1.2" />

            <!-- Middle Electric Peacock Teal Ocellus Ring -->
            <ellipse cx="76" cy="74" rx="15" ry="11" transform="rotate(40 76 74)" fill="url(#ocellusTealRing2)" />

            <!-- Central Sacred Sapphire Heart / Pupil -->
            <path d="M76 66 C81 66, 86 70, 83 77 C80 82, 76 85, 76 85 C76 85, 72 82, 69 77 C66 70, 71 66, 76 66 Z" transform="rotate(40 76 74)" fill="url(#ocellusSapphireCore2)" />

            <!-- Diamond Catchlight & Golden Bindu Starlet -->
            <circle cx="74.5" cy="72" r="1.8" fill="#FFFFFF" opacity="0.95" />
            <circle cx="78.5" cy="70" r="1.1" fill="#FFEFA6" opacity="0.85" />
          </svg>
        </div>
      </div>

      <!-- Click Shockwave Wave -->
      <div class="cursor-click-shockwave" id="cursorClickShockwave"></div>
    `;

    document.body.appendChild(cursorWrapper);
    ringElement = cursorWrapper.querySelector('.cursor-aperture-ring');
    starElement = document.getElementById('stardustCursorInner');
    peacockElement = document.getElementById('peacockCursorNode');
    shockwaveElement = document.getElementById('cursorClickShockwave');

    // Auto-detect initial route theme
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
      if (peacockElement) peacockElement.style.display = 'block';
    } else {
      currentTheme = 'default';
      if (cursorWrapper) {
        cursorWrapper.classList.remove('theme-peacock');
        cursorWrapper.classList.add('theme-default');
      }
      if (starElement) starElement.style.display = 'flex';
      if (peacockElement) peacockElement.style.display = 'none';
    }
  }

  class StardustFairyParticle {
    constructor(x, y, vx, vy, isBurst = false) {
      const isPeacock = currentTheme === 'peacock';
      this.x = x + (Math.random() - 0.5) * (isBurst ? (isPeacock ? 16 : 10) : (isPeacock ? 8 : 4));
      this.y = y + (Math.random() - 0.5) * (isBurst ? (isPeacock ? 16 : 10) : (isPeacock ? 8 : 4));
      
      const speedMult = isBurst ? (isPeacock ? 4.2 : 3.5) : (isPeacock ? 1.0 : 0.8);
      this.vx = vx * 0.12 + (Math.random() - 0.5) * 1.3 * speedMult;
      this.vy = vy * 0.12 + (Math.random() - 0.5) * 1.3 * speedMult - (isBurst ? 0 : (isPeacock ? 0.22 : 0));
      
      this.size = Math.random() * (isBurst ? 3.4 : 2.4) + 0.9;
      this.maxLife = isBurst ? (isPeacock ? 42 : 26) : (isPeacock ? 48 : 22);
      this.life = this.maxLife;
      this.alpha = 1.0;
      
      const palette = isPeacock ? PEACOCK_PALETTE : GOLD_PALETTE;
      const c = palette[Math.floor(Math.random() * palette.length)];
      this.r = c[0];
      this.g = c[1];
      this.b = c[2];
      this.isStar = Math.random() > (isPeacock ? 0.52 : 0.6);
      this.rotation = Math.random() * 6.28;
      this.rotSpeed = (Math.random() - 0.5) * 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.95;
      this.vy *= 0.95;
      this.life--;
      this.alpha = Math.max(0, this.life / this.maxLife);
      this.size *= 0.98;
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
    const count = isPeacock ? Math.min(5, Math.max(1, Math.floor(dist / 5))) : Math.min(3, Math.max(1, Math.floor(dist / 6)));
    const vx = x1 - x0;
    const vy = y1 - y0;

    for (let i = 0; i < count; i++) {
      if (particles.length >= MAX_PARTICLES) break;
      const t = (i + 1) / (count + 1);
      const spawnX = isPeacock ? (x0 + vx * t + 22) : (x0 + vx * t);
      const spawnY = isPeacock ? (y0 + vy * t + 22) : (y0 + vy * t);
      particles.push(new StardustFairyParticle(spawnX, spawnY, vx, vy, false));
    }
  }

  function emitClickSupernova(x, y) {
    const isPeacock = currentTheme === 'peacock';
    const burstCount = isPeacock ? 28 : 18;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 / burstCount) * i + (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 4.2 + 1.5;
      const originX = isPeacock ? x + 16 : x;
      const originY = isPeacock ? y + 16 : y;
      particles.push(new StardustFairyParticle(originX, originY, Math.cos(angle) * speed, Math.sin(angle) * speed, true));
    }
  }

  // Pure data input handler (0 DOM writes, <0.01ms CPU cost)
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

  // Unified single-pass interactive element check
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

      // Peacock theme organic sway
      if (currentTheme === 'peacock') {
        const speed = Math.hypot(velocityX, velocityY);
        if (speed > 0.5) {
          targetTilt = Math.max(-18, Math.min(18, velocityX * 1.8));
        } else if (isHovering) {
          targetTilt = -8 + Math.sin(frameCount * 0.08) * 4;
        } else {
          targetTilt = Math.sin(frameCount * 0.05) * 3;
        }
        currentTilt += (targetTilt - currentTilt) * 0.15;

        const innerFeather = document.getElementById('peacockFeatherInner');
        if (innerFeather) {
          const hoverScale = isHovering ? 1.25 : (isClicking ? 0.9 : 1.0);
          innerFeather.style.transform = `rotate(${currentTilt}deg) scale(${hoverScale})`;
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

  // Export Global Cursor Engine
  window.cursorEngine = {
    setTheme: setCursorTheme,
    getTheme: () => currentTheme,
    emitBurst: emitClickSupernova
  };

})();
