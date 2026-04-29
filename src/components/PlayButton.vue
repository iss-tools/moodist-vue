<template>
  <button
    :class="[
      'flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all',
    ]"
    :style="buttonStyle"
    @click="handleToggle"
    :disabled="noSelected"
  >
    <component :is="isPlaying ? PauseIcon : PlayIcon" class="w-5 h-5" />
    <span>{{ isPlaying ? "Pause" : "Play" }}</span>
  </button>
</template>

<script setup lang="ts">
import { Play as PlayIcon, Pause as PauseIcon } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { watch, computed } from "vue";
import { useSoundStore } from "../stores/sound";
import { useSnackbar } from "../composables/useSnackbar";

const store = useSoundStore();
const { show: showSnackbar } = useSnackbar();
const { isPlaying, noSelected, locked } = storeToRefs(store);

const buttonStyle = computed(() => {
  if (noSelected.value) {
    return {
      backgroundColor: "var(--color-bg-muted)",
      color: "var(--color-fg-muted)",
      cursor: "not-allowed",
    };
  }
  return {
    backgroundColor: "var(--color-bg-inverse)",
    color: "var(--color-fg-inverse)",
    boxShadow: "var(--shadow-floating)",
  };
});

const handleToggle = () => {
  if (locked.value) return;
  if (noSelected.value) {
    showSnackbar("Please first select a sound to play.");
    return;
  }
  store.togglePlay();
};

watch([isPlaying, noSelected], () => {
  if (isPlaying.value && noSelected.value) {
    store.pause();
  }
});
</script>

<style scoped>
button:not(:disabled):hover {
  transform: scale(1.05);
}

button:not(:disabled):active {
  transform: scale(0.95);
}
</style>
