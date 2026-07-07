type Tone = "click" | "terminal" | "alert";

const toneConfig: Record<Tone, { frequency: number; duration: number; gain: number }> = {
  click: { frequency: 440, duration: 0.045, gain: 0.025 },
  terminal: { frequency: 620, duration: 0.035, gain: 0.018 },
  alert: { frequency: 180, duration: 0.12, gain: 0.035 },
};

export function playTone(tone: Tone, enabled = true) {
  if (!enabled) {
    return;
  }

  const AudioContext = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof window.AudioContext }).webkitAudioContext;

  if (!AudioContext) {
    return;
  }

  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const config = toneConfig[tone];

  oscillator.type = "sine";
  oscillator.frequency.value = config.frequency;
  gain.gain.setValueAtTime(config.gain, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + config.duration);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + config.duration);
}
