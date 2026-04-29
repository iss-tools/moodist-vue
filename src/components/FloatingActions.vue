<template>
  <div class="floating-actions">
    <button
      :class="['play-button', { disabled: noSelected || locked }]"
      @click="handleToggle"
      :disabled="noSelected || locked"
    >
      <span aria-hidden="true" class="icon">
        <PauseIcon v-if="isPlaying" class="icon-svg" />
        <PlayIcon v-else class="icon-svg" />
      </span>
      {{ isPlaying ? "Pause" : "Play" }}
    </button>

    <button
      v-if="!noSelected || hasHistory"
      :class="['action-button', { disabled: locked }]"
      @click="handleUnselectToggle"
      :disabled="locked"
      :title="hasHistory ? 'Restore unselected sounds' : 'Unselect all sounds'"
    >
      <UndoIcon v-if="hasHistory" class="icon-svg" />
      <TrashIcon v-else class="icon-svg" />
    </button>

    <button
      :class="['action-button', { disabled: locked }]"
      @click="handleShuffle"
      :disabled="locked"
      title="Shuffle sounds"
    >
      <ShuffleIcon class="icon-svg" />
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  Undo2 as UndoIcon,
  Trash2 as TrashIcon,
  Shuffle as ShuffleIcon,
  Play,
  Pause,
} from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useSoundStore } from "../stores/sound";
import { useSnackbar } from "../composables/useSnackbar";

const PlayIcon = Play;
const PauseIcon = Pause;

const store = useSoundStore();
const { show: showSnackbar } = useSnackbar();
const { noSelected, history, locked, isPlaying } = storeToRefs(store);

const hasHistory = computed(() => !!history.value);

const handleToggle = () => {
  if (locked.value) return;
  if (noSelected.value) {
    showSnackbar("Please first select a sound to play.");
    return;
  }
  store.togglePlay();
};

const handleUnselectToggle = () => {
  if (locked.value) return;
  if (hasHistory.value) {
    store.restoreHistory();
    showSnackbar("Sounds restored");
  } else if (!noSelected.value) {
    store.unselectAll(true);
    showSnackbar("All sounds unselected");
  }
};

const handleShuffle = () => {
  if (locked.value) return;
  store.shuffle();
  showSnackbar("Sounds shuffled");
};
</script>

<style scoped lang="scss">
.floating-actions {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: auto;
}

.play-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 45px;
  font-family: "Fraunces", serif;
  font-size: 16px;
  line-height: 0;
  color: var(--color-bg-primary);
  cursor: pointer;
  background-color: var(--color-fg-primary);
  border: 1px solid var(--color-fg-primary);
  border-radius: 100px;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;

  &:hover:not(.disabled) {
    background-color: var(--color-fg-secondary);
  }

  &:not(.disabled):active {
    transform: scale(0.97);
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .icon {
    font-size: 18px;
    line-height: 0;
    display: flex;
    align-items: center;
  }

  .icon-svg {
    width: 18px;
    height: 18px;
  }

  &:focus-visible {
    outline: 2px solid var(--color-border-accent);
    outline-offset: 2px;
  }
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  font-family: "Fraunces", serif;
  font-size: 16px;
  line-height: 0;
  color: var(--color-fg-primary);
  cursor: pointer;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-secondary);
  border-radius: 100px;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:active:not(.disabled) {
    transform: scale(0.97);
  }

  &:hover:not(.disabled) {
    background-color: var(--color-bg-tertiary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-border-accent);
    outline-offset: 2px;
  }

  .icon-svg {
    width: 18px;
    height: 18px;
  }
}
</style>
