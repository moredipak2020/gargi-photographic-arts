// ==========================================================================
// GARGI PHOTOGRAPHIC ARTS - JEWEL-TONED HUMMINGBIRD ANIMATED CURSOR ENGINE
// Realistic aerodynamics, upright pitch lock (±35° max), and nectar straw click
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
  const LERP_FACTOR = 0.13; // Flight smoothing factor
  const MAX_PITCH_DEG = 35; // Strict clamping: prevents upside-down orientation
  const PARTICLE_EMIT_INTERVAL = 2; // Frames between stardust emission

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let birdX = mouseX;
  let birdY = mouseY;
  let birdVelocityX = 0;
  let birdVelocityY = 0;
  
  let currentPitch = 0;
  let targetPitch = 0;
  let currentScaleX = 1; // 1 = facing right, -1 = facing left
  let targetFacing = 1;

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
    // 1. Create Canvas for Golden & Prismatic Stardust Trail
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

    // 3. SVG Hummingbird: Vivid Jewel Tones (Emerald, Sapphire, Ruby, Gold)
    cursorContainer.innerHTML = `
      <div class="hummingbird-wrapper" id="hummingbirdBirdWrapper">
        <svg class="hummingbird-svg" viewBox="0 0 130 95" width="88" height="66" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <!-- Emerald Iridescent Crown & Back Gradient -->
            <linearGradient id="emeraldIridescentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00E5FF" />
              <stop offset="30%" stop-color="#00E676" />
              <stop offset="65%" stop-color="#D4AF37" />
              <stop offset="100%" stop-color="#00796B" />
            </linearGradient>

            <!-- Ruby-Magenta Throat Gorget Gradient -->
            <linearGradient id="rubyGorgetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF1744" />
              <stop offset="50%" stop-color="#F50057" />
              <stop offset="85%" stop-color="#D500F9" />
              <stop offset="100%" stop-color="#FFD700" />
            </linearGradient>

            <!-- Sapphire-Prism Translucent Wing Gradient -->
            <linearGradient id="sapphireWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="rgba(0, 229, 255, 0.95)" />
              <stop offset="35%" stop-color="rgba(41, 121, 255, 0.85)" />
              <stop offset="70%" stop-color="rgba(101, 31, 255, 0.7)" />
              <stop offset="100%" stop-color="rgba(212, 175, 55, 0.55)" />
            </linearGradient>

            <!-- Chest & Belly Champagne Gradient -->
            <linearGradient id="chestBellyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="40%" stop-color="#E0F7FA" />
              <stop offset="75%" stop-color="#FFEFA6" />
              <stop offset="100%" stop-color="#D4AF37" />
            </linearGradient>

            <!-- Nectar Straw Stream Gradient -->
            <linearGradient id="nectarStrawGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#FFEFA6" />
              <stop offset="50%" stop-color="#FFD700" />
              <stop offset="100%" stop-color="#FF4081" />
            </linearGradient>

            <filter id="jewelGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <!-- Split Forked Sapphire-Emerald Tail Feathers -->
          <g class="bird-tail-group">
            <path d="M26 52 L4 68 Q14 50 28 46 Z" fill="#00796B" />
            <path d="M24 50 L0 60 Q12 46 26 44 Z" fill="#2979FF" opacity="0.9" />
            <path d="M22 48 L2 52 Q14 44 26 42 Z" fill="#00E5FF" opacity="0.8" />
          </g>

          <!-- Left / Back Wing (Sapphire Prism) -->
          <g class="bird-wing wing-back">
            <path d="M52 40 C46 16, 32 -4, 24 -10 C30 4, 38 24, 44 42 Z" fill="url(#sapphireWingGrad)" filter="url(#jewelGlowFilter)" />
          </g>

          <!-- Torso & Emerald Iridescent Back -->
          <path class="bird-back" d="M26 46 C34 32, 56 26, 72 32 C82 36, 88 44, 82 54 C78 62, 50 64, 34 56 C28 53, 26 49, 26 46 Z" fill="url(#emeraldIridescentGrad)" />

          <!-- Soft Chest & Belly Layer -->
          <path class="bird-belly" d="M44 38 C56 34, 70 38, 76 46 C70 54, 52 56, 40 48 Z" fill="url(#chestBellyGrad)" opacity="0.9" />

          <!-- Iridescent Scalloped Feather Accent -->
          <path d="M48 36 C58 32, 72 35, 78 42 C72 48, 56 50, 44 44 Z" fill="#00E5FF" opacity="0.35" />

          <!-- Head & Emerald Crown -->
          <circle cx="82" cy="38" r="10.5" fill="url(#emeraldIridescentGrad)" />

          <!-- Brilliant Ruby-Magenta Throat Gorget -->
          <path d="M76 42 C82 40, 88 44, 84 50 C78 54, 74 48, 76 42 Z" fill="url(#rubyGorgetGrad)" filter="url(#jewelGlowFilter)" />

          <!-- Obsidian Eye with Diamond Catchlight -->
          <circle cx="84.5" cy="35" r="2.8" fill="#111111" />
          <circle cx="85.5" cy="34" r="1.1" fill="#FFFFFF" />

          <!-- Needle Beak (Slender & Proportional) -->
          <path class="bird-beak" d="M91 38 L116 40 L91 41.5 Z" fill="#212121" />

          <!-- Extendable Luminous Nectar Straw / Tongue -->
          <line class="nectar-straw" id="nectarStrawLine" x1="115" y1="40" x2="135" y2="40" stroke="url(#nectarStrawGrad)" stroke-width="2.2" stroke-linecap="round" />

          <!-- Right / Front Wing (Sapphire Prism) -->
          <g class="bird-wing wing-front">
            <path d="M58 42 C54 18, 42 -2, 34 -8 C40 6, 48 24, 54 45 Z" fill="url(#sapphireWingGrad)" filter="url(#jewelGlowFilter)" />
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

  // Prismatic Jewel Stardust Particle Engine
  class StardustParticle {
    constructor(x, y, vx, vy) {
      this.x = x + (Math.random() - 0.5) * 10;
      this.y = y + (Math.random() - 0.5) * 10;
      this.vx = vx * 0.15 + (Math.random() - 0.5) * 0.9;
      this.vy = vy * 0.15 + (Math.random() - 0.5) * 0.9 + 0.35;
      this.size = Math.random() * 3.2 + 1.4;
      this.alpha = 0.95;
      this.decay = Math.random() * 0.024 + 0.016;
      
      // Jewel Particle Colors: Gold, Emerald, Cyan, Ruby Magenta
      const colors = ['212, 175, 55', '0, 229, 255', '0, 230, 118', '255, 23, 68', '255, 239, 166'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      this.size *= 0.95;
    }

    draw(ctx) {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
      ctx.restore();
    }
  }

  function emitNectarBurst(x, y) {
    // Burst of 24 multi-colored nectar sparkles on click
    for (let i = 0; i < 24; i++) {
      const angle = (Math.PI * 2 / 24) * i + (Math.random() - 0.5);
      const speed = Math.random() * 5.0 + 2.2;
      const p = new StardustParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed);
      p.size = Math.random() * 4.0 + 2.0;
      p.decay = Math.random() * 0.03 + 0.018;
      particles.push(p);
    }
  }

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

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

    // Beak Tip Coordinate calculation based on horizontal facing
    const beakOffset = 58;
    const rad = currentPitch * Math.PI / 180;
    const beakX = birdX + (targetFacing > 0 ? Math.cos(rad) * beakOffset : -Math.cos(rad) * beakOffset);
    const beakY = birdY + Math.sin(rad) * beakOffset;

    emitNectarBurst(e.clientX || beakX, e.clientY || beakY);

    const sparkle = document.getElementById('nectarBloomSparkle');
    if (sparkle) {
      sparkle.classList.remove('bloom-trigger');
      void sparkle.offsetWidth;
      sparkle.classList.add('bloom-trigger');
    }

    setTimeout(() => {
      isPecking = false;
      cursorContainer.classList.remove('pecking-active');
    }, 280);
  }

  // Main 60FPS Physics & Aerodynamics Loop
  function animationLoop() {
    frameCount++;

    // 1. Smooth Flight Lerp
    const dx = mouseX - birdX;
    const dy = mouseY - birdY;

    birdVelocityX = dx * LERP_FACTOR;
    birdVelocityY = dy * LERP_FACTOR;

    birdX += birdVelocityX;
    birdY += birdVelocityY;

    const speed = Math.hypot(birdVelocityX, birdVelocityY);

    // 2. Pro Aerodynamics: Upright Orientation & Clamped Pitch
    if (Math.abs(birdVelocityX) > 0.4) {
      targetFacing = birdVelocityX >= 0 ? 1 : -1;
    }

    // Smooth horizontal turn flipping
    currentScaleX += (targetFacing - currentScaleX) * 0.22;

    if (speed > 0.4 && !isPecking) {
      // Calculate vertical pitch (tilt up/down) based on flight trajectory
      const forwardVelocity = Math.abs(birdVelocityX);
      const rawPitch = Math.atan2(birdVelocityY, Math.max(1.0, forwardVelocity)) * (180 / Math.PI);
      
      // STRICT CLAMPING: Pitch is locked strictly between -35° and +35° (Head ALWAYS UP!)
      targetPitch = Math.max(-MAX_PITCH_DEG, Math.min(MAX_PITCH_DEG, rawPitch));
    } else if (isHovering) {
      // Gentle hovering tilt
      targetPitch = -12 + Math.sin(frameCount * 0.12) * 6; // Head tilted gracefully up towards element
    } else {
      targetPitch = Math.sin(frameCount * 0.08) * 4; // Neutral resting float
    }

    // Smooth pitch interpolation
    currentPitch += (targetPitch - currentPitch) * 0.16;

    // 3. Update Cursor Position & Upright Transforms in DOM
    if (cursorContainer) {
      cursorContainer.style.transform = `translate3d(${birdX}px, ${birdY}px, 0)`;
    }

    if (birdWrapper) {
      // Align beak tip smoothly near cursor position
      const hoverHoverOffset = isHovering ? Math.sin(frameCount * 0.14) * 4 : 0;
      const xOffset = targetFacing > 0 ? -48 : -40;
      
      birdWrapper.style.transform = `
        translate(${xOffset}px, -32px)
        scaleX(${currentScaleX})
        rotate(${currentPitch}deg)
        translateY(${hoverHoverOffset}px)
      `;
    }

    // 4. Emit Prismatic Stardust Trail Particles
    if (speed > 1.0 && frameCount % PARTICLE_EMIT_INTERVAL === 0) {
      const tailX = birdX - targetFacing * 32;
      const tailY = birdY + 12;
      particles.push(new StardustParticle(tailX, tailY, -birdVelocityX * 0.35, -birdVelocityY * 0.35));
    }

    // 5. Render Stardust Particles
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
