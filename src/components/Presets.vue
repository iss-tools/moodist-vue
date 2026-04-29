<template>
  <div class="presets-container">
    <h2 class="presets-title">Presets</h2>

    <!-- New Preset -->
    <div class="new-preset-section">
      <h3 class="section-title">New Preset</h3>
      <form
        @submit.prevent="handleSubmit"
        :class="['preset-form', { disabled: noSelected }]"
      >
        <input
          v-model="name"
          type="text"
          placeholder="Preset's Name"
          required
          class="preset-input"
          :disabled="noSelected"
        />
        <button type="submit" class="preset-save-button" :disabled="noSelected">
          Save
        </button>
      </form>
      <p v-if="noSelected" class="preset-hint">
        To make a preset, first select some sounds.
      </p>
    </div>

    <div class="preset-divider"></div>

    <!-- Presets List -->
    <div class="presets-list-section">
      <h3 class="section-title">
        Your Presets {{ presets.length > 0 ? `(${presets.length})` : "" }}
      </h3>

      <div v-if="presets.length === 0" class="presets-empty">
        You don't have any presets yet.
      </div>

      <div v-else class="presets-list">
        <div v-for="preset in presets" :key="preset.id" class="preset-item">
          <input
            type="text"
            :value="preset.label"
            @input="(e) => handleNameChange(preset.id, e)"
            class="preset-name-input"
            placeholder="Untitled"
          />

          <button
            @click="presetStore.deletePreset(preset.id)"
            class="preset-delete-button"
          >
            <TrashIcon class="w-4 h-4" />
          </button>

          <button @click="applyPreset(preset)" class="preset-play-button">
            <PlayIcon class="w-4 h-4 fill-current" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { Trash2 as TrashIcon, Play as PlayIcon } from "lucide-vue-next";
import { usePresetStore } from "../stores/preset";
import { useSoundStore } from "../stores/sound";

defineProps<{}>();

const emit = defineEmits(["close"]);

const presetStore = usePresetStore();
const { presets } = storeToRefs(presetStore);

const soundStore = useSoundStore();
const { noSelected, sounds } = storeToRefs(soundStore);

const name = ref("");

const handleNameChange = (id: string, e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  presetStore.changeName(id, val);
};

const handleSubmit = () => {
  if (!name.value || noSelected.value) return;

  const activeSounds: Record<string, number> = {};
  Object.keys(sounds.value).forEach((id) => {
    if (sounds.value[id].isSelected) {
      activeSounds[id] = sounds.value[id].volume;
    }
  });

  presetStore.addPreset(name.value, activeSounds);
  name.value = "";
};

const applyPreset = (preset: any) => {
  soundStore.override(preset.sounds);
  soundStore.play();
  emit("close");
};
</script>

<style scoped lang="scss">
.presets-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.presets-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.new-preset-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-fg-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.preset-form {
  display: flex;
  gap: 8px;

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}

.preset-input {
  flex: 1;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--color-fg-primary);
  outline: none;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;

  &:focus {
    border-color: var(--color-border-accent);
  }

  &::placeholder {
    color: var(--color-fg-muted);
  }
}

.preset-save-button {
  background-color: var(--color-fg-primary);
  color: var(--color-bg-primary);
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    background-color: var(--color-fg-secondary);
  }

  &:disabled {
    opacity: 0.5;
  }
}

.preset-hint {
  font-size: 14px;
  color: var(--color-fg-muted);
  transition: color 0.3s ease;
}

.preset-divider {
  height: 1px;
  background-color: var(--color-border-primary);
  transition: background-color 0.3s ease;
}

.presets-list-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.presets-empty {
  color: var(--color-fg-muted);
  text-align: center;
  padding: 16px;
  transition: color 0.3s ease;
}

.presets-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
}

.preset-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--color-bg-secondary);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--color-border-primary);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.preset-name-input {
  flex: 1;
  background-color: transparent;
  color: var(--color-fg-primary);
  outline: none;
  border: none;
  transition: color 0.3s ease;

  &::placeholder {
    color: var(--color-fg-muted);
  }
}

.preset-delete-button {
  padding: 8px;
  color: var(--color-fg-muted);
  background-color: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    color: var(--color-error);
    background-color: rgba(239, 68, 68, 0.1);
  }
}

.preset-play-button {
  padding: 8px;
  background-color: var(--color-fg-primary);
  color: var(--color-bg-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-fg-secondary);
  }
}
</style>
