# Project Rules & Architectural Safeguards - Gargi Photographic Arts

## 1. Core Project Information & Deployment
- **Production Domain**: `https://gargi-photographic-arts.in` (and `https://www.gargi-photographic-arts.in`)
- **Cloudflare Pages Mirror**: `https://gargi-photographic-arts.pages.dev`
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
- **GPU Layer Containment**: Cards MUST include `isolation: isolate; contain: paint; transform: translate3d(0, 0, 0); backface-visibility: hidden;` to eliminate repaint jank across multi-column masonry during hover scaling.

---

## 4. Visual Identity, Glassmorphism & Lightbox Standards
- **Lightbox Modal Theme**: Pure Luminous White Translucent Morphic Glass (`background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(35px) saturate(1.8) brightness(1.12); border: 1px solid rgba(255, 255, 255, 0.45);`).
- **Lightbox Typography**: High-contrast Obsidian Black (`#0A0914`) and rich metallic gold (`#8C6207`) with Slate labels (`#58536E`) inside `.lightbox-details` and `.exif-list`.
- **Lightbox Header Clearance Buffer**: All modal headers MUST use `.lightbox-header` with `padding-right: 3.5rem;` to prevent collision with `.modal-close-btn` (`✕`).
- **Badge & Title Sizing**: Category tags use `.lightbox-tag-badge` pill styling (`0.72rem`, `border-radius: 20px`), and `h2` titles are capped at `1.65rem` with `line-height: 1.22`.
- **Card Overlays**: Hidden by default (`opacity: 0; visibility: hidden; transform: translateY(15px);`). Text overlays must ONLY appear on `:hover`.
- **Floating Island Museum Frames**: Cards must feature 3D depth elevation (`border: 1.5px solid rgba(255, 255, 255, 0.16); box-shadow: 0 15px 35px rgba(0,0,0,0.65);`) with upward hover lift (`transform: translateY(-10px) scale(1.025);`).
- **Site Favicon Brand Package**: Official royal gold G icon assets located in `assets/favicon/` (`favicon.svg`, `favicon.ico`, Apple touch, Android icons) linked across all HTML heads.

---

## 5. Context-Aware Ambient Audio Engine (`js/audio-player.js`)
- **Default Sound Level**: Fixed at **`0.30` (30%)** for a calm, non-intrusive sensory bed.
- **User Volume Persistence**: Read and write user volume adjustments to `localStorage ('gargi_audio_volume')`.
- **Thematic Playlists**:
  - `DEFAULT_PLAYLIST`: 12 serene ambient tracks with daily IST date rollover.
  - `KRISHNA_JANMASHTAMI_PLAYLIST`: 3 sacred Bansuri flute ragas (`assets/audio/krishna/flute_1.mp3`, `flute_2.mp3`, `flute_3.mp3`).
  - Auto-switches to Krishna Flute mode starting on **Flute 1** with continuous looping ($\text{Flute 1} \to 2 \to 3 \to 1$) on `kids-gallery.html` or Janmashtami filter selection, featuring 400ms volume crossfades.
- **Interactive UI**: Preserve the vertical gold micro-volume slider popover above the speaker button (`🔊`).

---

## 6. Stardust & Sacred Peacock Feather Cursor Engine (`js/luxury-stardust-cursor.js` & `js/peacock-feather-cursor.js`)
- **Performance**: Decoupled 120fps `requestAnimationFrame` hardware tracking (`translate3d`) with zero synchronous DOM writes inside raw mousemove events.
- **Single-Pass Event Delegation**: Uses unified `INTERACTIVE_SELECTOR` check on `mouseover` instead of repetitive DOM queries.
- **Quill Tip Hotspot Precision**: The bottom-left quill nib sits locked at `(0, 0)` (`transform-origin: 0px 0px`), ensuring pixel-perfect click accuracy without displacement during motion sway or hover scaling.
- **Dimensional Protection**: `.peacock-feather-img` uses `max-width: none !important; min-width: 50px !important; min-height: 75px !important;` with explicit boundaries to prevent parent layout resets or global `img` constraints from collapsing the image.
- **Thematic Visual Modes & Contextual Activation Rules**:
  - `DEFAULT_THEME` (Star Cursor): 24K Gold Diamond Sparkle Star & rotating aperture ring with warm champagne stardust trails. Default active cursor across the entire website (Childhood Milestones, Weddings, Portraits, Wildlife, Landscape, Main Portfolio).
  - `JANMASHTAMI_PEACOCK_THEME` (Mor Pankh Cursor): Authentic high-resolution Shri Krishna Golden Peacock Feather (`assets/images/cursor/peacock-feather.png` & `.webp`) with radiant cyan/sapphire ocellus aura, long peacock-teal stardust trail streaming directly from the quill tip, and 30-particle celestial supernova click bursts.
  - **Dynamic Routing Triggers**:
    - **Filter Tabs**: Selecting `🦚 Krishna Janmashtami 2024` on `kids-gallery.html` or `Devotional` on `index.html` activates Peacock mode. Selecting `🌻 Childhood Milestones` or other categories restores Star mode.
    - **Hovering Master Frames**: Hovering over any Krishna Janmashtami card in the grid dynamically morphs the cursor into the Peacock Feather; mouseleave restores the Star cursor.
    - **Lightbox Modal**: Opening any Krishna Janmashtami photo renders the Peacock Feather cursor; opening Milestones or closing the modal restores the Star cursor.
- **Interactivity**: Dynamic feather sway based on pointer velocity ($\pm 14^\circ$), alert expansion ($1.15\times$) & pulsing teal-gold aura on interactive hover, and spring recoil on click.
