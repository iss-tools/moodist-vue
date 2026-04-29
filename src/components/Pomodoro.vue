<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import {
  RotateCcw,
  Play,
  Pause,
  Settings as SettingsIcon,
} from "lucide-vue-next";
import { usePomodoroStore } from "../stores/pomodoro";

const props = defineProps<{}>();

const emit = defineEmits(["close"]);

const store = usePomodoroStore();
const { running, selectedTab, timer, times, completions, formattedTime } =
  storeToRefs(store);

const tabs = [
  { id: "pomodoro", label: "Pomodoro" },
  { id: "short", label: "Break" },
  { id: "long", label: "Long Break" },
];

const toggleRunning = () => {
  store.toggleRunning();
};

const restart = () => {
  store.restart();
};

const showSettings = ref(false);

const handleSaveSettings = (newTimes: Record<string, number>) => {
  times.value = newTimes as any;
  showSettings.value = false;
  if (!running.value) {
    timer.value = newTimes[selectedTab.value];
  }
};

const openSettings = () => {
  showSettings.value = true;
};

const close = () => {
  emit("close");
};
</script>

<template>
  <div>
    <div class="pomodoro-container">
      <header class="pomodoro-header">
        <h2 class="pomodoro-title">Pomodoro Timer</h2>
        <button @click="openSettings" class="settings-button">
          <SettingsIcon class="w-5 h-5" />
        </button>
      </header>

      <!-- Tabs -->
      <div class="pomodoro-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="selectedTab = tab.id"
          :class="['tab-button', { active: selectedTab === tab.id }]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Timer Display -->
      <div class="timer-display">
        <div class="timer-time">
          {{ formattedTime }}
        </div>
        <div class="timer-line"></div>
      </div>

      <!-- Controls -->
      <div class="pomodoro-controls">
        <div class="completions-count">
          {{ completions[selectedTab] }} completed
        </div>
        <div class="control-buttons">
          <button @click="restart" class="restart-button">
            <RotateCcw class="w-5 h-5" />
          </button>
          <button @click="toggleRunning" class="play-pause-button">
            <Pause v-if="store.running" class="w-6 h-6" />
            <Play v-else class="w-6 h-6 play-icon" />
          </button>
        </div>
      </div>
    </div>

    <PomodoroSettings
      :show="showSettings"
      :times="times"
      @close="showSettings = false"
      @save="handleSaveSettings"
    />
  </div>
</template>

<style scoped lang="scss">
.pomodoro-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.pomodoro-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pomodoro-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.settings-button {
  padding: 8px;
  border-radius: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-fg-muted);
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-button-hover);
    color: var(--color-fg-secondary);
  }
}

.pomodoro-tabs {
  display: flex;
  padding: 4px;
  background-color: var(--color-bg-secondary);
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.tab-button {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-fg-muted);
  transition: all 0.2s ease;

  &:hover {
    color: var(--color-fg-secondary);
  }

  &.active {
    // background-color: var(--color-modal-bg);
    background-color: var(--color-bg-tertiary);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    color: var(--color-fg-primary);
  }
}

.timer-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background-color: var(--color-bg-secondary);
  border-radius: 16px;
  border: 1px solid var(--color-border-primary);
  position: relative;
  overflow: hidden;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.timer-time {
  font-size: 60px;
  font-family: monospace;
  font-weight: 500;
  letter-spacing: -0.025em;
  color: var(--color-fg-primary);
  z-index: 10;
  transition: color 0.3s ease;
}

.timer-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-border-accent),
    transparent
  );
  opacity: 0.2;
}

.pomodoro-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.completions-count {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-fg-muted);
  transition: color 0.3s ease;
}

.control-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.restart-button {
  padding: 12px;
  border-radius: 9999px;
  background-color: var(--color-bg-tertiary);
  border: none;
  cursor: pointer;
  color: var(--color-fg-tertiary);
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-border-secondary);
    color: var(--color-fg-tertiary);
  }
}

.play-pause-button {
  padding: 16px;
  border-radius: 9999px;
  background-color: var(--color-fg-primary);
  border: none;
  cursor: pointer;
  color: var(--color-bg-primary);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-fg-secondary);
  }

  .play-icon {
    margin-left: 4px;
  }
}
</style>
