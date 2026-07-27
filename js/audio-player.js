/* ==========================================================================
   GARGI PHOTOGRAPHIC ARTS - LUXURY AMBIENT MUSIC ENGINE
   Music Curation: 10 Real Instrumental MP3 Audio Tracks
   Web Architecture: Instant Gesture Autoplay + Daily Seed & Refresh Rotation
   ========================================================================== */

const AMBIENT_PLAYLIST = [
  {
    id: "track-1",
    title: "Sahyadri Dawn - Serene Reflection",
    artist: "Acoustic Ambient",
    src: "assets/audio/track1_music.mp3"
  },
  {
    id: "track-2",
    title: "Royal Bansuri - Raag Yaman",
    artist: "Devotional Flute & Pad",
    src: "assets/audio/track2_music.mp3"
  },
  {
    id: "track-3",
    title: "Velvet Twilight - Soft Chords",
    artist: "Acoustic Harmony",
    src: "assets/audio/track3_music.mp3"
  },
  {
    id: "track-4",
    title: "Vrindavan Solitude - Peace & Chimes",
    artist: "Santoor & Sacred Aura",
    src: "assets/audio/track4_music.mp3"
  },
  {
    id: "track-5",
    title: "Golden Horizon - Warm Strings",
    artist: "Gargi Cinema Soundscapes",
    src: "assets/audio/track5_music.mp3"
  },
  {
    id: "track-6",
    title: "Rain & Sitar over Western Ghats",
    artist: "Nature & Classical Heritage",
    src: "assets/audio/track6_music.mp3"
  },
  {
    id: "track-7",
    title: "Sacred Temple - 136.1Hz OM Tone",
    artist: "Deep Spiritual Vibration",
    src: "assets/audio/track7_music.mp3"
  },
  {
    id: "track-8",
    title: "Whispering Pines - Ambient Cello",
    artist: "Serene Reflection",
    src: "assets/audio/track8_music.mp3"
  },
  {
    id: "track-9",
    title: "Celestial Glass - 432Hz Harmony",
    artist: "Spatial Soundscape",
    src: "assets/audio/track9_music.mp3"
  },
  {
    id: "track-10",
    title: "Royal Twilight - Fine Art Chords",
    artist: "Gargi Photographic Arts Signature",
    src: "assets/audio/track10_music.mp3"
  }
];

class AmbientAudioEngine {
  constructor() {
    this.playlist = AMBIENT_PLAYLIST;
    this.currentIndex = this.calculateInitialTrackIndex();
    this.audio = new Audio();
    this.isPlaying = false;
    this.isMuted = false;
    this.targetVolume = 0.45;
    this.fadeInterval = null;

    this.initUI();
    this.loadTrack(this.currentIndex);
    this.setupAutoplayEngine();
  }

  /* Daily Seed Offset + Refresh Rotation Algorithm */
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
    this.audio.volume = 0;
  }

  /* AUTOPLAY ARCHITECTURE: Instant playback on DOM load + Gesture unlock on scroll/movement */
  setupAutoplayEngine() {
    // 1. Try immediate unmuted play on DOM load
    this.attemptPlay();

    // 2. Global Autoplay Listener: Faded in on VERY FIRST user gesture (scroll, mousemove, touch, tap)
    const unlockAudioOnGesture = () => {
      if (!this.isPlaying) {
        this.attemptPlay();
      }
      ['scroll', 'mousemove', 'touchstart', 'click', 'pointerdown', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, unlockAudioOnGesture);
      });
    };

    ['scroll', 'mousemove', 'touchstart', 'click', 'pointerdown', 'keydown'].forEach(evt => {
      window.addEventListener(evt, unlockAudioOnGesture, { passive: true, once: true });
    });
  }

  attemptPlay() {
    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        this.updateUIState();
        this.fadeInVolume();
      }).catch(err => {
        console.log("Browser autoplay policy active. Sound will un-pause on first scroll/mouse movement.", err);
      });
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.attemptPlay();
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
        if (wasPlaying) this.attemptPlay();
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
    }, 50);
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
    }, 40);
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
