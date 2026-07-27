/* ==========================================================================
   GARGI PHOTOGRAPHIC ARTS - LUXURY AMBIENT MUSIC ENGINE
   Music Curation & Web Architecture: 10 Local High-Fidelity Audio Tracks,
   Daily Seed Offset, Per-Refresh Rotation & Seamless Autoplay Engine
   ========================================================================== */

const AMBIENT_PLAYLIST = [
  {
    id: "track-1",
    title: "Sahyadri Dawn - Solfeggio 528Hz",
    artist: "Atmospheric Meditation",
    src: "assets/audio/track1_sahyadri_dawn.wav"
  },
  {
    id: "track-2",
    title: "Royal Bansuri - Raag Yaman",
    artist: "Devotional Flute Resonance",
    src: "assets/audio/track2_royal_bansuri.wav"
  },
  {
    id: "track-3",
    title: "Velvet Twilight - Soft Strings",
    artist: "Acoustic Harmony",
    src: "assets/audio/track3_velvet_twilight.wav"
  },
  {
    id: "track-4",
    title: "Vrindavan Solitude - Peace & Chimes",
    artist: "Santoor & Sacred Pad",
    src: "assets/audio/track4_vrindavan_peace.wav"
  },
  {
    id: "track-5",
    title: "Golden Horizon - Warm Orchestral",
    artist: "Gargi Cinema Soundscapes",
    src: "assets/audio/track5_golden_horizon.wav"
  },
  {
    id: "track-6",
    title: "Rain & Sitar over Western Ghats",
    artist: "Nature & Classical Heritage",
    src: "assets/audio/track6_rain_and_sitar.wav"
  },
  {
    id: "track-7",
    title: "Sacred Temple - 136.1Hz OM Tone",
    artist: "Deep Spiritual Resonance",
    src: "assets/audio/track7_sacred_temple.wav"
  },
  {
    id: "track-8",
    title: "Whispering Pines - Ambient Cello",
    artist: "Serene Reflection",
    src: "assets/audio/track8_whispering_pines.wav"
  },
  {
    id: "track-9",
    title: "Celestial Glass - 432Hz Harmony",
    artist: "Spatial Soundscape",
    src: "assets/audio/track9_celestial_aurora.wav"
  },
  {
    id: "track-10",
    title: "Royal Twilight - Fine Art Chords",
    artist: "Gargi Photographic Arts Signature",
    src: "assets/audio/track10_gargi_signature.wav"
  }
];

class AmbientAudioEngine {
  constructor() {
    this.playlist = AMBIENT_PLAYLIST;
    this.currentIndex = this.calculateInitialTrackIndex();
    this.audio = new Audio();
    this.isPlaying = false;
    this.isMuted = false;
    this.targetVolume = 0.40;
    this.fadeInterval = null;

    this.initUI();
    this.loadTrack(this.currentIndex);
    this.setupAutoplayEngine();
  }

  /* Daily Seed + Refresh Rotation Algorithm */
  calculateInitialTrackIndex() {
    const today = new Date();
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const dailyBase = dateSeed % this.playlist.length;

    let refreshCount = parseInt(sessionStorage.getItem('gargi_ambient_refresh_count') || '0', 10);
    refreshCount += 1;
    sessionStorage.setItem('gargi_ambient_refresh_count', refreshCount.toString());

    return (dailyBase + refreshCount - 1) % this.playlist.length;
  }

  initUI() {
    this.titleEl = document.getElementById('audioTrackTitle');
    this.artistEl = document.getElementById('audioTrackArtist');
    this.playBtn = document.getElementById('audioPlayBtn');
    this.nextBtn = document.getElementById('audioNextBtn');
    this.muteBtn = document.getElementById('audioMuteBtn');
    this.eqContainer = document.getElementById('audioEqContainer');

    if (this.playBtn) this.playBtn.addEventListener('click', () => this.togglePlay());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextTrack());
    if (this.muteBtn) this.muteBtn.addEventListener('click', () => this.toggleMute());
  }

  loadTrack(index) {
    this.currentIndex = index;
    const track = this.playlist[index];
    
    if (this.titleEl) this.titleEl.textContent = track.title;
    if (this.artistEl) this.artistEl.textContent = track.artist;

    this.audio.src = track.src;
    this.audio.loop = true;
    this.audio.volume = 0; // Start at 0 for smooth fade-in
  }

  /* Autoplay Engine: Bypasses Browser Autoplay Restrictions on First Scroll/Move/Click */
  setupAutoplayEngine() {
    // 1. Attempt immediate unmuted play on DOM load
    this.play();

    // 2. Global Autoplay Triggers for immediate smooth audio start on ANY user presence
    const triggerAutoplayOnPresence = () => {
      if (!this.isPlaying) {
        this.play();
      }
      ['mousemove', 'scroll', 'touchstart', 'click', 'pointerdown', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, triggerAutoplayOnPresence);
      });
    };

    ['mousemove', 'scroll', 'touchstart', 'click', 'pointerdown', 'keydown'].forEach(evt => {
      window.addEventListener(evt, triggerAutoplayOnPresence, { passive: true, once: true });
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.audio.volume = 0;
    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        this.updateUIState();
        this.fadeInVolume();
      }).catch(err => {
        console.log("Autoplay waiting for first mouse move or scroll interaction...", err);
      });
    }
  }

  pause() {
    this.fadeOutVolume(() => {
      this.audio.pause();
      this.isPlaying = false;
      this.updateUIState();
    });
  }

  nextTrack() {
    const wasPlaying = this.isPlaying;
    if (this.isPlaying) {
      this.fadeOutVolume(() => {
        this.audio.pause();
        this.advanceIndex();
        if (wasPlaying) this.play();
      });
    } else {
      this.advanceIndex();
    }
  }

  advanceIndex() {
    const nextIdx = (this.currentIndex + 1) % this.playlist.length;
    this.loadTrack(nextIdx);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    if (this.muteBtn) {
      this.muteBtn.innerHTML = this.isMuted ? '🔇' : '🔊';
    }
  }

  fadeInVolume() {
    clearInterval(this.fadeInterval);
    const target = this.isMuted ? 0 : this.targetVolume;
    this.fadeInterval = setInterval(() => {
      if (this.audio.volume < target - 0.03) {
        this.audio.volume = Math.min(target, this.audio.volume + 0.05);
      } else {
        this.audio.volume = target;
        clearInterval(this.fadeInterval);
      }
    }, 60);
  }

  fadeOutVolume(callback) {
    clearInterval(this.fadeInterval);
    this.fadeInterval = setInterval(() => {
      if (this.audio.volume > 0.05) {
        this.audio.volume = Math.max(0, this.audio.volume - 0.06);
      } else {
        this.audio.volume = 0;
        clearInterval(this.fadeInterval);
        if (callback) callback();
      }
    }, 50);
  }

  updateUIState() {
    if (this.playBtn) {
      this.playBtn.innerHTML = this.isPlaying ? '⏸️' : '▶️';
      this.playBtn.setAttribute('aria-label', this.isPlaying ? 'Pause Ambient Music' : 'Play Ambient Music');
    }
    if (this.eqContainer) {
      if (this.isPlaying) {
        this.eqContainer.classList.add('playing');
      } else {
        this.eqContainer.classList.remove('playing');
      }
    }
  }
}

// Initialize Engine on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  window.ambientAudio = new AmbientAudioEngine();
});
