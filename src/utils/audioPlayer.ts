// Background wedding music player using the uploaded MP3 track.

const WEDDING_SONG_SRC =
  './assets/aistudio/Yovie_Nuno_-_Janji_Suci_Album_Version_Album_Version__mp3.pm__302dac99.mp3';

class WeddingAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;

  private ensureAudio(): HTMLAudioElement | null {
    if (typeof window === 'undefined' || typeof Audio === 'undefined') {
      return null;
    }
    if (!this.audio) {
      const el = new Audio(WEDDING_SONG_SRC);
      el.loop = true;
      el.preload = 'auto';
      el.volume = 0.85;
      el.addEventListener('pause', () => {
        this.isPlaying = false;
      });
      el.addEventListener('play', () => {
        this.isPlaying = true;
      });
      this.audio = el;
    }
    return this.audio;
  }

  public start(): boolean {
    const audio = this.ensureAudio();
    if (!audio) return false;
    if (!audio.paused) {
      this.isPlaying = true;
      return true;
    }
    try {
      this.isPlaying = true;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          this.isPlaying = false;
        });
      }
      return true;
    } catch {
      this.isPlaying = false;
      return false;
    }
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying || (this.audio && !this.audio.paused)) {
      this.pause();
      return false;
    }
    return this.start();
  }
}

export const weddingAudio = new WeddingAudioPlayer();
