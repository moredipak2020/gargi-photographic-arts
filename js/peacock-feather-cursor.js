// ==========================================================================
// GARGI PHOTOGRAPHIC ARTS - DIVINE GOLDEN PEACOCK FEATHER (MOR PANKH) CURSOR ENGINE
// Sacred Shri Krishna Janmashtami Edition - Ultra-High Precision 120FPS Direct Pointer Sync
// Features: Detailed Vector Mor Pankh, Radiant Ocellus, Long Peacock-Teal Stardust Trail & Supernova Burst
// ==========================================================================

(function() {
  'use strict';

  // Bypass on touch devices, small mobile viewports, or reduced motion settings
  if (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.innerWidth <= 992
  ) {
    return;
  }

  // Activate custom peacock cursor class on HTML element
  document.documentElement.classList.add('custom-peacock-cursor-active');

  // Direct Hardware Pointer Coordinates
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
  let currentTilt = 0;
  let targetTilt = 0;

  // DOM Elements
  let cursorWrapper = null;
  let featherElement = null;
  let shockwaveElement = null;
  let canvas = null;
  let ctx = null;
  let particles = [];
  const MAX_PARTICLES = 160; // Generous budget for long, flowing celestial stardust trails

  function createPeacockCursorDOM() {
    // 1. Stardust Canvas Overlay
    canvas = document.createElement('canvas');
    canvas.id = 'peacockTrailCanvas';
    canvas.className = 'peacock-trail-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d', { alpha: true });
    document.body.appendChild(canvas);

    window.addEventListener('resize', () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, { passive: true });

    // 2. Cursor Master Wrapper
    cursorWrapper = document.createElement('div');
    cursorWrapper.id = 'peacockFeatherCursor';
    cursorWrapper.className = 'peacock-feather-cursor';

    // 3. High-Detail SVG Golden Peacock Feather (Mor Pankh)
    cursorWrapper.innerHTML = `
      <div class="peacock-feather-inner" id="peacockFeatherInner">
        <!-- Divine Radial Glow Backdrop -->
        <div class="peacock-divine-aura" id="peacockDivineAura"></div>

        <!-- High-Precision Vector Mor Pankh -->
        <svg class="peacock-svg" id="peacockSvg" viewBox="0 0 120 120" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- 24K Metallic Gold Gradient -->
            <linearGradient id="goldQuillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="25%" stop-color="#FFEFA6" />
              <stop offset="60%" stop-color="#FFD700" />
              <stop offset="85%" stop-color="#D4AF37" />
              <stop offset="100%" stop-color="#996515" />
            </linearGradient>

            <!-- Iridescent Teal & Emerald Barbs Gradient -->
            <linearGradient id="barbIridescentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00F5D4" />
              <stop offset="35%" stop-color="#00E5FF" />
              <stop offset="70%" stop-color="#00E676" />
              <stop offset="100%" stop-color="#FFD700" />
            </linearGradient>

            <!-- Outer Emerald-Gold Ocellus Halo -->
            <radialGradient id="ocellusEmeraldHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#00F5D4" />
              <stop offset="40%" stop-color="#00B0FF" />
              <stop offset="75%" stop-color="#00796B" />
              <stop offset="95%" stop-color="#FFD700" />
              <stop offset="100%" stop-color="transparent" />
            </radialGradient>

            <!-- Radiant Electric Teal & Cyan Ocellus Ring -->
            <radialGradient id="ocellusTealRing" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="30%" stop-color="#A7FFEB" />
              <stop offset="65%" stop-color="#00E5FF" />
              <stop offset="100%" stop-color="#0091EA" />
            </radialGradient>

            <!-- Deep Midnight Sapphire / Royal Indigo Velvet Core -->
            <radialGradient id="ocellusSapphireCore" cx="45%" cy="38%" r="60%">
              <stop offset="0%" stop-color="#7C4DFF" />
              <stop offset="45%" stop-color="#304FFE" />
              <stop offset="80%" stop-color="#1A237E" />
              <stop offset="100%" stop-color="#0A0914" />
            </radialGradient>

            <!-- Glow Filter for Divine Radiance -->
            <filter id="peacockGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Golden Radial Flukes / Sunburst Filaments -->
          <g class="peacock-flukes" stroke="url(#goldQuillGrad)" stroke-width="1.1" stroke-linecap="round" opacity="0.85">
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

          <!-- Delicate Flowing Barbs / Vanes (Left & Right) -->
          <g class="peacock-barbs" stroke="url(#barbIridescentGrad)" stroke-width="1.15" stroke-linecap="round" opacity="0.82">
            <!-- Left Side Barbs -->
            <path d="M12 12 Q8 26 10 38" fill="none" />
            <path d="M22 22 Q16 38 20 52" fill="none" />
            <path d="M34 34 Q28 52 34 68" fill="none" />
            <path d="M46 46 Q40 66 48 80" fill="none" />
            
            <!-- Right Side Barbs -->
            <path d="M12 12 Q26 10 38 14" fill="none" />
            <path d="M22 22 Q38 18 52 24" fill="none" />
            <path d="M34 34 Q52 28 68 36" fill="none" />
            <path d="M46 46 Q66 40 82 50" fill="none" />
          </g>

          <!-- Central 24K Golden Rachis (Shaft) -->
          <path d="M4 4 Q38 34 76 74 Q86 84 96 96" fill="none" stroke="url(#goldQuillGrad)" stroke-width="2.6" stroke-linecap="round" filter="url(#peacockGlowFilter)" />
          <path d="M4 4 Q38 34 76 74" fill="none" stroke="#FFFFFF" stroke-width="0.9" stroke-linecap="round" opacity="0.9" />

          <!-- Golden Pointer Nib at Exact Hotspot (4, 4) -->
          <polygon points="1,1 7,2 2,7" fill="#FFFFFF" />
          <circle cx="3.5" cy="3.5" r="1.8" fill="#FFEFA6" />

          <!-- Outer Emerald-Gold Ocellus Oval -->
          <ellipse cx="76" cy="74" rx="22" ry="17" transform="rotate(40 76 74)" fill="url(#ocellusEmeraldHalo)" stroke="url(#goldQuillGrad)" stroke-width="1.2" />

          <!-- Middle Electric Peacock Teal Ocellus Ring -->
          <ellipse cx="76" cy="74" rx="15" ry="11" transform="rotate(40 76 74)" fill="url(#ocellusTealRing)" />

          <!-- Central Sacred Sapphire Heart / Pupil -->
          <path d="M76 66 C81 66, 86 70, 83 77 C80 82, 76 85, 76 85 C76 85, 72 82, 69 77 C66 70, 71 66, 76 66 Z" transform="rotate(40 76 74)" fill="url(#ocellusSapphireCore)" />

          <!-- Diamond Catchlight & Golden Bindu Starlet -->
          <circle cx="74.5" cy="72" r="1.8" fill="#FFFFFF" opacity="0.95" />
          <circle cx="78.5" cy="70" r="1.1" fill="#FFEFA6" opacity="0.85" />
        </svg>

        <!-- Click Shockwave Ring -->
        <div class="peacock-click-shockwave" id="peacockClickShockwave"></div>
      </div>
    `;

    document.body.appendChild(cursorWrapper);
    featherElement = document.getElementById('peacockFeatherInner');
    shockwaveElement = document.getElementById('peacockClickShockwave');
  }

  // Pre-compiled RGBA color triples for zero GC/string formatting overhead
  const PEACOCK_PALETTE = [
    [0, 245, 212],  // Electric Peacock Teal
    [0, 229, 255],  // Cyan Starlight
    [0, 230, 118],  // Emerald Shimmer
    [41, 121, 255], // Royal Sapphire
    [255, 215, 0],  // 24K Gold
    [255, 239, 166], // Champagne Gold
    [255, 255, 255]  // Diamond White
  ];

  // Long-Living Celestial Stardust Particle
  class PeacockStardustParticle {
    constructor(x, y, vx, vy, isBurst = false) {
      // Offset origin to trail from ocellus and feather body
      this.x = x + (Math.random() - 0.5) * (isBurst ? 16 : 8);
      this.y = y + (Math.random() - 0.5) * (isBurst ? 16 : 8);

      const speedMult = isBurst ? (Math.random() * 4.2 + 2.0) : (Math.random() * 0.8 + 0.3);
      this.vx = (vx * 0.15) + (Math.random() - 0.5) * 1.5 * (isBurst ? speedMult : 1);
      this.vy = (vy * 0.15) + (Math.random() - 0.5) * 1.5 * (isBurst ? speedMult : 1) - (isBurst ? 0 : 0.22); // Subtle upward thermal drift

      // Long particle lifespan: 35-65 frames for rich lingering trails
      this.maxLife = isBurst ? (Math.random() * 32 + 28) : (Math.random() * 40 + 35);
      this.life = this.maxLife;
      this.size = Math.random() * (isBurst ? 3.5 : 2.5) + 1.0;
      this.alpha = 1.0;

      // Color selection
      const c = PEACOCK_PALETTE[Math.floor(Math.random() * PEACOCK_PALETTE.length)];
      this.r = c[0];
      this.g = c[1];
      this.b = c[2];

      // Particle geometry type
      this.isStar = Math.random() > 0.55;
      this.rotation = Math.random() * 6.28;
      this.rotSpeed = (Math.random() - 0.5) * 0.12;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.96; // Smooth deceleration
      this.vy *= 0.96;
      this.life--;
      this.alpha = Math.max(0, this.life / this.maxLife);
      this.size *= 0.985;
      this.rotation += this.rotSpeed;
    }

    draw(ctx) {
      if (this.alpha <= 0.02) return;
      const a = this.alpha;

      if (this.isStar && this.size > 1.1) {
        // Draw 4-point Diamond Sparkle Star
        const cx = this.x;
        const cy = this.y;
        const s = this.size * 1.6;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(this.rotation);
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${a})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.r}, ${this.g}, ${this.b}, ${a * 0.9})`;

        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.28, -s * 0.28);
        ctx.lineTo(s, 0);
        ctx.lineTo(s * 0.28, s * 0.28);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.28, s * 0.28);
        ctx.lineTo(-s, 0);
        ctx.lineTo(-s * 0.28, -s * 0.28);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else {
        // Draw Glowing Iridescent Stardust Disc
        ctx.save();
        ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${a * 0.9})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${this.r}, ${this.g}, ${this.b}, ${a * 0.8})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 6.28318);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  // Emit Continuous Long Peacock Stardust Trail
  function emitPeacockTrail(x0, y0, x1, y1) {
    if (particles.length >= MAX_PARTICLES) return;
    const dist = Math.hypot(x1 - x0, y1 - y0);
    if (dist < 1.5) return;

    // Density of trail particles proportional to movement
    const count = Math.min(5, Math.max(1, Math.floor(dist / 5)));
    const vx = x1 - x0;
    const vy = y1 - y0;

    for (let i = 0; i < count; i++) {
      if (particles.length >= MAX_PARTICLES) break;
      const t = (i + 1) / (count + 1);
      // Spawn trail offset around the peacock feather's majestic plume (~+24px, +24px from hotspot)
      const spawnX = x0 + vx * t + 24;
      const spawnY = y0 + vy * t + 24;
      particles.push(new PeacockStardustParticle(spawnX, spawnY, vx * 0.3, vy * 0.3, false));
    }
  }

  // Emit Divine Peacock Supernova Burst on Click
  function emitPeacockSupernova(x, y) {
    const burstCount = 28;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 / burstCount) * i + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 4.5 + 1.8;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      particles.push(new PeacockStardustParticle(x + 18, y + 18, vx, vy, true));
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

    emitPeacockSupernova(e.clientX, e.clientY);
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

  // 120FPS Direct Hardware Accelerated Render Loop
  let frameCount = 0;
  function animationLoop() {
    frameCount++;

    if (isVisible && cursorWrapper) {
      // 1:1 Direct pointer positioning (hotspot at 0, 0)
      currentX = targetX;
      currentY = targetY;
      cursorWrapper.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      velocityX = currentX - prevX;
      velocityY = currentY - prevY;

      // Emit continuous long peacock stardust trail
      if (prevX > 0 && prevY > 0) {
        emitPeacockTrail(prevX, prevY, currentX, currentY);
      }
      prevX = currentX;
      prevY = currentY;

      // Organic responsive feather sway & dynamic tilt
      const speed = Math.hypot(velocityX, velocityY);
      if (speed > 0.5) {
        targetTilt = Math.max(-18, Math.min(18, velocityX * 1.8));
      } else if (isHovering) {
        targetTilt = -8 + Math.sin(frameCount * 0.08) * 4;
      } else {
        targetTilt = Math.sin(frameCount * 0.05) * 3;
      }

      currentTilt += (targetTilt - currentTilt) * 0.15;

      if (featherElement) {
        const hoverScale = isHovering ? 1.25 : (isClicking ? 0.9 : 1.0);
        featherElement.style.transform = `rotate(${currentTilt}deg) scale(${hoverScale})`;
      }
    }

    // Render Canvas Stardust Particles
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0 || p.alpha <= 0.02) {
          particles.splice(i, 1);
        }
      }
    }

    requestAnimationFrame(animationLoop);
  }

  function init() {
    createPeacockCursorDOM();
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

  // Export engine reference for theme switching
  window.peacockCursor = {
    emitBurst: emitPeacockSupernova
  };

})();
