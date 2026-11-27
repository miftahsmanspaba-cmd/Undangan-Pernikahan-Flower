// Gentle Web Audio API romantic arpeggio synthesizer for background wedding music.
// Runs entirely in the browser with zero external audio dependencies.

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private step = 0;

  // Soft dreamy progression inspired by acoustic romantic ballads (C - G - Am - F)
  private readonly sequence = [
    261.63, 329.63, 392.0, 523.25, 392.0, 329.63, // Cmaj7 arpeggio
    246.94, 392.0, 493.88, 587.33, 493.88, 392.0, // G/B
    220.0, 329.63, 440.0, 523.25, 440.0, 329.63, // Am7
    174.61, 261.63, 349.23, 440.0, 349.23, 261.63, // Fmaj7
  ];

  private playNote(freq: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.008, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

    osc.connect(filter);
    subOsc.connect(subGain);
    subGain.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 1.7);
    subOsc.stop(now + 1.0);
  }

  public start(): boolean {
    if (this.isPlaying) return true;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return false;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }
      this.isPlaying = true;
      this.playNote(this.sequence[this.step % this.sequence.length]);
      this.step += 1;

      this.timerId = window.setInterval(() => {
        if (!this.isPlaying) return;
        this.playNote(this.sequence[this.step % this.sequence.length]);
        this.step += 1;
      }, 620);
      return true;
    } catch {
      return false;
    }
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    }
    return this.start();
  }
}

export const weddingAudio = new WeddingAudioPlayer();
