// ==========================================================================
// GARGI PHOTOGRAPHIC ARTS - ULTRA-SMOOTH LUXURY GOLDEN STARDUST CURSOR ENGINE
// High-performance 120fps hardware-accelerated particle renderer & zero-lag star
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

  // Global desktop cursor replacement
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

  // DOM Elements
  let cursorWrapper = null;
  let ringElement = null;
  let canvas = null;
  let ctx = null;
  let particles = [];
  const MAX_PARTICLES = 36; // Optimized particle budget for buttery 120fps

  function createCursorDOM() {
    // 1. Fullscreen HTML5 Stardust Canvas
    canvas = document.createElement('canvas');
    canvas.id = 'luxuryStardustCanvas';
    canvas.className = 'luxury-stardust-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d', { alpha: true });
    document.body.appendChild(canvas);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, { passive: true });

    // 2. Custom Gold Diamond Star & Camera Aperture Core
    cursorWrapper = document.createElement('div');
    cursorWrapper.id = 'luxuryStardustCursor';
    cursorWrapper.className = 'luxury-stardust-cursor';

    cursorWrapper.innerHTML = `
      <div class="stardust-cursor-inner" id="stardustCursorInner">
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
          <!-- 4-Point Star Rays -->
          <path d="M20 2 Q20 20 2 20 Q20 20 20 38 Q20 20 38 20 Q20 20 20 2 Z" fill="url(#goldStarGrad)" />
          <!-- Diagonal Accent Rays -->
          <path d="M20 9 Q20 20 9 20 Q20 20 20 31 Q20 20 31 20 Q20 20 20 9 Z" fill="#FFEFA6" opacity="0.7" />
          <!-- Center Precision Focus Dot -->
          <circle cx="20" cy="20" r="2.2" fill="#FFFFFF" />
        </svg>

        <!-- Click Shockwave Wave -->
        <div class="cursor-click-shockwave" id="cursorClickShockwave"></div>
      </div>
    `;

    document.body.appendChild(cursorWrapper);
    ringElement = cursorWrapper.querySelector('.cursor-aperture-ring');
  }

  // Lightweight High-Performance Stardust Fairy Particle Class
  class StardustFairyParticle {
    constructor(x, y, vx, vy, isBurst = false) {
      this.x = x + (Math.random() - 0.5) * 6;
      this.y = y + (Math.random() - 0.5) * 6;
      
      const speedMult = isBurst ? 3.5 : 0.8;
      this.vx = vx * 0.12 + (Math.random() - 0.5) * 1.2 * speedMult;
      this.vy = vy * 0.12 + (Math.random() - 0.5) * 1.2 * speedMult + (isBurst ? 0 : 0.2);
      
      this.size = Math.random() * (isBurst ? 3.0 : 2.2) + 0.8;
      this.maxLife = Math.random() * (isBurst ? 25 : 20) + 15;
      this.life = this.maxLife;
      this.alpha = 1.0;
      
      // Golden Champagne Color Palette
      const colors = [
        '255, 239, 166', // Champagne
        '255, 215, 0',   // Gold
        '212, 175, 55',   // Rich Gold
        '255, 255, 255'  // Diamond
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.isStar = Math.random() > 0.60;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.95;
      this.vy *= 0.95;
      this.life--;
      this.alpha = Math.max(0, this.life / this.maxLife);
      this.size *= 0.96;
    }

    draw(ctx) {
      if (this.alpha <= 0.02) return;
      
      const a = this.alpha;
      const rgb = this.color;

      if (this.isStar && this.size > 1.0) {
        // Fast direct 4-point micro star (No shadowBlur bottleneck)
        const cx = this.x;
        const cy = this.y;
        const s = this.size * 1.6;
        
        ctx.fillStyle = `rgba(${rgb}, ${a})`;
        ctx.beginPath();
        ctx.moveTo(cx, cy - s);
        ctx.quadraticCurveTo(cx, cy, cx - s, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy + s);
        ctx.quadraticCurveTo(cx, cy, cx + s, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy - s);
        ctx.closePath();
        ctx.fill();
      } else {
        // High-speed 2-pass glow particle
        // Outer soft glow halo
        ctx.fillStyle = `rgba(${rgb}, ${a * 0.35})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2.0, 0, Math.PI * 2);
        ctx.fill();

        // Inner sharp spark
        ctx.fillStyle = `rgba(${rgb}, ${a})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function emitStardustStream(x0, y0, x1, y1) {
    if (particles.length >= MAX_PARTICLES) return;
    
    const dist = Math.hypot(x1 - x0, y1 - y0);
    const count = Math.min(4, Math.max(1, Math.floor(dist / 6)));
    const vx = x1 - x0;
    const vy = y1 - y0;

    for (let i = 0; i < count; i++) {
      if (particles.length >= MAX_PARTICLES) break;
      const t = i / count;
      const interpX = x0 + vx * t;
      const interpY = y0 + vy * t;
      particles.push(new StardustFairyParticle(interpX, interpY, vx, vy, false));
    }
  }

  function emitClickSupernova(x, y) {
    const burstCount = 18;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 / burstCount) * i + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 3.5 + 1.5;
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

    // Interactive target detection
    const target = e.target;
    const isInteractive = Boolean(
      target.closest('a') ||
      target.closest('button') ||
      target.closest('.gallery-card') ||
      target.closest('.museum-frame-card') ||
      target.closest('.category-tile') ||
      target.closest('.filter-btn') ||
      target.closest('.sub-filter-btn') ||
      target.closest('.modal-close-btn') ||
      target.closest('.lightbox-nav-arrow') ||
      target.closest('.multi-edit-btn') ||
      target.closest('.audio-control-btn') ||
      target.closest('input') ||
      target.closest('textarea')
    );

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

    const shockwave = document.getElementById('cursorClickShockwave');
    if (shockwave) {
      shockwave.classList.remove('active-shockwave');
      void shockwave.offsetWidth;
      shockwave.classList.add('active-shockwave');
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

  function handleMouseEnter() {
    isVisible = true;
    if (cursorWrapper) {
      cursorWrapper.classList.add('visible');
    }
  }

  // Ultra-Fast Zero-Lag Animation Loop (120 FPS capable)
  function animationLoop() {
    // Ultra-Responsive Direct Tracking with Micro Smoothing (0.85 LERP = zero latency)
    const LERP = 0.82;
    cursorX += (mouseX - cursorX) * LERP;
    cursorY += (mouseY - cursorY) * LERP;

    // Smooth Aperture Rotation
    rotationAngle += isHovering ? 2.0 : 0.6;

    // DOM Hardware-Accelerated Transform
    if (cursorWrapper && isVisible) {
      cursorWrapper.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      if (ringElement) {
        ringElement.style.transform = `rotate(${rotationAngle}deg)`;
      }
    }

    // Emit Stardust Stream
    if (isVisible && lastX > 0 && lastY > 0) {
      const speed = Math.hypot(cursorX - lastX, cursorY - lastY);
      if (speed > 1.2) {
        emitStardustStream(lastX, lastY, cursorX, cursorY);
      }
    }

    lastX = cursorX;
    lastY = cursorY;

    // Canvas Render
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

  // Initialize
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
