<template>
  <div class="share-container">
    <h2 class="share-title">Share Selection</h2>

    <p class="share-description">
      Copy and send the following link to share your current sound selection and
      volume settings with others.
    </p>

    <div class="share-url-section">
      <div class="share-url-display">
        {{ shareUrl }}
      </div>
      <button @click="handleCopy" class="share-copy-button">
        <Check v-if="copying" class="w-4 h-4" />
        <Copy v-else class="w-4 h-4" />
        {{ copying ? "Copied" : "Copy" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { Copy, Check } from "lucide-vue-next";
import { useSoundStore } from "../stores/sound";
import { useCopy } from "../composables/useCopy";

defineProps<{}>();

const store = useSoundStore();
const { sounds } = storeToRefs(store);
const { copy, copying } = useCopy();

const shareUrl = computed(() => {
  const selectedSounds: Record<string, number> = {};

  Object.keys(sounds.value).forEach((id) => {
    if (sounds.value[id].isSelected) {
      selectedSounds[id] = Number(sounds.value[id].volume.toFixed(2));
    }
  });

  const string = JSON.stringify(selectedSounds);
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "https://moodist.app";

  return `${baseUrl}/?share=${encodeURIComponent(string)}`;
});

const handleCopy = () => {
  copy(shareUrl.value);
};
</script>

<style scoped lang="scss">
.share-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.share-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.share-description {
  color: var(--color-fg-muted);
  font-size: 14px;
  line-height: 1.5;
  transition: color 0.3s ease;
}

.share-url-section {
  display: flex;
  gap: 8px;
}

.share-url-display {
  flex: 1;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--color-fg-muted);
  font-size: 14px;
  font-family: monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

.share-copy-button {
  background-color: var(--color-fg-primary);
  color: var(--color-bg-primary);
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-fg-secondary);
  }
}
</style>
