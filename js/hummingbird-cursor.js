// ==========================================================================
// GARGI PHOTOGRAPHIC ARTS - GOLDEN HUMMINGBIRD ANIMATED CURSOR ENGINE
// High-performance 60FPS flight kinematics, wing flutter, and nectar straw click
// ==========================================================================

(function() {
  'use strict';

  // Check if touch device / mobile screen or reduced motion preferred
  if (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.innerWidth <= 992
  ) {
    return; // Keep natural touch experience on mobile
  }

  // Configuration Constants
  const LERP_FACTOR = 0.14; // Flight smoothing responsiveness
  const FLIGHT_BANKING_MAX = 28; // Max banking angle in degrees
  const PARTICLE_EMIT_INTERVAL = 3; // Frames between stardust emission

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let birdX = mouseX;
  let birdY = mouseY;
  let birdAngle = 0;
  let birdVelocityX = 0;
  let birdVelocityY = 0;
  let isHovering = false;
  let isPecking = false;
  let frameCount = 0;

  // DOM Elements
  let cursorContainer = null;
  let birdWrapper = null;
  let nectarStraw = null;
  let canvas = null;
  let ctx = null;
  let particles = [];

  function createHummingbirdDOM() {
    // 1. Create Canvas for Golden Stardust Trail
    canvas = document.createElement('canvas');
    canvas.id = 'hummingbirdTrailCanvas';
    canvas.className = 'hummingbird-trail-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // 2. Create Hummingbird Cursor Container
    cursorContainer = document.createElement('div');
    cursorContainer.id = 'goldenHummingbirdCursor';
    cursorContainer.className = 'hummingbird-cursor-container';

    // 3. SVG Golden Hummingbird with Wing Anatomy & Nectar Straw
    cursorContainer.innerHTML = `
      <div class="hummingbird-wrapper" id="hummingbirdBirdWrapper">
        <svg class="hummingbird-svg" viewBox="0 0 100 80" width="56" height="45" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- Metallic Gold Gradients -->
            <linearGradient id="goldBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFEFA6" />
              <stop offset="35%" stop-color="#D4AF37" />
              <stop offset="70%" stop-color="#AA7C11" />
              <stop offset="100%" stop-color="#6B4B03" />
            </linearGradient>

            <linearGradient id="goldWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="rgba(255, 239, 166, 0.9)" />
              <stop offset="50%" stop-color="rgba(212, 175, 55, 0.75)" />
              <stop offset="100%" stop-color="rgba(170, 124, 17, 0.4)" />
            </linearGradient>

            <linearGradient id="strawNectarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FFEFA6" />
              <stop offset="60%" stop-color="#FFD700" />
              <stop offset="100%" stop-color="#FFFFFF" />
            </linearGradient>

            <filter id="goldGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Tail Feathers -->
          <path class="bird-tail" d="M22 42 L6 52 Q12 40 24 38 Z" fill="url(#goldBodyGrad)" />
          <path class="bird-tail-accent" d="M20 40 L2 46 Q10 38 22 36 Z" fill="#FFEFA6" opacity="0.8" />

          <!-- Left / Back Wing -->
          <g class="bird-wing wing-back">
            <path d="M42 32 C38 12, 28 -2, 22 -6 C26 6, 32 20, 36 34 Z" fill="url(#goldWingGrad)" filter="url(#goldGlowFilter)" />
          </g>

          <!-- Main Torso & Belly -->
          <path class="bird-body" d="M22 38 C28 26, 46 22, 58 26 C66 29, 72 35, 68 43 C64 50, 42 52, 28 46 C24 43, 22 40, 22 38 Z" fill="url(#goldBodyGrad)" />

          <!-- Iridescent Chest Feathers Overlay -->
          <path d="M38 30 C46 28, 56 31, 60 36 C56 42, 44 44, 34 38 Z" fill="#FFEFA6" opacity="0.45" />

          <!-- Head & Crown -->
          <circle cx="68" cy="30" r="8.5" fill="url(#goldBodyGrad)" />
          <circle cx="70" cy="28" r="2.2" fill="#2A1B02" />
          <circle cx="70.8" cy="27.2" r="0.8" fill="#FFFFFF" />

          <!-- Ruby/Amber Throat Shimmer -->
          <ellipse cx="64" cy="35" rx="4.5" ry="3" fill="#D4AF37" opacity="0.9" />

          <!-- Slender Beak Base -->
          <path class="bird-beak" d="M75 30 L94 32 L75 32.8 Z" fill="#AA7C11" />

          <!-- Extendable Nectar Straw / Tongue -->
          <line class="nectar-straw" id="nectarStrawLine" x1="93" y1="32" x2="108" y2="32" stroke="url(#strawNectarGrad)" stroke-width="1.8" stroke-linecap="round" />

          <!-- Right / Fore Wing -->
          <g class="bird-wing wing-front">
            <path d="M46 34 C44 14, 36 -2, 30 -8 C34 4, 40 18, 44 36 Z" fill="url(#goldWingGrad)" filter="url(#goldGlowFilter)" />
          </g>
        </svg>

        <!-- Hover Feeding Aura -->
        <div class="feeding-aura" id="feedingAura"></div>

        <!-- Beak Tip Sparkle Bloom -->
        <div class="nectar-bloom-sparkle" id="nectarBloomSparkle"></div>
      </div>
    `;

    document.body.appendChild(cursorContainer);
    birdWrapper = document.getElementById('hummingbirdBirdWrapper');
    nectarStraw = document.getElementById('nectarStrawLine');
  }

  // Golden Stardust Particle Engine
  class StardustParticle {
    constructor(x, y, vx, vy) {
      this.x = x + (Math.random() - 0.5) * 8;
      this.y = y + (Math.random() - 0.5) * 8;
      this.vx = vx * 0.15 + (Math.random() - 0.5) * 0.8;
      this.vy = vy * 0.15 + (Math.random() - 0.5) * 0.8 + 0.3; // Gentle downward drift
      this.size = Math.random() * 2.8 + 1.2;
      this.alpha = 0.9;
      this.decay = Math.random() * 0.025 + 0.015;
      this.color = Math.random() > 0.4 ? '212, 175, 55' : '255, 239, 166'; // Gold & Champagne
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      this.size *= 0.96;
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(212, 175, 55, ${this.alpha})`;
      ctx.fill();
      ctx.restore();
    }
  }

  function emitNectarBurst(x, y) {
    // Burst of 16-22 golden nectar particles radiating outward on click
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 / 20) * i + (Math.random() - 0.5);
      const speed = Math.random() * 4.5 + 2.0;
      const p = new StardustParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed);
      p.size = Math.random() * 3.5 + 1.8;
      p.decay = Math.random() * 0.03 + 0.02;
      particles.push(p);
    }
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Check if hovering over interactive element
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
      target.closest('textarea')
    );

    if (isInteractive !== isHovering) {
      isHovering = isInteractive;
      if (isHovering) {
        cursorContainer.classList.add('hovering-element');
      } else {
        cursorContainer.classList.remove('hovering-element');
      }
    }
  }

  function handleClick(e) {
    if (!birdWrapper) return;

    isPecking = true;
    cursorContainer.classList.add('pecking-active');

    // Calculate Beak Tip Global Coordinate
    const beakTipOffset = 42; // Distance from center to beak tip
    const rad = birdAngle * Math.PI / 180;
    const beakX = birdX + Math.cos(rad) * beakTipOffset;
    const beakY = birdY + Math.sin(rad) * beakTipOffset;

    // Trigger Nectar Particle Burst & Visual Ripple
    emitNectarBurst(e.clientX || beakX, e.clientY || beakY);

    const sparkle = document.getElementById('nectarBloomSparkle');
    if (sparkle) {
      sparkle.classList.remove('bloom-trigger');
      void sparkle.offsetWidth; // Trigger reflow
      sparkle.classList.add('bloom-trigger');
    }

    setTimeout(() => {
      isPecking = false;
      cursorContainer.classList.remove('pecking-active');
    }, 280);
  }

  // Main 60FPS Physics & Render Loop
  function animationLoop() {
    frameCount++;

    // 1. Smooth Lerp Motion (Follow cursor)
    const dx = mouseX - birdX;
    const dy = mouseY - birdY;

    birdVelocityX = dx * LERP_FACTOR;
    birdVelocityY = dy * LERP_FACTOR;

    birdX += birdVelocityX;
    birdY += birdVelocityY;

    const speed = Math.hypot(birdVelocityX, birdVelocityY);

    // 2. Flight Angle & Banking Calculation
    if (speed > 0.4 && !isPecking) {
      const targetAngle = Math.atan2(birdVelocityY, birdVelocityX) * (180 / Math.PI);
      
      // Smooth angle interpolation to prevent erratic spinning
      let angleDiff = targetAngle - birdAngle;
      while (angleDiff < -180) angleDiff += 360;
      while (angleDiff > 180) angleDiff -= 360;
      birdAngle += angleDiff * 0.18;
    }

    // Dynamic Banking Tilt based on turning rate & lateral velocity
    const banking = Math.max(-FLIGHT_BANKING_MAX, Math.min(FLIGHT_BANKING_MAX, birdVelocityX * 1.5));

    // 3. Update Cursor Position in DOM
    if (cursorContainer) {
      cursorContainer.style.transform = `translate3d(${birdX}px, ${birdY}px, 0)`;
    }

    if (birdWrapper) {
      // Offset so the beak tip aligns directly with cursor pointer
      const hoverHoverOffset = isHovering ? Math.sin(frameCount * 0.12) * 3 : 0;
      birdWrapper.style.transform = `translate(-35px, -24px) rotate(${birdAngle}deg) rotateX(${banking}deg) translateY(${hoverHoverOffset}px)`;
    }

    // 4. Emit Stardust Trail Particles while moving
    if (speed > 1.2 && frameCount % PARTICLE_EMIT_INTERVAL === 0) {
      // Emit particle near tail feathers (behind the bird)
      const rad = birdAngle * Math.PI / 180;
      const tailX = birdX - Math.cos(rad) * 22;
      const tailY = birdY - Math.sin(rad) * 22;
      particles.push(new StardustParticle(tailX, tailY, -birdVelocityX * 0.3, -birdVelocityY * 0.3));
    }

    // 5. Render Stardust Particles on Canvas
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }
    }

    requestAnimationFrame(animationLoop);
  }

  // Initialize on DOM Ready
  function init() {
    createHummingbirdDOM();
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleClick, { passive: true });
    requestAnimationFrame(animationLoop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
