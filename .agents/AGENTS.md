# Project Rules & Architectural Safeguards - Gargi Photographic Arts

## 1. Core Project Information & Deployment
- **Website**: https://gargi-photographic-arts.pages.dev
- **Owner**: Dipak More (gargi.photographic.arts@gmail.com)
- **Deployment**: `npx wrangler pages deploy . --project-name=gargi-photographic-arts --commit-dirty=true`
- **Git Remote**: `https://github.com/moredipak2020/gargi-photographic-arts.git` (`main` branch)

---

## 2. DRM & Lockscreen Security Subsystem (STRICTLY FROZEN)
- **Dedicated Single Source of Truth**: `js/image-protection.js`
- **Architectural Rule**: Do NOT modify or refactor `js/image-protection.js` during standard UI/UX, gallery, audio, or typography updates. It is a strictly isolated security module.
- **State Machine Isolation**: The `isCaptureLocked` engine enforces an immutable 3-second lockout upon PrintScreen (`PrtScn`, `Win+Shift+S`, `Ctrl+P`, `blur`, `visibilitychange`).
- **Pointer Decoupling**: Mousemove, pointer tracking, and click events must NEVER dismiss or interrupt an active capture lock.
- **Instant Veil Transition**: `.anti-snip-shield.active` and `html.drm-defocused-guard` must ALWAYS use `transition: none !important;` for 0ms instantaneous frame masking.
- **Continuous Clipboard Sanitizer**: Overwrites clipboard memory with official copyright assertion text during capture attempts.

---

## 3. Gallery Grid & Optical Spacing Architecture
- **Masonry Layout Engine**: CSS multi-columns (`column-count: 3;`).
- **Optical Gap Balance**:
  - Horizontal column gap: `--gallery-gap-x: 1.15rem;` (18.4px).
  - Vertical bottom margin: `--gallery-gap-y: 1.6rem;` (25.6px) on all `.gallery-card` and `.museum-frame-card` items.
  - Responsive scale: `--gallery-gap-x: 1.05rem; --gallery-gap-y: 1.35rem;` on tablets ($\le 992\text{px}$) and `--gallery-gap-y: 1.15rem;` on mobile ($\le 576\text{px}$).
- **Column Integrity**: Every card MUST include `break-inside: avoid; page-break-inside: avoid; -webkit-column-break-inside: avoid; display: inline-block; width: 100%;`.

---

## 4. Visual Identity, Glassmorphism & Typography Standards
- **Lightbox Modal Theme**: Pure Luminous White Translucent Morphic Glass (`background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(35px) saturate(1.8) brightness(1.12); border: 1px solid rgba(255, 255, 255, 0.45);`).
- **Lightbox Typography**: High-contrast Obsidian Black (`#0A0914`) and rich metallic gold (`#8C6207`) with Slate labels (`#58536E`) inside `.lightbox-details` and `.exif-list`.
- **Card Overlays**: Hidden by default (`opacity: 0; visibility: hidden; transform: translateY(15px);`). Text overlays must ONLY appear on `:hover`.
- **Floating Island Museum Frames**: Cards must feature 3D depth elevation (`border: 1.5px solid rgba(255, 255, 255, 0.16); box-shadow: 0 15px 35px rgba(0,0,0,0.65);`) with upward hover lift (`transform: translateY(-10px) scale(1.025);`).

---

## 5. Ambient Audio Engine (`js/audio-player.js`)
- **Default Sound Level**: Fixed at **`0.30` (30%)** for a calm, non-intrusive sensory bed.
- **User Volume Persistence**: Read and write user volume adjustments to `localStorage ('gargi_audio_volume')`.
- **Interactive UI**: Preserve the vertical gold micro-volume slider popover above the speaker button (`🔊`).

---

## 6. Stardust Cursor Engine (`js/luxury-stardust-cursor.js`)
- **Performance**: 120fps direct hardware-accelerated pointer tracking with sub-pixel interpolation.
- **Interactivity**: Rotating aperture expansion over clickable elements and golden stardust particle trails.
