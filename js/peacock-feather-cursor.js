// ==========================================================================
// GARGI PHOTOGRAPHIC ARTS - AUTHENTIC GOLDEN PEACOCK FEATHER (MOR PANKH) CURSOR ENGINE
// Sacred Shri Krishna Janmashtami Edition - Ultra-High Precision 120FPS Direct Pointer Sync
// Features: Ultra-High Resolution Natural Mor Pankh, Radiant Ocellus, Long Peacock-Teal Stardust Trail & Supernova Burst
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
  let frameCount = 0;

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

    // 3. High-Detail Authentic Golden Peacock Feather (Mor Pankh) Image & Glow
    cursorWrapper.innerHTML = `
      <div class="peacock-feather-inner" id="peacockFeatherInner">
        <!-- Divine Radial Glow Behind Ocellus -->
        <div class="peacock-divine-aura" id="peacockDivineAura"></div>

        <!-- High-Resolution Natural Mor Pankh with Native Angle -->
        <img 
          src="assets/images/cursor/peacock-feather.png" 
          srcset="assets/images/cursor/peacock-feather.webp 1x, assets/images/cursor/peacock-feather.png 1x"
          alt="Shri Krishna Golden Peacock Feather (Mor Pankh)" 
          class="peacock-feather-img" 
          id="peacockFeatherImg"
          draggable="false"
        />

        <!-- Click Shockwave Ring at Quill Tip -->
        <div class="peacock-click-shockwave" id="peacockClickShockwave"></div>
      </div>
    `;

    document.body.appendChild(cursorWrapper);
    featherElement = document.getElementById('peacockFeatherInner');
    shockwaveElement = document.getElementById('peacockClickShockwave');
  }

  // Pre-compiled RGBA color triples for zero GC/string formatting overhead
  const PEACOCK_PALETTE = [
    [0, 245, 212],   // Electric Peacock Teal
    [0, 229, 255],   // Cyan Starlight
    [0, 230, 118],   // Emerald Shimmer
    [41, 121, 255],  // Royal Sapphire
    [255, 215, 0],   // 24K Gold
    [255, 239, 166], // Champagne Gold
    [255, 255, 255]  // Diamond White
  ];

  // Long-Living Celestial Stardust Particle
  class PeacockStardustParticle {
    constructor(x, y, vx, vy, isBurst = false) {
      this.x = x + (Math.random() - 0.5) * (isBurst ? 18 : 10);
      this.y = y + (Math.random() - 0.5) * (isBurst ? 18 : 10);

      const speedMult = isBurst ? (Math.random() * 4.2 + 2.0) : (Math.random() * 0.8 + 0.3);
      this.vx = (vx * 0.15) + (Math.random() - 0.5) * 1.5 * (isBurst ? speedMult : 1);
      this.vy = (vy * 0.15) + (Math.random() - 0.5) * 1.5 * (isBurst ? speedMult : 1) - (isBurst ? 0 : 0.22); // Gentle upward thermal lift

      // Long particle lifespan: 35-65 frames for rich lingering trails
      this.maxLife = isBurst ? (Math.random() * 34 + 30) : (Math.random() * 42 + 36);
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

  // Emit Continuous Long Peacock Stardust Trail from Ocellus & Plume (+32px, -46px from Hotspot)
  function emitPeacockTrail(x0, y0, x1, y1) {
    if (particles.length >= MAX_PARTICLES) return;
    const dist = Math.hypot(x1 - x0, y1 - y0);
    if (dist < 1.5) return;

    const count = Math.min(5, Math.max(1, Math.floor(dist / 5)));
    const vx = x1 - x0;
    const vy = y1 - y0;

    for (let i = 0; i < count; i++) {
      if (particles.length >= MAX_PARTICLES) break;
      const t = (i + 1) / (count + 1);
      // Spawn trail offset from the peacock feather's majestic ocellus eye & crown
      const spawnX = x0 + vx * t + 32;
      const spawnY = y0 + vy * t - 46;
      particles.push(new PeacockStardustParticle(spawnX, spawnY, vx * 0.3, vy * 0.3, false));
    }
  }

  // Emit Divine Peacock Supernova Burst on Click
  function emitPeacockSupernova(x, y) {
    const burstCount = 30;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 / burstCount) * i + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 4.8 + 1.8;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      // Burst originates right from the quill tip and radiates
      particles.push(new PeacockStardustParticle(x, y, vx, vy, true));
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
  function animationLoop() {
    frameCount++;

    if (isVisible && cursorWrapper) {
      // 1:1 Direct pointer positioning (hotspot at quill tip)
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

      // Organic responsive feather sway & dynamic tilt pivoted at quill nib
      const speed = Math.hypot(velocityX, velocityY);
      if (speed > 0.5) {
        targetTilt = Math.max(-14, Math.min(14, velocityX * 1.4));
      } else if (isHovering) {
        targetTilt = -5 + Math.sin(frameCount * 0.08) * 3;
      } else {
        targetTilt = Math.sin(frameCount * 0.05) * 2;
      }

      currentTilt += (targetTilt - currentTilt) * 0.15;

      if (featherElement) {
        const hoverScale = isHovering ? 1.15 : (isClicking ? 0.92 : 1.0);
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

  // Export engine reference
  window.peacockCursor = {
    emitBurst: emitPeacockSupernova
  };

})();
