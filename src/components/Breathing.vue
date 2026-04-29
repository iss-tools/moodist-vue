<template>
  <div class="breathing-container">
    <div class="breathing-header">
      <h2 class="breathing-title">Breathing</h2>
      <div class="breathing-timer">
        {{ formatTime(timer) }}
      </div>
    </div>

    <!-- Exercise Selector -->
    <div class="exercise-selector">
      <button
        v-for="exercise in exercises"
        :key="exercise"
        @click="selectedExercise = exercise"
        :class="['exercise-button', { active: selectedExercise === exercise }]"
      >
        {{ exercise }}
      </button>
    </div>

    <!-- Animation Area -->
    <div class="animation-area">
      <!-- Outer Circle (Static) -->
      <div class="outer-circle"></div>

      <!-- Breathing Circle -->
      <div
        v-motion
        :initial="{ scale: 1 }"
        :enter="{ scale: 1 }"
        :variants="animationVariants"
        :variant="currentPhase"
        class="breathing-circle"
      >
        <span class="phase-label">
          {{ PHASE_LABELS[currentPhase] }}
        </span>
      </div>
    </div>

    <p class="exercise-description">
      {{ EXERCISE_DESCRIPTIONS[selectedExercise] }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

defineProps<{}>();

type Exercise = "Box Breathing" | "Resonant" | "4-7-8";
type Phase = "inhale" | "exhale" | "holdInhale" | "holdExhale";

const exercises: Exercise[] = ["4-7-8", "Box Breathing", "Resonant"];

const EXERCISE_PHASES: Record<Exercise, Phase[]> = {
  "4-7-8": ["inhale", "holdInhale", "exhale"],
  "Box Breathing": ["inhale", "holdInhale", "exhale", "holdExhale"],
  Resonant: ["inhale", "exhale"],
};

const EXERCISE_DURATIONS: Record<Exercise, Partial<Record<Phase, number>>> = {
  "4-7-8": { exhale: 8, holdInhale: 7, inhale: 4 },
  "Box Breathing": { exhale: 4, holdExhale: 4, holdInhale: 4, inhale: 4 },
  Resonant: { exhale: 5, inhale: 5 },
};

const PHASE_LABELS: Record<Phase, string> = {
  exhale: "Exhale",
  holdExhale: "Hold",
  holdInhale: "Hold",
  inhale: "Inhale",
};

const EXERCISE_DESCRIPTIONS: Record<Exercise, string> = {
  "4-7-8":
    "Calm the nervous system. Inhale for 4s, hold for 7s, exhale for 8s.",
  "Box Breathing":
    "Focus and stress relief. Equal parts inhale, hold, exhale, hold.",
  Resonant: "Maximize heart rate variability. Equal parts inhale and exhale.",
};

const selectedExercise = ref<Exercise>("4-7-8");
const phaseIndex = ref(0);
const timer = ref(0);
let timerInterval: any = null;
let phaseInterval: any = null;

const phases = computed(() => EXERCISE_PHASES[selectedExercise.value]);
const currentPhase = computed(() => phases.value[phaseIndex.value]);

const animationVariants = computed(() => ({
  exhale: {
    scale: 1,
    transition: {
      duration: (EXERCISE_DURATIONS[selectedExercise.value].exhale || 4) * 1000,
      ease: "easeInOut",
    },
  },
  holdExhale: {
    scale: 1,
    transition: {
      duration:
        (EXERCISE_DURATIONS[selectedExercise.value].holdExhale || 4) * 1000,
      ease: "linear",
    },
  },
  holdInhale: {
    scale: 1.5,
    transition: {
      duration:
        (EXERCISE_DURATIONS[selectedExercise.value].holdInhale || 4) * 1000,
      ease: "linear",
    },
  },
  inhale: {
    scale: 1.5,
    transition: {
      duration: (EXERCISE_DURATIONS[selectedExercise.value].inhale || 4) * 1000,
      ease: "easeInOut",
    },
  },
}));

const startPhaseTimer = () => {
  if (phaseInterval) clearInterval(phaseInterval);
  const duration =
    (EXERCISE_DURATIONS[selectedExercise.value][currentPhase.value] || 4) *
    1000;
  phaseInterval = setInterval(() => {
    phaseIndex.value = (phaseIndex.value + 1) % phases.value.length;
    startPhaseTimer();
  }, duration);
};

watch(selectedExercise, () => {
  phaseIndex.value = 0;
  startPhaseTimer();
});

onMounted(() => {
  startPhaseTimer();
  timerInterval = setInterval(() => {
    timer.value++;
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
  if (phaseInterval) clearInterval(phaseInterval);
});

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};
</script>

<style scoped lang="scss">
.breathing-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
}

.breathing-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.breathing-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.breathing-timer {
  font-size: 20px;
  font-family: monospace;
  color: var(--color-fg-muted);
  transition: color 0.3s ease;
}

.exercise-selector {
  display: flex;
  padding: 4px;
  background-color: var(--color-bg-secondary);
  border-radius: 12px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.exercise-button {
  flex: 1;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-fg-muted);
  transition: all 0.2s ease;

  &:hover {
    color: var(--color-fg-secondary);
  }

  &.active {
    background-color: var(--color-bg-tertiary);
    color: var(--color-fg-primary);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
}

.animation-area {
  position: relative;
  width: 256px;
  height: 256px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.outer-circle {
  position: absolute;
  inset: 0;
  border: 2px solid var(--color-border-primary);
  border-radius: 50%;
  opacity: 0.05;
  transition: border-color 0.3s ease;
}

.breathing-circle {
  width: 160px;
  height: 160px;
  background-color: var(--color-fg-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 50px rgba(var(--button-hover-rgb), 0.1);
  transition: background-color 0.3s ease;
}

.phase-label {
  color: var(--color-bg-primary);
  font-weight: bold;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color 0.3s ease;
}

.exercise-description {
  color: var(--color-fg-muted);
  font-size: 14px;
  text-align: center;
  max-width: 280px;
  transition: color 0.3s ease;
}
</style>
