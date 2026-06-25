let audioCtx: AudioContext | null = null;

let masterVolume = 0.7;

export const getMasterVolume = () => masterVolume;
export const setMasterVolume = (v: number) => {
  masterVolume = Math.max(0, Math.min(1, v));
};

export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playDrop = (type: 'C' | 'M' | 'Y') => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const freq = type === 'C' ? 400 : type === 'M' ? 500 : 600;
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + 0.1);
  
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
};

export const playHit = () => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.15);
  
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, audioCtx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
  
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
  
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
};

export const playLaser = () => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(800, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.2);
  
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
};

export const playWin = () => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(440, audioCtx.currentTime);
  osc.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.1);
  osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.2);
  osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.3);
  
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.8);
};

export const playLose = () => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(100, audioCtx.currentTime);
  osc.frequency.linearRampToValueAtTime(50, audioCtx.currentTime + 0.3);
  
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.4);
};

export const playPackSound = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  
  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(220, now);
  osc1.frequency.exponentialRampToValueAtTime(880, now + 0.15);
  gain1.gain.setValueAtTime(0, now);
  gain1.gain.linearRampToValueAtTime(0.15, now + 0.04);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
  osc1.connect(gain1);
  gain1.connect(audioCtx.destination);
  osc1.start();
  osc1.stop(now + 0.16);

  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(120, now + 0.12);
  osc2.frequency.setValueAtTime(60, now + 0.18);
  gain2.gain.setValueAtTime(0, now + 0.12);
  gain2.gain.linearRampToValueAtTime(0.25, now + 0.14);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);
  osc2.start(now + 0.12);
  osc2.stop(now + 0.35);
};

export const playCoinChime = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sine';
  const pitch = 1046.50 + Math.random() * 500;
  osc.frequency.setValueAtTime(pitch, now);
  osc.frequency.exponentialRampToValueAtTime(pitch * 1.15, now + 0.1);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.30);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(now + 0.30);
};

export const playDeliveryShip = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  
  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(587.33, now);
  gain1.gain.setValueAtTime(0, now);
  gain1.gain.linearRampToValueAtTime(0.12, now + 0.05);
  gain1.gain.setValueAtTime(0.12, now + 0.15);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  osc1.connect(gain1);
  gain1.connect(audioCtx.destination);
  osc1.start();
  osc1.stop(now + 0.22);

  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(587.33, now + 0.25);
  gain2.gain.setValueAtTime(0, now + 0.25);
  gain2.gain.linearRampToValueAtTime(0.12, now + 0.3);
  gain2.gain.setValueAtTime(0.12, now + 0.4);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.47);
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);
  osc2.start(now + 0.25);
  osc2.stop(now + 0.47);
};

export const playBuzzer = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(130, now);
  osc.frequency.linearRampToValueAtTime(110, now + 0.35);
  
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(now + 0.35);
};

export const playCashRegister = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  
  const osc1 = audioCtx.createOscillator();
  const gain1 = audioCtx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(1250, now);
  
  gain1.gain.setValueAtTime(0, now);
  gain1.gain.linearRampToValueAtTime(0.15, now + 0.01);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
  
  osc1.connect(gain1);
  gain1.connect(audioCtx.destination);
  osc1.start();
  osc1.stop(now + 0.45);
  
  const osc2 = audioCtx.createOscillator();
  const gain2 = audioCtx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(1550, now + 0.04);
  
  gain2.gain.setValueAtTime(0, now + 0.04);
  gain2.gain.linearRampToValueAtTime(0.12, now + 0.05);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.40);
  
  osc2.connect(gain2);
  gain2.connect(audioCtx.destination);
  osc2.start(now + 0.04);
  osc2.stop(now + 0.40);
};

export const playLevelUpSound = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;

  const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, idx) => {
    const osc = audioCtx!.createOscillator();
    const gain = audioCtx!.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.07);

    gain.gain.setValueAtTime(0, now + idx * 0.07);
    gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.07 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.45);

    osc.connect(gain);
    gain.connect(audioCtx!.destination);
    osc.start(now + idx * 0.07);
    osc.stop(now + idx * 0.07 + 0.45);
  });
};

export const playSparkle = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  for (let i = 0; i < 3; i++) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    const pitch = 1200 + i * 300 + Math.random() * 200;
    osc.frequency.setValueAtTime(pitch, now + i * 0.06);
    gain.gain.setValueAtTime(0, now + i * 0.06);
    gain.gain.linearRampToValueAtTime(0.08, now + i * 0.06 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.12);
    osc.connect(gain);
    gain.connect(audioCtx!.destination);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.12);
  }
};

export const playWhoosh = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(200, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  osc.connect(gain);
  gain.connect(audioCtx!.destination);
  osc.start();
  osc.stop(now + 0.15);
};

export const playClick = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.1, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(now + 0.06);
};

export const playBlip = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(1800, now + 0.06);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(now + 0.08);
};

export const playCelebration = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.52, 1567.98, 2093.00];
  notes.forEach((freq, idx) => {
    const osc = audioCtx!.createOscillator();
    const gain = audioCtx!.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.05);
    gain.gain.setValueAtTime(0, now + idx * 0.05);
    gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.05 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx!.destination);
    osc.start(now + idx * 0.05);
    osc.stop(now + idx * 0.05 + 0.35);
  });
};

export const playSplash = () => {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  const bufferSize = audioCtx.sampleRate * 0.15;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
  }
  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
  source.connect(gain);
  gain.connect(audioCtx!.destination);
  source.start(now);
};

export const setBgMusicEnabled = (_v: boolean) => {};
export const startBgMusic = () => {};
export const stopBgMusic = () => {};
export const pauseBgMusic = () => {};
export const resumeBgMusic = () => {};
export const toggleBgMusic = (): boolean => false;
export const isBgMusicEnabled = () => false;

export const haptic = (ms = 10) => {
  if (navigator && navigator.vibrate) {
    navigator.vibrate(ms);
  }
};
