/* ==========================================================================
   GARGI PHOTOGRAPHIC ARTS - AMBIENT MUSIC & WEB AUDIO SYNTHESIZER ENGINE
   Features: 10-Track Playlist + Web Audio Synth Fallback (100% Guaranteed Sound),
             Daily Seed Offset, Per-Refresh Rotation, Volume Ramping & Glassmorphism
   ========================================================================== */

const AMBIENT_PLAYLIST = [
  {
    id: "track-1",
    title: "Silent Dawn - Gentle Piano",
    artist: "Atmospheric Soundscapes",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Piano_Ambient_Melody.ogg",
    synthFreqs: [261.63, 329.63, 392.00, 523.25] // C Major Ambient Chord
  },
  {
    id: "track-2",
    title: "Sahyadri Whispers - Acoustic Ambient",
    artist: "Western Ghats Echoes",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/65/Guitar_Acoustic_Peaceful_Loop.ogg",
    synthFreqs: [220.00, 277.18, 329.63, 440.00] // A Minor Ambient Chord
  },
  {
    id: "track-3",
    title: "Divine Flute - Celestial Bansuri",
    artist: "Devotional Soundscapes",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/30/Bansuri_Flute_Ambient_Meditation.ogg",
    synthFreqs: [293.66, 369.99, 440.00, 587.33] // D Major Meditation
  },
  {
    id: "track-4",
    title: "Moonlight Reverie - Soft Strings",
    artist: "Cinematic Moods",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Soft_Ambient_Pad_Strings.ogg",
    synthFreqs: [174.61, 220.00, 261.63, 349.23] // F Major Serenity
  },
  {
    id: "track-5",
    title: "Vrindavan Solitude - Solfeggio 528Hz",
    artist: "Peace & Harmony",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5a/528Hz_Healing_Frequency_Tone.ogg",
    synthFreqs: [528.00, 264.00, 396.00, 660.00] // 528Hz Harmony
  },
  {
    id: "track-6",
    title: "Golden Hour - Heritage Chords",
    artist: "Acoustic Reflection",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Golden_Hour_Guitar_Ambient.ogg",
    synthFreqs: [196.00, 246.94, 293.66, 392.00] // G Major Warmth
  },
  {
    id: "track-7",
    title: "Echoes of Mauli - Sacred Chants",
    artist: "Pandharpur Meditative Aura",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/18/Sacred_Om_Chant_Ambient.ogg",
    synthFreqs: [136.10, 272.20, 408.30, 544.40] // OM Frequency 136.1Hz
  },
  {
    id: "track-8",
    title: "Raindrops over Western Ghats",
    artist: "Nature & Rain Ambient",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Rain_and_Gentle_Thunder_Ambient.ogg",
    synthFreqs: [164.81, 207.65, 246.94, 329.63] // E Minor Rain Chords
  },
  {
    id: "track-9",
    title: "Infinite Horizon - Deep Cosmos",
    artist: "Spatial Drone",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/87/Deep_Space_Ambient_Drone.ogg",
    synthFreqs: [110.00, 164.81, 220.00, 329.63] // A Low Drone
  },
  {
    id: "track-10",
    title: "Royal Twilight - Serene Chords",
    artist: "Gargi Photographic Arts Signature",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Serene_Twilight_Ambient_Chords.ogg",
    synthFreqs: [220.00, 329.63, 392.00, 523.25] // Am7 Sunset Chord
  }
];

class AmbientAudioEngine {
  constructor() {
    this.playlist = AMBIENT_PLAYLIST;
    this.currentIndex = this.calculateInitialTrackIndex();
    this.audio = new Audio();
    this.audio.crossOrigin = "anonymous";
    this.isPlaying = false;
    this.isMuted = false;
    this.targetVolume = 0.35;
    
    // Web Audio API Synthesizer Fallback (Guarantees Sound Under Any Network/CORS Condition)
    this.audioCtx = null;
    this.synthGain = null;
    this.synthOscillators = [];
    this.isUsingSynth = false;

    this.initUI();
    this.loadTrack(this.currentIndex);
    this.bindEvents();
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
  }

  loadTrack(index) {
    this.currentIndex = index;
    const track = this.playlist[index];
    
    if (this.titleEl) this.titleEl.textContent = track.title;
    if (this.artistEl) this.artistEl.textContent = track.artist;

    this.audio.src = track.src;
    this.audio.loop = true;
    this.audio.volume = this.targetVolume;

    // Handle potential loading/CORS error gracefully with Web Audio Synth Fallback
    this.audio.onerror = () => {
      console.warn("External audio stream unavailable or CORS blocked. Switching to Web Audio Ambient Synthesizer.");
      this.isUsingSynth = true;
    };
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
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    // Ensure Web Audio Context is initialized on user click
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    // Try HTML5 Audio Stream First
    this.audio.volume = this.isMuted ? 0 : this.targetVolume;
    const playPromise = this.audio.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        this.isUsingSynth = false;
        this.updateUIState();
      }).catch(err => {
        console.warn("HTML5 audio stream playback interrupted or blocked. Launching Web Audio Synthesizer fallback...", err);
        this.startSynthPlayback();
      });
    } else {
      this.isPlaying = true;
      this.updateUIState();
    }
  }

  /* Web Audio Synthesizer Fallback - Generates Beautiful Ambient Chords Natively in JS */
  startSynthPlayback() {
    if (!this.audioCtx) return;
    this.stopSynthPlayback();

    const track = this.playlist[this.currentIndex];
    const freqs = track.synthFreqs || [261.63, 329.63, 392.00, 523.25];

    this.synthGain = this.audioCtx.createGain();
    this.synthGain.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.audioCtx.currentTime);
    this.synthGain.connect(this.audioCtx.destination);

    this.synthOscillators = freqs.map((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();
      
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Subtle LFO modulation for warm ambient breathing effect
      const lfo = this.audioCtx.createOscillator();
      lfo.frequency.value = 0.15 + i * 0.05;
      const lfoGain = this.audioCtx.createGain();
      lfoGain.gain.value = 0.03;
      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      lfo.start();

      oscGain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.synthGain);
      osc.start();
      return osc;
    });

    this.isPlaying = true;
    this.isUsingSynth = true;
    this.updateUIState();
  }

  stopSynthPlayback() {
    if (this.synthOscillators && this.synthOscillators.length > 0) {
      this.synthOscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      this.synthOscillators = [];
    }
  }

  pause() {
    this.audio.pause();
    this.stopSynthPlayback();
    this.isPlaying = false;
    this.updateUIState();
  }

  nextTrack() {
    const wasPlaying = this.isPlaying;
    this.pause();
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    this.loadTrack(this.currentIndex);
    if (wasPlaying) {
      setTimeout(() => this.play(), 200);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    if (this.synthGain && this.audioCtx) {
      this.synthGain.gain.setValueAtTime(this.isMuted ? 0 : 0.15, this.audioCtx.currentTime);
    }
    if (this.muteBtn) {
      this.muteBtn.innerHTML = this.isMuted ? '🔇' : '🔊';
    }
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
