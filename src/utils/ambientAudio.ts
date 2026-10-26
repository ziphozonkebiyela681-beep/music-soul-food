// Web Audio API ambient vinyl and soul chord synthesizer
class AmbientSoulPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private intervalId: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    // Master gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.12, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    // Warm Vinyl Crackle Generator
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Pink/Brownish warm noise with random occasional pops
      const rand = Math.random() * 2 - 1;
      output[i] = rand * 0.03;
      if (Math.random() < 0.001) {
        output[i] += (Math.random() * 2 - 1) * 0.4; // vinyl pop
      }
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Low pass filter to make the crackle warm and velvety
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.gainNode);
    whiteNoise.start();
    this.noiseNode = whiteNoise;

    // Gentle slow warm Rhodes / Neo-soul chord swell generator
    const chords = [
      [220.0, 261.63, 329.63, 392.0], // Am7
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [196.0, 246.94, 293.66, 349.23], // G7
    ];

    let chordIdx = 0;
    const playChordSwell = () => {
      if (!this.isPlaying || !this.ctx || !this.gainNode) return;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;

      notes.forEach((freq) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const chordGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const now = this.ctx.currentTime;
        chordGain.gain.setValueAtTime(0, now);
        chordGain.gain.linearRampToValueAtTime(0.018, now + 2.5);
        chordGain.gain.exponentialRampToValueAtTime(0.0001, now + 7.5);

        osc.connect(chordGain);
        chordGain.connect(this.gainNode);

        osc.start(now);
        osc.stop(now + 8.0);
      });
    };

    playChordSwell();
    this.intervalId = window.setInterval(playChordSwell, 8000);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioScheduledSourceNode).stop();
      } catch {
        // ignore
      }
      this.noiseNode = null;
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientPlayer = new AmbientSoulPlayer();
