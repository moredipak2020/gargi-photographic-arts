/* ==========================================================================
   GARGI PHOTOGRAPHIC ARTS - LUXURY AMBIENT MUSIC ENGINE
   Track Selection: User Curated Track "Calm Ambient Dreamscape"
   ========================================================================== */

const AMBIENT_PLAYLIST = [
  {
    id: "track-1",
    title: "Calm Ambient Dreamscape",
    artist: "Pixabay Serenity",
    src: "assets/audio/calm_ambient_dreamscape.mp3"
  }
];

class AmbientAudioEngine {
  constructor() {
    this.playlist = AMBIENT_PLAYLIST;
    this.currentIndex = 0;
    this.audio = new Audio();
    this.isPlaying = false;
    this.isMuted = false;
    this.targetVolume = 0.85;

    this.initUI();
    this.loadTrack(this.currentIndex);
    this.setupDirectUserActivationUnlock();
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
    this.audio.volume = this.targetVolume;
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
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    this.loadTrack(this.currentIndex);
    if (wasPlaying) {
      this.audio.muted = false;
      this.audio.volume = this.targetVolume;
      this.audio.play().then(() => {
        this.isPlaying = true;
        this.updateUIState();
      });
    }
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
