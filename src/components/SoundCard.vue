<template>
  <div :class="['sound-card', { selected: isSelected }]" @click="toggleSelect">
    <!-- Favorite Button -->
    <button
      :class="['favorite-button', { favorite: isFavorite }]"
      @click.stop="store.toggleFavorite(sound.id)"
    >
      <HeartIcon :class="['w-4 h-4', isFavorite && 'fill-current']" />
    </button>

    <!-- Icon & Label -->
    <div class="content">
      <div :class="['icon', { selected: isSelected }]">
        <component :is="getIcon(sound.icon)" />
      </div>
      <span :class="['label', { selected: isSelected }]">
        {{ sound.label }}
      </span>
    </div>

    <!-- Volume Slider -->
    <div class="volume-container" :class="{ visible: isSelected }" @click.stop>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        :value="volume"
        class="volume-slider"
        :disabled="!isSelected"
        @input="handleVolumeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Heart as HeartIcon } from "lucide-vue-next";
import * as LucideIcons from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { computed, watch } from "vue";
import type { Sound } from "../data/types";
import { useSoundStore } from "../stores/sound";
import { useSound } from "../composables/useSound";

const props = defineProps<{
  sound: Sound;
}>();

const store = useSoundStore();
const { sounds, isPlaying, globalVolume, locked } = storeToRefs(store);

const isSelected = computed(
  () => !!(sounds.value[props.sound.id]?.isSelected ?? false),
);
const isFavorite = computed(
  () => !!(sounds.value[props.sound.id]?.isFavorite ?? false),
);
const volume = computed(() => sounds.value[props.sound.id]?.volume ?? 0.5);

const { play, stop, fadeOut, pause } = useSound(props.sound.src, {
  loop: true,
  volume: () => volume.value * globalVolume.value,
});

// Watch for selection and play/pause - matches React version logic
watch(
  [isSelected, isPlaying],
  ([selected, playing]) => {
    // Skip if locked (matches React useEffect logic)
    if (locked.value) return;

    // Play when selected and playing (matches React useEffect logic)
    if (selected && playing) {
      play();
    } else {
      // Pause when not selected or not playing
      pause();
    }
  },
  { immediate: true },
);

const toggleSelect = () => {
  // Skip if locked (matches React toggle logic)
  if (locked.value) return;

  if (isSelected.value) {
    // Unselect and reset volume to 0.5 (matches React unselect logic)
    store.unselect(props.sound.id);
    store.setVolume(props.sound.id, 0.5);
  } else {
    // Select and start playing (matches React select logic)
    store.select(props.sound.id);
    store.play();
  }
};

const handleVolumeChange = (e: Event) => {
  const val = parseFloat((e.target as HTMLInputElement).value);
  store.setVolume(props.sound.id, val);
};

const getIcon = (icon: any) => {
  if (typeof icon === "string" && (LucideIcons as any)[icon]) {
    return (LucideIcons as any)[icon];
  }
  return icon;
};
</script>

<style scoped lang="scss">
.sound-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px 20px;
  text-align: center;
  cursor: pointer;
  background: var(--color-card-bg);
  border: 1px solid var(--color-card-border);
  border-radius: 12px;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    box-shadow 0.2s;

  &:not(.selected)::before {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    content: "";
    background: var(--color-card-top-line);
  }

  &:hover {
    background: var(--color-card-bg-hover);
  }

  &.selected {
    border: 1px solid transparent;
    box-shadow: 0 0 0 1px var(--color-card-selected-border);
  }
}

.favorite-button {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 6px;
  border-radius: 50%;
  transition: all 0.2s;
  opacity: 0;
  background-color: var(--color-button-hover);
  border: none;
  cursor: pointer;
  color: var(--color-fg-muted);

  .sound-card:hover & {
    opacity: 1;
  }

  &.favorite {
    opacity: 1;
    color: #ef4444;
    background-color: rgba(239, 68, 68, 0.1);
  }

  &:hover {
    color: var(--color-fg-secondary);
    background-color: var(--color-button-active);
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 10px 0;
}

.icon {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 16px;
  color: var(--color-fg-muted);
  transition: 0.2s;
  background-color: var(--color-fg-primary);
  border-radius: 50%;

  &::before {
    position: absolute;
    top: -1px;
    left: -1px;
    z-index: -2;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    content: "";
    background: linear-gradient(
      var(--color-border-secondary),
      var(--color-bg-secondary)
    );
    border-radius: 50%;
  }

  &.selected {
    color: var(--color-bg-primary);
    background-color: var(--color-fg-primary);

    &::before {
      background: linear-gradient(
        var(--color-fg-primary),
        var(--color-bg-secondary)
      );
    }
  }
}

.label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-fg-primary);
  transition: 0.2s;

  .sound-card:hover &,
  &.selected {
    color: var(--color-fg-secondary);
  }
}

.volume-container {
  width: 100%;
  height: 20px;
  margin-top: 8px;
  padding: 0 4px;
  // visibility: hidden;
  // opacity: 0;
  transition:
    visibility 0.2s,
    opacity 0.2s;

  &.visible {
    visibility: visible;
    opacity: 1;
  }
}

.volume-slider {
  width: 100%;
  height: 4px;
  background: var(--color-border-secondary);
  border-radius: 2px;
  appearance: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    margin-top: -5px;
    background-color: var(--color-border-secondary);
    border: 1px solid var(--color-border-accent);
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background-color: var(--color-border-secondary);
    border: 1px solid var(--color-border-accent);
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
