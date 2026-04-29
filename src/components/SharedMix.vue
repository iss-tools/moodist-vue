<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold" style="color: var(--color-fg-primary)">
      New sound mix detected!
    </h2>

    <p class="text-sm leading-relaxed" style="color: var(--color-fg-muted)">
      Someone has shared the following mix with you. Would you like to override
      your current selection?
    </p>

    <div class="space-y-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
      <div
        v-for="sound in sharedSounds"
        :key="sound.id"
        class="flex items-center justify-between p-3 rounded-xl"
        style="
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border-primary);
        "
      >
        <span
          class="text-sm font-medium"
          style="color: var(--color-fg-primary)"
          >{{ sound.label }}</span
        >
        <span class="text-xs font-mono" style="color: var(--color-fg-muted)"
          >{{ Math.round(sound.volume * 100) }}%</span
        >
      </div>
    </div>

    <div class="flex gap-3 pt-4">
      <button
        @click="handleClose"
        class="flex-1 px-4 py-2 rounded-lg transition-colors"
        style="
          background-color: var(--color-bg-tertiary);
          color: var(--color-fg-primary);
        "
      >
        Cancel
      </button>
      <button
        @click="handleOverride"
        class="flex-1 px-4 py-2 rounded-lg font-bold transition-colors"
        style="
          background-color: var(--color-bg-inverse);
          color: var(--color-fg-inverse);
        "
      >
        Apply Mix
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSoundStore } from "../stores/sound";
import { sounds as soundsData } from "../data/sounds";

const props = defineProps<{}>();

const emit = defineEmits(["close"]);

const store = useSoundStore();
const sharedSounds = ref<Array<{ id: string; label: string; volume: number }>>(
  [],
);

onMounted(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const share = searchParams.get("share");

  if (share) {
    try {
      const parsed = JSON.parse(decodeURIComponent(share));
      const allSounds: Record<string, string> = {};

      soundsData.categories.forEach((category) => {
        category.sounds.forEach((sound) => {
          allSounds[sound.id] = sound.label;
        });
      });

      const _sharedSounds: Array<{
        id: string;
        label: string;
        volume: number;
      }> = [];

      Object.keys(parsed).forEach((id) => {
        if (allSounds[id]) {
          _sharedSounds.push({
            id,
            label: allSounds[id],
            volume: Number(parsed[id]),
          });
        }
      });

      if (_sharedSounds.length) {
        sharedSounds.value = _sharedSounds;
      }
    } catch (e) {
      console.error("Failed to parse shared mix", e);
    }
  }
});

const handleOverride = () => {
  const newSounds: Record<string, number> = {};
  sharedSounds.value.forEach((s) => {
    newSounds[s.id] = s.volume;
  });
  store.override(newSounds);
  // Clean up URL after applying
  window.history.replaceState({}, "", window.location.pathname);
  handleClose();
};

const handleClose = () => {
  // Clean up URL even if cancelled to avoid showing it again on refresh
  window.history.replaceState({}, "", window.location.pathname);
  emit("close");
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-scrollbar-thumb);
  border-radius: 10px;
}

button:hover {
  opacity: 0.9;
}
</style>
