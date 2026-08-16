// ==========================================================================
// GARGI PHOTOGRAPHIC ARTS - LUXURY GOLDEN STARDUST & APERTURE CURSOR ENGINE
// Replaces default mouse arrow with luxury lens flare star & dense fairy glitter trail
// ==========================================================================

(function() {
  'use strict';

  // Check if touch device / mobile screen or reduced motion preferred
  if (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.innerWidth <= 992
  ) {
    return; // Maintain standard touch navigation on mobile
  }

  // Hide default OS cursor globally across desktop
  document.documentElement.classList.add('custom-luxury-cursor-active');

  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;
  let lastX = -100;
  let lastY = -100;
  let isHovering = false;
  let isClicking = false;
  let isVisible = false;
  let rotationAngle = 0;
  let frameCount = 0;

  // DOM Elements
  let cursorWrapper = null;
  let canvas = null;
  let ctx = null;
  let particles = [];

  function createCursorDOM() {
    // 1. High-Density HTML5 Canvas for Golden Stardust Glitter Stream
    canvas = document.createElement('canvas');
    canvas.id = 'luxuryStardustCanvas';
    canvas.className = 'luxury-stardust-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // 2. Custom Gold Lens Flare Star & Camera Aperture Cursor Element
    cursorWrapper = document.createElement('div');
    cursorWrapper.id = 'luxuryStardustCursor';
    cursorWrapper.className = 'luxury-stardust-cursor';

    cursorWrapper.innerHTML = `
      <div class="stardust-cursor-inner" id="stardustCursorInner">
        <!-- Outer Rotating Delicate Aperture Ring -->
        <svg class="cursor-aperture-ring" viewBox="0 0 50 50" width="36" height="36">
          <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(212, 175, 55, 0.45)" stroke-width="1" stroke-dasharray="3 3" />
          <circle cx="25" cy="25" r="16" fill="none" stroke="rgba(255, 239, 166, 0.6)" stroke-width="0.8" />
        </svg>

        <!-- Center 4-Point Golden Diamond Sparkle Star & Precision Dot -->
        <svg class="cursor-diamond-star" viewBox="0 0 40 40" width="22" height="22">
          <defs>
            <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="35%" stop-color="#FFEFA6" />
              <stop offset="70%" stop-color="#D4AF37" />
              <stop offset="100%" stop-color="#AA7C11" />
            </linearGradient>
            <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <!-- 4-Point Star Rays -->
          <path d="M20 2 Q20 20 2 20 Q20 20 20 38 Q20 20 38 20 Q20 20 20 2 Z" fill="url(#goldStarGrad)" filter="url(#starGlow)" />
          <!-- Diagonal Subtle Accent Rays -->
          <path d="M20 9 Q20 20 9 20 Q20 20 20 31 Q20 20 31 20 Q20 20 20 9 Z" fill="#FFEFA6" opacity="0.6" />
          <!-- Central Focus Precision Dot -->
          <circle cx="20" cy="20" r="2.2" fill="#FFFFFF" />
        </svg>

        <!-- Click Shockwave Wave -->
        <div class="cursor-click-shockwave" id="cursorClickShockwave"></div>
      </div>
    `;

    document.body.appendChild(cursorWrapper);
  }

  // Dense Glowing Stardust Fairy Glitter Particle Class
  class StardustFairyParticle {
    constructor(x, y, vx, vy, isBurst = false) {
      this.x = x + (Math.random() - 0.5) * (isBurst ? 10 : 8);
      this.y = y + (Math.random() - 0.5) * (isBurst ? 10 : 8);
      
      const speedMult = isBurst ? 4.5 : 1.0;
      this.vx = vx * 0.15 + (Math.random() - 0.5) * 1.6 * speedMult;
      this.vy = vy * 0.15 + (Math.random() - 0.5) * 1.6 * speedMult + (isBurst ? 0 : 0.25); // Gentle downward float
      
      this.size = Math.random() * (isBurst ? 3.5 : 2.6) + 1.0;
      this.maxLife = Math.random() * (isBurst ? 35 : 28) + 20;
      this.life = this.maxLife;
      this.alpha = 1.0;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.2 + 0.1;
      
      // Luxury Golden & Champagne Palette (Matching Fairy Dust Stream in screenshot)
      const colors = [
        '255, 239, 166', // Pale Champagne Gold
        '255, 215, 0',   // Pure Gold
        '212, 175, 55',   // Rich Metallic Gold
        '255, 255, 255', // Diamond White Sparkle
        '255, 193, 7'    // Warm Amber Gold
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.isStar = Math.random() > 0.65; // 35% of particles render as sparkling 4-point micro stars!
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.94;
      this.vy *= 0.94;
      this.life--;
      this.twinklePhase += this.twinkleSpeed;
      
      const lifeRatio = this.life / this.maxLife;
      const shimmer = 0.8 + 0.2 * Math.sin(this.twinklePhase);
      this.alpha = lifeRatio * shimmer;
      this.size *= 0.97;
    }

    draw(ctx) {
      if (this.alpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
      ctx.fillStyle = `rgb(${this.color})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${this.color}, 0.85)`;

      if (this.isStar && this.size > 1.2) {
        // Draw 4-point micro sparkle star
        const cx = this.x;
        const cy = this.y;
        const s = this.size * 1.8;
        ctx.beginPath();
        ctx.moveTo(cx, cy - s);
        ctx.quadraticCurveTo(cx, cy, cx - s, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy + s);
        ctx.quadraticCurveTo(cx, cy, cx + s, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy - s);
        ctx.closePath();
        ctx.fill();
      } else {
        // Draw glowing circular stardust spark
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Emit Dense Stardust Trail between last mouse point and current mouse point (Streamer effect)
  function emitStardustStream(x0, y0, x1, y1, speed) {
    const dist = Math.hypot(x1 - x0, y1 - y0);
    // Number of particles proportional to movement distance to ensure UNBROKEN streamer
    const count = Math.min(12, Math.max(2, Math.floor(dist / 4)));
    
    const vx = x1 - x0;
    const vy = y1 - y0;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const interpX = x0 + vx * t;
      const interpY = y0 + vy * t;
      particles.push(new StardustFairyParticle(interpX, interpY, vx, vy, false));
    }
  }

  function emitClickSupernova(x, y) {
    // Radiant burst of 32+ sparkling stardust stars on click
    for (let i = 0; i < 32; i++) {
      const angle = (Math.PI * 2 / 32) * i + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 4.5 + 2.0;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      particles.push(new StardustFairyParticle(x, y, vx, vy, true));
    }
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      cursorX = mouseX;
      cursorY = mouseY;
      lastX = mouseX;
      lastY = mouseY;
      if (cursorWrapper) cursorWrapper.classList.add('visible');
    }

    // Check if hovering over interactive clickable elements
    const target = e.target;
    const isInteractive = Boolean(
      target.closest('a') ||
      target.closest('button') ||
      target.closest('.gallery-card') ||
      target.closest('.category-tile') ||
      target.closest('.filter-btn') ||
      target.closest('.sub-filter-btn') ||
      target.closest('.modal-close-btn') ||
      target.closest('.lightbox-nav-arrow') ||
      target.closest('.multi-edit-btn') ||
      target.closest('.audio-control-btn') ||
      target.closest('input') ||
      target.closest('textarea') ||
      target.closest('.theme-card')
    );

    if (isInteractive !== isHovering) {
      isHovering = isInteractive;
      if (isHovering) {
        cursorWrapper.classList.add('hovering-interactive');
      } else {
        cursorWrapper.classList.remove('hovering-interactive');
      }
    }
  }

  function handleMouseDown(e) {
    if (!cursorWrapper) return;
    isClicking = true;
    cursorWrapper.classList.add('clicking-active');

    // Trigger Click Shockwave Animation
    const shockwave = document.getElementById('cursorClickShockwave');
    if (shockwave) {
      shockwave.classList.remove('active-shockwave');
      void shockwave.offsetWidth;
      shockwave.classList.add('active-shockwave');
    }

    // Emit Supernova Burst
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

  function handleMouseEnter() {
    isVisible = true;
    if (cursorWrapper) {
      cursorWrapper.classList.add('visible');
    }
  }

  // 60FPS Render & Physics Loop
  function animationLoop() {
    frameCount++;

    // Smooth Cursor Tracking (High responsiveness with subtle organic lag)
    const LERP = 0.35;
    cursorX += (mouseX - cursorX) * LERP;
    cursorY += (mouseY - cursorY) * LERP;

    // Slowly rotate the aperture ring
    rotationAngle += isHovering ? 2.5 : 0.8;

    // Update Cursor Position in DOM
    if (cursorWrapper && isVisible) {
      cursorWrapper.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      const ring = cursorWrapper.querySelector('.cursor-aperture-ring');
      if (ring) {
        ring.style.transform = `rotate(${rotationAngle}deg)`;
      }
    }

    // Emit Stardust Glitter Stream between last and current position
    if (isVisible && lastX > 0 && lastY > 0) {
      const speed = Math.hypot(cursorX - lastX, cursorY - lastY);
      if (speed > 0.8) {
        emitStardustStream(lastX, lastY, cursorX, cursorY, speed);
      }
    }

    lastX = cursorX;
    lastY = cursorY;

    // Render Stardust Stream on Canvas
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0 || p.alpha <= 0.01) {
          particles.splice(i, 1);
        }
      }
    }

    requestAnimationFrame(animationLoop);
  }

  // Initialize on DOM Ready
  function init() {
    createCursorDOM();
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    requestAnimationFrame(animationLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
