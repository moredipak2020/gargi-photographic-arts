/* ==========================================================================
   GARGI PHOTOGRAPHIC ARTS - LUXURY AMBIENT MUSIC ENGINE
   Volume & Audio Output Fix: Direct Volume Assignment (0.85) for Immediate Sound
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
    this.targetVolume = 0.85; // Crisp, clear, audible volume level

    this.initUI();
    this.loadTrack(this.currentIndex);
    this.setupDirectUserActivationUnlock();
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

    if (this.playBtn) this.playBtn.addEventListener('click', (e) => { e.stopPropagation(); this.togglePlay(); });
    if (this.nextBtn) this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this.nextTrack(); });
    if (this.muteBtn) this.muteBtn.addEventListener('click', (e) => { e.stopPropagation(); this.toggleMute(); });
  }

  loadTrack(index) {
    this.currentIndex = index;
    const track = this.playlist[index];
    
    if (this.titleEl) this.titleEl.textContent = track.title;
    if (this.artistEl) this.artistEl.textContent = track.artist;

    this.audio.src = track.src;
    this.audio.loop = true;
    this.audio.volume = this.targetVolume; // Direct clear volume!
  }

  /* Direct User Activation Call: Invokes audio.play() DIRECTLY inside Chrome/Safari's active event stack */
  setupDirectUserActivationUnlock() {
    const unlockAndPlay = () => {
      if (this.isPlaying && !this.audio.paused) return;
      this.audio.muted = false;
      this.audio.volume = this.targetVolume;
      
      const p = this.audio.play();
      if (p !== undefined) {
        p.then(() => {
          this.isPlaying = true;
          this.updateUIState();
        }).catch(err => {
          console.log("Audio play require gesture:", err);
        });
      }

      ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
        document.removeEventListener(evt, unlockAndPlay);
      });
    };

    ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
      document.addEventListener(evt, unlockAndPlay);
    });
  }

  togglePlay() {
    if (this.isPlaying && !this.audio.paused) {
      this.pause();
    } else {
      this.audio.muted = false;
      this.audio.volume = this.targetVolume;
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.updateUIState();
      });
    }
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updateUIState();
  }

  nextTrack() {
    const wasPlaying = this.isPlaying;
    this.audio.pause();
    this.advanceIndex();
    if (wasPlaying) {
      this.audio.muted = false;
      this.audio.volume = this.targetVolume;
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.updateUIState();
      });
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

  updateUIState() {
    if (this.playBtn) {
      this.playBtn.innerHTML = this.isPlaying && !this.audio.paused ? '⏸️' : '▶️';
      this.playBtn.setAttribute('aria-label', this.isPlaying ? 'Pause Ambient Music' : 'Play Ambient Music');
    }
    if (this.eqContainer) {
      if (this.isPlaying && !this.audio.paused) {
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
