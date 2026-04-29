<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import { useSoundEffect } from "../composables/useSoundEffect";
import { useCountdownStore } from "../stores/countdown";

const props = defineProps<{}>();

const emit = defineEmits(["close"]);

const store = useCountdownStore();
const alarm = useSoundEffect("/sounds/alarm.mp3");

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
const timeLeft = ref(0);
const initialTime = ref(0);
const isActive = ref(false);
const isFormVisible = ref(true);

const interval = ref<ReturnType<typeof setInterval> | null>(null);

const padNumber = (n: number) => n.toString().padStart(2, "0");

const formatTime = (time: number) => {
  const hrs = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const secs = time % 60;
  return `${padNumber(hrs)}:${padNumber(mins)}:${padNumber(secs)}`;
};

const handleStart = () => {
  if (hours.value > 0 || minutes.value > 0 || seconds.value > 0) {
    const totalTime = hours.value * 3600 + minutes.value * 60 + seconds.value;
    timeLeft.value = totalTime;
    initialTime.value = totalTime;
    isActive.value = true;
    isFormVisible.value = false;
    store.setRunning(true);
    startTimer();
  }
};

const startTimer = () => {
  if (interval.value) clearInterval(interval.value);
  interval.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      finishTimer();
    }
  }, 1000);
};

const stopTimer = () => {
  if (interval.value) clearInterval(interval.value);
  isActive.value = false;
  store.setRunning(false);
};

const toggleTimer = () => {
  if (isActive.value) {
    stopTimer();
  } else {
    isActive.value = true;
    store.setRunning(true);
    startTimer();
  }
};

const handleBack = () => {
  stopTimer();
  isFormVisible.value = true;
  timeLeft.value = 0;
};

const finishTimer = () => {
  stopTimer();
  alarm.play();
  isFormVisible.value = true;
};

const elapsedTime = computed(() => initialTime.value - timeLeft.value);

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value);
});

const close = () => {
  emit("close");
};
</script>

<template>
  <div class="countdown-container">
    <header class="countdown-header">
      <h2 class="countdown-title">Countdown Timer</h2>
      <p class="countdown-description">Super simple countdown timer.</p>
    </header>

    <div v-if="isFormVisible" class="countdown-form-section">
      <div class="time-inputs">
        <div class="time-input-group">
          <input
            v-model.number="hours"
            type="number"
            min="0"
            placeholder="HH"
            class="time-input"
          />
          <span class="time-label">Hours</span>
        </div>
        <span class="time-separator">:</span>
        <div class="time-input-group">
          <input
            v-model.number="minutes"
            type="number"
            min="0"
            max="59"
            placeholder="MM"
            class="time-input"
          />
          <span class="time-label">Minutes</span>
        </div>
        <span class="time-separator">:</span>
        <div class="time-input-group">
          <input
            v-model.number="seconds"
            type="number"
            min="0"
            max="59"
            placeholder="SS"
            class="time-input"
          />
          <span class="time-label">Seconds</span>
        </div>
      </div>

      <button @click="handleStart" class="start-button">Start</button>
    </div>

    <div v-else class="countdown-running-section">
      <div class="timer-display">
        <div class="elapsed-time">- {{ formatTime(elapsedTime) }}</div>
        <div class="remaining-time">
          {{ formatTime(timeLeft) }}
        </div>
      </div>

      <div class="timer-buttons">
        <button @click="handleBack" class="back-button">Back</button>
        <button @click="toggleTimer" class="toggle-button">
          {{ isActive ? "Pause" : "Start" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.countdown-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.countdown-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.countdown-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.countdown-description {
  font-size: 14px;
  color: var(--color-fg-muted);
  transition: color 0.3s ease;
}

.countdown-form-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.time-inputs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.time-input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.time-input {
  width: 64px;
  height: 48px;
  text-align: center;
  font-size: 20px;
  font-family: monospace;
  background-color: var(--color-bg-secondary);
  border: none;
  border-radius: 8px;
  color: var(--color-fg-primary);
  outline: none;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:focus {
    box-shadow: 0 0 0 2px var(--color-border-accent);
  }
}

.time-label {
  font-size: 10px;
  text-transform: uppercase;
  color: var(--color-fg-muted);
  font-weight: bold;
  transition: color 0.3s ease;
}

.time-separator {
  font-size: 20px;
  font-family: monospace;
  color: var(--color-fg-muted);
  margin-bottom: 24px;
  transition: color 0.3s ease;
}

.start-button {
  width: 100%;
  padding: 12px;
  background-color: var(--color-fg-primary);
  color: var(--color-bg-primary);
  border-radius: 12px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
}

.countdown-running-section {
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

.elapsed-time {
  font-size: 12px;
  font-family: monospace;
  color: var(--color-fg-muted);
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.remaining-time {
  font-size: 48px;
  font-family: monospace;
  font-weight: 500;
  letter-spacing: -0.025em;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.timer-buttons {
  display: flex;
  gap: 16px;
}

.back-button {
  flex: 1;
  padding: 12px;
  background-color: var(--color-bg-secondary);
  color: var(--color-fg-primary);
  border-radius: 12px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-bg-tertiary);
  }
}

.toggle-button {
  flex: 1;
  padding: 12px;
  background-color: var(--color-fg-primary);
  color: var(--color-bg-primary);
  border-radius: 12px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
}
</style>
