/* ==========================================================================
   GARGI PHOTOGRAPHIC ARTS - AMBIENT MUSIC ENGINE
   Features: 10-Track Meditative Playlist, Daily Seed Offset, Per-Refresh Rotation,
             Floating Glassmorphic Audio Widget & Smooth Volume Fade-In/Out
   ========================================================================== */

const AMBIENT_PLAYLIST = [
  {
    id: "track-1",
    title: "Silent Dawn - Gentle Piano",
    artist: "Atmospheric Cinema",
    src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "track-2",
    title: "Sahyadri Whispers - Acoustic Ambient",
    artist: "Acoustic Reflection",
    src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=relaxing-guitar-loop-20441.mp3"
  },
  {
    id: "track-3",
    title: "Divine Flute - Celestial Bansuri",
    artist: "Devotional Soundscapes",
    src: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_c9769db3df.mp3?filename=meditation-piano-126260.mp3"
  },
  {
    id: "track-4",
    title: "Moonlight Reverie - Soft Strings",
    artist: "Cinematic Moods",
    src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-amp-strings-10711.mp3"
  },
  {
    id: "track-5",
    title: "Vrindavan Solitude - Peace & Balance",
    artist: "Meditative Art",
    src: "https://cdn.pixabay.com/download/audio/2022/02/10/audio_51d2f6233d.mp3?filename=calm-peaceful-piano-10825.mp3"
  },
  {
    id: "track-6",
    title: "Golden Hour Harmony - Warm Guitar",
    artist: "Heritage Strings",
    src: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=gentle-acoustic-18963.mp3"
  },
  {
    id: "track-7",
    title: "Echoes of Mauli - Sacred Aura",
    artist: "Marathi Classical Ambient",
    src: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db659124fb.mp3?filename=deep-meditation-111388.mp3"
  },
  {
    id: "track-8",
    title: "Raindrops over Western Ghats",
    artist: "Nature & Piano",
    src: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_9b91c13d9f.mp3?filename=soft-rain-piano-9878.mp3"
  },
  {
    id: "track-9",
    title: "Infinite Horizon - Ambient Drone",
    artist: "Spatial Soundscape",
    src: "https://cdn.pixabay.com/download/audio/2022/01/21/audio_31362e74e4.mp3?filename=ambient-space-10928.mp3"
  },
  {
    id: "track-10",
    title: "Royal Twilight - Serene Chords",
    artist: "Gargi Photographic Arts",
    src: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_993f18e9a2.mp3?filename=serene-ambient-123490.mp3"
  }
];

class AmbientAudioEngine {
  constructor() {
    this.playlist = AMBIENT_PLAYLIST;
    this.currentIndex = this.calculateInitialTrackIndex();
    this.audio = new Audio();
    this.isPlaying = false;
    this.isMuted = false;
    this.targetVolume = 0.35; // Gentle, silent, background volume level
    this.fadeInterval = null;

    this.initUI();
    this.loadTrack(this.currentIndex);
    this.bindEvents();
  }

  /* Daily Seed + Refresh Rotation Algorithm */
  calculateInitialTrackIndex() {
    // 1. Daily Base Index: Hash YYYY-MM-DD
    const today = new Date();
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const dailyBase = dateSeed % this.playlist.length;

    // 2. Per-Refresh Increment
    let refreshCount = parseInt(sessionStorage.getItem('gargi_ambient_refresh_count') || '0', 10);
    refreshCount += 1;
    sessionStorage.setItem('gargi_ambient_refresh_count', refreshCount.toString());

    // Combined Index
    const finalIndex = (dailyBase + refreshCount - 1) % this.playlist.length;
    return finalIndex;
  }

  initUI() {
    this.widgetEl = document.getElementById('ambientAudioWidget');
    this.titleEl = document.getElementById('audioTrackTitle');
    this.artistEl = document.getElementById('audioTrackArtist');
    this.playBtn = document.getElementById('audioPlayBtn');
    this.nextBtn = document.getElementById('audioNextBtn');
    this.muteBtn = document.getElementById('audioMuteBtn');
    this.eqContainer = document.getElementById('audioEqContainer');
  }

  loadTrack(index) {
    this.currentIndex = index;
    const track = this.playlist[index];
    this.audio.src = track.src;
    this.audio.loop = true;
    this.audio.volume = 0; // Start at 0 for smooth fade-in

    if (this.titleEl) this.titleEl.textContent = track.title;
    if (this.artistEl) this.artistEl.textContent = track.artist;
  }

  bindEvents() {
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => this.togglePlay());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextTrack());
    }
    if (this.muteBtn) {
      this.muteBtn.addEventListener('click', () => this.toggleMute());
    }

    // Optional: First user interaction fade-in trigger (smooth UX)
    const handleFirstInteraction = () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      // Keep paused by default until user toggles or auto-starts gently if unmuted
    };
    document.addEventListener('click', handleFirstInteraction, { once: true });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updateUIState();
      this.fadeInVolume();
    }).catch(err => {
      console.warn("Autoplay blocked by browser. User click required.", err);
    });
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
      if (this.audio.volume < target - 0.02) {
        this.audio.volume = Math.min(target, this.audio.volume + 0.04);
      } else {
        this.audio.volume = target;
        clearInterval(this.fadeInterval);
      }
    }, 80);
  }

  fadeOutVolume(callback) {
    clearInterval(this.fadeInterval);
    this.fadeInterval = setInterval(() => {
      if (this.audio.volume > 0.04) {
        this.audio.volume = Math.max(0, this.audio.volume - 0.05);
      } else {
        this.audio.volume = 0;
        clearInterval(this.fadeInterval);
        if (callback) callback();
      }
    }, 60);
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

// Initialize Engine when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.ambientAudio = new AmbientAudioEngine();
});
