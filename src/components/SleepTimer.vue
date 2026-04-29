<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSleepTimerStore } from "../stores/sleepTimer";
import { useSoundStore } from "../stores/sound";

const props = defineProps<{}>();

const emit = defineEmits(["close"]);

const store = useSleepTimerStore();
const soundStore = useSoundStore();
const {
  active: running,
  hours,
  minutes,
  formattedTimeLeft,
} = storeToRefs(store);

const errorMessage = ref("");

const startTimer = () => {
  errorMessage.value = "";

  // Check if any sound is selected
  if (soundStore.noSelected) {
    errorMessage.value = "Please select at least one sound first";
    return;
  }

  // Check if time is set
  const totalSeconds =
    (parseInt(hours.value) || 0) * 3600 + (parseInt(minutes.value) || 0) * 60;
  if (totalSeconds === 0) {
    errorMessage.value = "Please set a timer duration";
    return;
  }

  store.startTimer();
};

const stopTimer = () => {
  store.stopTimer();
};

const resetTimer = () => {
  store.resetTimer();
};

const close = () => {
  errorMessage.value = "";
  emit("close");
};
</script>

<template>
  <div class="sleep-timer-container">
    <header class="sleep-timer-header">
      <h2 class="sleep-timer-title">Sleep Timer</h2>
      <p class="sleep-timer-description">
        Set a timer to automatically stop the sounds.
      </p>
    </header>

    <div v-if="!running" class="sleep-timer-input-section">
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div class="time-inputs">
        <div class="time-input-group">
          <label class="time-label">Hours</label>
          <input
            v-model="hours"
            type="number"
            min="0"
            max="23"
            class="time-input"
          />
        </div>
        <div class="time-input-group">
          <label class="time-label">Minutes</label>
          <input
            v-model="minutes"
            type="number"
            min="0"
            max="59"
            class="time-input"
          />
        </div>
      </div>
      <button @click="startTimer" class="start-button">Start Timer</button>
    </div>

    <div v-else class="sleep-timer-running-section">
      <div class="timer-display">
        <div class="timer-time">
          {{ formattedTimeLeft }}
        </div>
      </div>
      <div class="timer-buttons">
        <button @click="stopTimer" class="pause-button">Pause</button>
        <button @click="resetTimer" class="reset-button">Reset</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sleep-timer-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sleep-timer-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sleep-timer-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.sleep-timer-description {
  font-size: 14px;
  color: var(--color-fg-muted);
  transition: color 0.3s ease;
}

.sleep-timer-input-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.error-message {
  padding: 12px 16px;
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #ef4444;
  font-size: 14px;
  text-align: center;
}

.time-inputs {
  display: flex;
  gap: 16px;
}

.time-input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.time-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-fg-secondary);
  transition: color 0.3s ease;
}

.time-input {
  width: 100%;
  padding: 8px 12px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  color: var(--color-fg-primary);
  outline: none;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;

  &:focus {
    border-color: var(--color-border-accent);
  }
}

.start-button {
  width: 100%;
  padding: 12px;
  background-color: var(--color-fg-primary);
  color: var(--color-bg-primary);
  font-weight: bold;
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

.sleep-timer-running-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.timer-time {
  font-size: 48px;
  font-family: monospace;
  font-weight: 500;
  letter-spacing: -0.025em;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.timer-buttons {
  display: flex;
  gap: 12px;
}

.pause-button {
  flex: 1;
  padding: 12px;
  background-color: var(--color-bg-tertiary);
  color: var(--color-fg-secondary);
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-border-secondary);
  }
}

.reset-button {
  flex: 1;
  padding: 12px;
  background-color: var(--color-fg-primary);
  color: var(--color-bg-primary);
  font-weight: bold;
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
