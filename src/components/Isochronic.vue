<template>
  <div class="isochronic-container">
    <div class="isochronic-header">
      <h2 class="isochronic-title">{{ $t('menu.isochronic') }}</h2>
      <button
        @click="togglePlayback"
        :class="['play-button', { playing: isPlaying }]"
      >
        {{ isPlaying ? $t('common.stop') : $t('common.start') }}
      </button>
    </div>

    <p class="isochronic-description">
      {{ $t('components.isochronicDesc') }}
    </p>

    <!-- Presets -->
    <div class="presets-grid">
      <button
        v-for="preset in presets"
        :key="preset.id"
        @click="applyPreset(preset)"
        :class="['preset-button', { active: selectedPreset === preset.id }]"
      >
        <div class="preset-name">{{ $t(`presets.${preset.id}`) }}</div>
        <div class="preset-subtitle" v-if="preset.id !== 'custom'">
          {{ $t(`presets.${preset.id}Desc`) }} {{ preset.freqLabel }}
        </div>
      </button>
    </div>

    <!-- Controls -->
    <div class="controls-section">
      <div class="control-group">
        <div class="control-header">
          <span>{{ $t('components.baseFrequency') }}</span>
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
          <span>{{ $t('components.beatFrequency') }}</span>
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
          <span>{{ $t('components.volume') }}</span>
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
  id: string;
  freqLabel?: string;
}

const presets: Preset[] = [
  { baseFrequency: 100, beatFrequency: 2, id: "delta", freqLabel: "2 Hz" },
  { baseFrequency: 100, beatFrequency: 5, id: "theta", freqLabel: "5 Hz" },
  { baseFrequency: 100, beatFrequency: 10, id: "alpha", freqLabel: "10 Hz" },
  { baseFrequency: 100, beatFrequency: 20, id: "beta", freqLabel: "20 Hz" },
  { baseFrequency: 100, beatFrequency: 40, id: "gamma", freqLabel: "40 Hz" },
  { baseFrequency: 440, beatFrequency: 10, id: "custom" },
];

const baseFrequency = ref(440);
const beatFrequency = ref(10);
const volume = ref(0.5);
const isPlaying = ref(false);
const selectedPreset = ref("custom");

let audioContext: AudioContext | null = null;
let oscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;

const startSound = () => {
  audioContext = new (
    window.AudioContext || (window as any).webkitAudioContext
  )();
  gainNode = audioContext.createGain();
  gainNode.gain.value = volume.value;

  oscillator = audioContext.createOscillator();
  oscillator.frequency.value = baseFrequency.value;
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  isPlaying.value = true;
};

const stopSound = () => {
  if (oscillator) oscillator.stop();
  if (audioContext) audioContext.close();

  oscillator = null;
  audioContext = null;
  gainNode = null;
  isPlaying.value = false;
};

const togglePlayback = () => {
  if (isPlaying.value) stopSound();
  else startSound();
};

const applyPreset = (preset: Preset) => {
  selectedPreset.value = preset.id;
  baseFrequency.value = preset.baseFrequency;
  beatFrequency.value = preset.beatFrequency;
};

// Update frequency and volume in real-time
watch(baseFrequency, (val) => {
  if (isPlaying.value && oscillator) {
    oscillator.frequency.setTargetAtTime(val, audioContext!.currentTime, 0.1);
    if (
      selectedPreset.value !== "custom" &&
      val !==
        presets.find((p) => p.id === selectedPreset.value)?.baseFrequency
    ) {
      selectedPreset.value = "custom";
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
.isochronic-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.isochronic-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.isochronic-title {
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

.isochronic-description {
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
