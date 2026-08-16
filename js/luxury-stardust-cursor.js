// ==========================================================================
// GARGI PHOTOGRAPHIC ARTS - HARDWARE-ACCELERATED ZERO-LAG LUXURY CURSOR ENGINE
// 100% Zero-Latency Direct Pointer Sync + Lightweight Asynchronous Stardust Stream
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

  let mouseX = -200;
  let mouseY = -200;
  let lastX = -200;
  let lastY = -200;
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
  const MAX_PARTICLES = 30; // Optimized particle budget

  function createCursorDOM() {
    // 1. Hardware Accelerated Canvas for Stardust Stream
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

    // 2. Custom Gold Diamond Star & Camera Aperture Element
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
          <path d="M20 2 Q20 20 2 20 Q20 20 20 38 Q20 20 38 20 Q20 20 20 2 Z" fill="url(#goldStarGrad)" />
          <path d="M20 9 Q20 20 9 20 Q20 20 20 31 Q20 20 31 20 Q20 20 20 9 Z" fill="#FFEFA6" opacity="0.75" />
          <circle cx="20" cy="20" r="2.2" fill="#FFFFFF" />
        </svg>

        <!-- Click Shockwave Wave -->
        <div class="cursor-click-shockwave" id="cursorClickShockwave"></div>
      </div>
    `;

    document.body.appendChild(cursorWrapper);
    ringElement = cursorWrapper.querySelector('.cursor-aperture-ring');
  }

  // Lightweight 60-120FPS Particle Class
  class StardustFairyParticle {
    constructor(x, y, vx, vy, isBurst = false) {
      this.x = x + (Math.random() - 0.5) * 4;
      this.y = y + (Math.random() - 0.5) * 4;
      
      const speedMult = isBurst ? 3.2 : 0.7;
      this.vx = vx * 0.1 + (Math.random() - 0.5) * 1.2 * speedMult;
      this.vy = vy * 0.1 + (Math.random() - 0.5) * 1.2 * speedMult + (isBurst ? 0 : 0.15);
      
      this.size = Math.random() * (isBurst ? 2.8 : 2.0) + 0.8;
      this.maxLife = Math.random() * (isBurst ? 24 : 18) + 12;
      this.life = this.maxLife;
      this.alpha = 1.0;
      
      const colors = [
        '255, 239, 166',
        '255, 215, 0',
        '212, 175, 55',
        '255, 255, 255'
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.isStar = Math.random() > 0.65;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.94;
      this.vy *= 0.94;
      this.life--;
      this.alpha = Math.max(0, this.life / this.maxLife);
      this.size *= 0.95;
    }

    draw(ctx) {
      if (this.alpha <= 0.02) return;
      
      const a = this.alpha;
      const rgb = this.color;

      if (this.isStar && this.size > 0.9) {
        const cx = this.x;
        const cy = this.y;
        const s = this.size * 1.5;
        
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
        ctx.fillStyle = `rgba(${rgb}, ${a * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.8, 0, Math.PI * 2);
        ctx.fill();

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
    const count = Math.min(3, Math.max(1, Math.floor(dist / 8)));
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
    const burstCount = 16;
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 / burstCount) * i + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 3.2 + 1.2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      particles.push(new StardustFairyParticle(x, y, vx, vy, true));
    }
  }

  // 1. Direct Synchronous Hardware Mouse Tracking (0ms Latency)
  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      lastX = mouseX;
      lastY = mouseY;
      if (cursorWrapper) cursorWrapper.classList.add('visible');
    }

    // Direct GPU transform update on mouse event (instantaneous 1:1 motion)
    if (cursorWrapper) {
      cursorWrapper.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    if (lastX > 0 && lastY > 0) {
      const speed = Math.hypot(mouseX - lastX, mouseY - lastY);
      if (speed > 1.5) {
        emitStardustStream(lastX, lastY, mouseX, mouseY);
      }
    }

    lastX = mouseX;
    lastY = mouseY;
  }

  // 2. High-Performance Event Delegation for Hover (Fires only on element boundary crossing)
  function handleMouseOver(e) {
    const target = e.target;
    if (!target) return;

    const isInteractive = Boolean(
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
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

  function handleMouseEnter(e) {
    isVisible = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    lastX = mouseX;
    lastY = mouseY;
    if (cursorWrapper) {
      cursorWrapper.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      cursorWrapper.classList.add('visible');
    }
  }

  // 3. Independent Asynchronous Render Loop for Particles & Aperture Rotation
  function animationLoop() {
    // Continuous Aperture Rotation
    rotationAngle += isHovering ? 1.8 : 0.5;
    if (ringElement) {
      ringElement.style.transform = `rotate(${rotationAngle}deg)`;
    }

    // Render Canvas Particles
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
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
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
