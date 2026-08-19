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
  },
  {
    id: "track-2",
    title: "Small Drama Cinematic Ambient",
    artist: "Tunetank",
    src: "assets/audio/small_drama_cinematic_ambient.mp3"
  },
  {
    id: "track-3",
    title: "Main Title Calm Ambient",
    artist: "Kulakovka",
    src: "assets/audio/main_title_calm_ambient.mp3"
  },
  {
    id: "track-4",
    title: "Beats Documentary Ambient",
    artist: "Kulakovka",
    src: "assets/audio/beats_documentary_ambient.mp3"
  },
  {
    id: "track-5",
    title: "Main Title Cinematic Ambient",
    artist: "Kulakovka",
    src: "assets/audio/main_title_cinematic_ambient.mp3"
  },
  {
    id: "track-6",
    title: "Orchestral Ambient",
    artist: "Leberch",
    src: "assets/audio/orchestral_ambient.mp3"
  },
  {
    id: "track-7",
    title: "Ambient Astronomy",
    artist: "Atlas Audio",
    src: "assets/audio/ambient_astronomy.mp3"
  },
  {
    id: "track-8",
    title: "Modern Classical Ambient Piano",
    artist: "The Mountain",
    src: "assets/audio/modern_classical_ambient_piano.mp3"
  },
  {
    id: "track-9",
    title: "Ambient Cinematic Background",
    artist: "Tunetank",
    src: "assets/audio/ambient_cinematic_background.mp3"
  },
  {
    id: "track-10",
    title: "Modern Classical Ambient Background",
    artist: "The Mountain",
    src: "assets/audio/modern_classical_ambient_background.mp3"
  },
  {
    id: "track-11",
    title: "Modern Classical Ambient Charity",
    artist: "The Mountain",
    src: "assets/audio/modern_classical_ambient_charity.mp3"
  },
  {
    id: "track-12",
    title: "Wedding Ambient",
    artist: "Paul Yudin",
    src: "assets/audio/wedding_ambient.mp3"
  }
];

class AmbientAudioEngine {
  constructor() {
    this.playlist = AMBIENT_PLAYLIST;
    this.audio = new Audio();
    this.isPlaying = false;
    this.isMuted = false;
    this.targetVolume = this.getStoredVolume();

    this.currentIndex = this.calculateInitialTrackIndex();

    this.initUI();
    this.loadTrack(this.currentIndex);
    this.setupDirectUserActivationUnlock();
    this.setupISTDateMonitor();

    this.audio.onended = () => {
      this.nextTrack();
    };
  }

  getStoredVolume() {
    try {
      const stored = localStorage.getItem('gargi_audio_volume');
      if (stored !== null) {
        const val = parseFloat(stored);
        if (!isNaN(val) && val >= 0 && val <= 1) {
          return val;
        }
      }
    } catch (e) {}
    return 0.30; // Industry standard 30% calm ambient level
  }

  /* Calculate IST date & day of year */
  getISTInfo() {
    const now = new Date();
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istDate = new Date(utcMs + istOffsetMs);
    
    const year = istDate.getFullYear();
    const month = String(istDate.getMonth() + 1).padStart(2, '0');
    const day = String(istDate.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    const startOfYear = new Date(year, 0, 0);
    const diff = istDate - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    return { dateStr, dayOfYear };
  }

  /* Determines initial track index based on IST Date + Refresh Counter */
  calculateInitialTrackIndex() {
    const ist = this.getISTInfo();
    const dayBaseIndex = ist.dayOfYear % this.playlist.length;

    let refreshCount = 0;
    try {
      const storedCount = localStorage.getItem('gargi_audio_refresh_count') || sessionStorage.getItem('gargi_audio_refresh_count');
      const lastDate = localStorage.getItem('gargi_audio_ist_date');

      if (lastDate !== ist.dateStr) {
        refreshCount = 0;
        localStorage.setItem('gargi_audio_ist_date', ist.dateStr);
      } else if (storedCount !== null) {
        refreshCount = (parseInt(storedCount, 10) + 1) % this.playlist.length;
      }
      localStorage.setItem('gargi_audio_refresh_count', refreshCount.toString());
      sessionStorage.setItem('gargi_audio_refresh_count', refreshCount.toString());
    } catch (e) {
      console.warn("Storage access restricted:", e);
      refreshCount = Math.floor(Math.random() * this.playlist.length);
    }

    this.lastObservedISTDate = ist.dateStr;
    const finalIndex = (dayBaseIndex + refreshCount) % this.playlist.length;
    console.log(`[GARGI AMBIENT AUDIO] IST Date: ${ist.dateStr} | Selected Track #${finalIndex + 1}: "${this.playlist[finalIndex].title}"`);
    return finalIndex;
  }

  /* Dynamic monitor for Midnight IST Date transition */
  setupISTDateMonitor() {
    setInterval(() => {
      const ist = this.getISTInfo();
      if (this.lastObservedISTDate && this.lastObservedISTDate !== ist.dateStr) {
        console.log("IST Date Rollover detected:", ist.dateStr);
        this.lastObservedISTDate = ist.dateStr;
        try {
          localStorage.setItem('gargi_audio_ist_date', ist.dateStr);
          localStorage.setItem('gargi_audio_refresh_count', '0');
        } catch (e) {}
        this.nextTrack();
      }
    }, 30000); // Check every 30 seconds
  }

  initUI() {
    this.titleEl = document.getElementById('audioTrackTitle');
    this.artistEl = document.getElementById('audioTrackArtist');
    this.playBtn = document.getElementById('audioPlayBtn');
    this.nextBtn = document.getElementById('audioNextBtn');
    this.muteBtn = document.getElementById('audioMuteBtn');
    this.eqContainer = document.getElementById('audioEqContainer');
    this.volumeSlider = document.getElementById('audioVolumeSlider');
    this.volumePercent = document.getElementById('audioVolumePercent');

    if (this.playBtn) this.playBtn.addEventListener('click', (e) => { e.stopPropagation(); this.togglePlay(); });
    if (this.nextBtn) this.nextBtn.addEventListener('click', (e) => { e.stopPropagation(); this.nextTrack(); });
    if (this.muteBtn) this.muteBtn.addEventListener('click', (e) => { e.stopPropagation(); this.toggleMute(); });

    if (this.volumeSlider) {
      this.volumeSlider.value = this.targetVolume;
      this.updateVolumePercentUI();
      this.volumeSlider.addEventListener('input', (e) => {
        e.stopPropagation();
        this.setVolume(parseFloat(e.target.value));
      });
    }
  }

  setVolume(volume) {
    this.targetVolume = Math.max(0, Math.min(1, volume));
    this.audio.volume = this.targetVolume;
    
    if (this.targetVolume > 0 && this.isMuted) {
      this.isMuted = false;
      this.audio.muted = false;
      if (this.muteBtn) this.muteBtn.innerHTML = '🔊';
    } else if (this.targetVolume === 0 && !this.isMuted) {
      this.isMuted = true;
      this.audio.muted = true;
      if (this.muteBtn) this.muteBtn.innerHTML = '🔇';
    }

    try {
      localStorage.setItem('gargi_audio_volume', this.targetVolume.toString());
    } catch (e) {}

    this.updateVolumePercentUI();
  }

  updateVolumePercentUI() {
    if (this.volumePercent) {
      this.volumePercent.textContent = `${Math.round(this.targetVolume * 100)}%`;
    }
    if (this.volumeSlider) {
      this.volumeSlider.value = this.targetVolume;
    }
  }

  loadTrack(index) {
    this.currentIndex = index;
    const track = this.playlist[index];
    
    if (this.titleEl) this.titleEl.textContent = track.title;
    if (this.artistEl) this.artistEl.textContent = track.artist;

    this.audio.pause();
    this.audio.src = track.src;
    this.audio.loop = false;
    this.audio.volume = this.targetVolume;
    this.audio.load();
  }

  /* Direct User Activation Call: Invokes audio.play() DIRECTLY inside Chrome/Edge active event stack */
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
          console.log("Audio play gesture required by browser:", err);
        });
      }

      ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'].forEach(evt => {
        window.removeEventListener(evt, unlockAndPlay);
        document.removeEventListener(evt, unlockAndPlay);
      });
    };

    ['pointerdown', 'touchstart', 'click', 'keydown', 'scroll'].forEach(evt => {
      window.addEventListener(evt, unlockAndPlay, { passive: true });
      document.addEventListener(evt, unlockAndPlay, { passive: true });
    });

    // Attempt immediate playback (works if user has high MEI or site media interaction permission)
    const immediatePlay = this.audio.play();
    if (immediatePlay !== undefined) {
      immediatePlay.then(() => {
        this.isPlaying = true;
        this.updateUIState();
      }).catch(() => {
        // Autoplay policy prevented immediate playback without gesture
      });
    }
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
    if (this.isMuted) {
      if (this.volumePercent) this.volumePercent.textContent = '0%';
    } else {
      if (this.volumePercent) this.volumePercent.textContent = `${Math.round(this.targetVolume * 100)}%`;
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
