<template>
  <div class="binaural-container">
    <div class="binaural-header">
      <h2 class="binaural-title">Binaural Beats</h2>
      <button
        @click="togglePlayback"
        :class="['play-button', { playing: isPlaying }]"
      >
        {{ isPlaying ? "Stop" : "Start" }}
      </button>
    </div>

    <p class="binaural-description">
      Binaural beats require headphones. They work by playing two slightly
      different frequencies in each ear, creating a third frequency in your
      brain.
    </p>

    <!-- Presets -->
    <div class="presets-grid">
      <button
        v-for="preset in presets"
        :key="preset.name"
        @click="applyPreset(preset)"
        :class="['preset-button', { active: selectedPreset === preset.name }]"
      >
        <div class="preset-name">{{ preset.name.split(" ")[0] }}</div>
        <div class="preset-subtitle">
          {{ preset.name.split(" ").slice(1).join(" ") }}
        </div>
      </button>
    </div>

    <!-- Controls -->
    <div class="controls-section">
      <div class="control-group">
        <div class="control-header">
          <span>Base Frequency</span>
          <span class="control-value">{{ baseFrequency }} Hz</span>
        </div>
        <input
          type="range"
          min="20"
          max="1000"
          step="1"
          v-model.number="baseFrequency"
          class="control-slider"
        />
      </div>

      <div class="control-group">
        <div class="control-header">
          <span>Beat Frequency</span>
          <span class="control-value">{{ beatFrequency }} Hz</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="50"
          step="0.1"
          v-model.number="beatFrequency"
          class="control-slider"
        />
      </div>

      <div class="control-group">
        <div class="control-header">
          <span>Volume</span>
          <span class="control-value">{{ Math.round(volume * 100) }}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          v-model.number="volume"
          class="control-slider"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";

defineProps<{}>();

interface Preset {
  baseFrequency: number;
  beatFrequency: number;
  name: string;
}

const presets: Preset[] = [
  { baseFrequency: 100, beatFrequency: 2, name: "Delta (Deep Sleep) 2 Hz" },
  { baseFrequency: 100, beatFrequency: 5, name: "Theta (Meditation) 5 Hz" },
  { baseFrequency: 100, beatFrequency: 10, name: "Alpha (Relaxation) 10 Hz" },
  { baseFrequency: 100, beatFrequency: 20, name: "Beta (Focus) 20 Hz" },
  { baseFrequency: 100, beatFrequency: 40, name: "Gamma (Cognition) 40 Hz" },
  { baseFrequency: 440, beatFrequency: 10, name: "Custom" },
];

const baseFrequency = ref(440);
const beatFrequency = ref(10);
const volume = ref(0.5);
const isPlaying = ref(false);
const selectedPreset = ref("Custom");

let audioContext: AudioContext | null = null;
let leftOscillator: OscillatorNode | null = null;
let rightOscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;

const computeFrequencies = (base: number, beat: number) => ({
  left: base - beat / 2,
  right: base + beat / 2,
});

const startSound = () => {
  audioContext = new (
    window.AudioContext || (window as any).webkitAudioContext
  )();
  gainNode = audioContext.createGain();
  gainNode.gain.value = volume.value;

  const { left, right } = computeFrequencies(
    baseFrequency.value,
    beatFrequency.value,
  );

  leftOscillator = audioContext.createOscillator();
  leftOscillator.frequency.value = left;

  rightOscillator = audioContext.createOscillator();
  rightOscillator.frequency.value = right;

  const leftPanner = audioContext.createStereoPanner();
  leftPanner.pan.value = -1;

  const rightPanner = audioContext.createStereoPanner();
  rightPanner.pan.value = 1;

  leftOscillator.connect(leftPanner).connect(gainNode);
  rightOscillator.connect(rightPanner).connect(gainNode);
  gainNode.connect(audioContext.destination);

  leftOscillator.start();
  rightOscillator.start();
  isPlaying.value = true;
};

const stopSound = () => {
  if (leftOscillator) leftOscillator.stop();
  if (rightOscillator) rightOscillator.stop();
  if (audioContext) audioContext.close();

  leftOscillator = null;
  rightOscillator = null;
  audioContext = null;
  gainNode = null;
  isPlaying.value = false;
};

const togglePlayback = () => {
  if (isPlaying.value) stopSound();
  else startSound();
};

const applyPreset = (preset: Preset) => {
  selectedPreset.value = preset.name;
  baseFrequency.value = preset.baseFrequency;
  beatFrequency.value = preset.beatFrequency;
};

// Update frequencies and volume in real-time
watch(baseFrequency, (val) => {
  if (isPlaying.value && leftOscillator && rightOscillator) {
    const { left, right } = computeFrequencies(val, beatFrequency.value);
    leftOscillator.frequency.setTargetAtTime(
      left,
      audioContext!.currentTime,
      0.1,
    );
    rightOscillator.frequency.setTargetAtTime(
      right,
      audioContext!.currentTime,
      0.1,
    );
    if (
      selectedPreset.value !== "Custom" &&
      val !==
        presets.find((p) => p.name === selectedPreset.value)?.baseFrequency
    ) {
      selectedPreset.value = "Custom";
    }
  }
});

watch(beatFrequency, (val) => {
  if (isPlaying.value && leftOscillator && rightOscillator) {
    const { left, right } = computeFrequencies(baseFrequency.value, val);
    leftOscillator.frequency.setTargetAtTime(
      left,
      audioContext!.currentTime,
      0.1,
    );
    rightOscillator.frequency.setTargetAtTime(
      right,
      audioContext!.currentTime,
      0.1,
    );
    if (
      selectedPreset.value !== "Custom" &&
      val !==
        presets.find((p) => p.name === selectedPreset.value)?.beatFrequency
    ) {
      selectedPreset.value = "Custom";
    }
  }
});

watch(volume, (val) => {
  if (isPlaying.value && gainNode) {
    gainNode.gain.setTargetAtTime(val, audioContext!.currentTime, 0.1);
  }
});

onUnmounted(() => {
  stopSound();
});
</script>

<style scoped lang="scss">
.binaural-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.binaural-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.binaural-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.play-button {
  padding: 8px 24px;
  border-radius: 9999px;
  font-weight: bold;
  background-color: var(--color-fg-primary);
  color: var(--color-bg-primary);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }

  &.playing {
    background-color: var(--color-error);
    color: white;

    &:hover {
      background-color: #dc2626;
    }
  }

  &:hover:not(.playing) {
    background-color: var(--color-fg-secondary);
  }
}

.binaural-description {
  color: var(--color-fg-muted);
  font-size: 14px;
  transition: color 0.3s ease;
}

.presets-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.preset-button {
  padding: 12px 16px;
  border-radius: 12px;
  text-align: left;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  color: var(--color-fg-muted);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--color-border-accent);
    color: var(--color-fg-secondary);
  }

  &.active {
    background-color: var(--color-button-active);
    border-color: var(--color-border-accent);
    color: var(--color-fg-primary);
  }
}

.preset-name {
  font-size: 14px;
  font-weight: bold;
}

.preset-subtitle {
  font-size: 10px;
  opacity: 0.6;
}

.controls-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border-primary);
  transition: border-color 0.3s ease;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-fg-muted);
  transition: color 0.3s ease;
}

.control-value {
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.control-slider {
  width: 100%;
  height: 6px;
  background-color: var(--color-bg-tertiary);
  border-radius: 8px;
  appearance: none;
  cursor: pointer;
  accent-color: var(--color-fg-primary);
  transition: background-color 0.3s ease;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background-color: var(--color-fg-primary);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background-color: var(--color-fg-primary);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease;
  }
}
</style>
