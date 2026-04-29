import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useSoundStore } from './sound';

export const useSleepTimerStore = defineStore('sleep-timer', () => {
  const soundStore = useSoundStore();
  
  const active = ref(false);
  const hours = ref('0');
  const minutes = ref('10');
  const timeSpent = ref(0);
  const timerId = ref<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = computed(() => {
    const h = parseInt(hours.value) || 0;
    const m = parseInt(minutes.value) || 0;
    return h * 3600 + m * 60;
  });

  const timeLeft = computed(() => Math.max(0, totalSeconds.value - timeSpent.value));

  const formattedTimeLeft = computed(() => {
    const h = Math.floor(timeLeft.value / 3600);
    const m = Math.floor((timeLeft.value % 3600) / 60);
    const s = timeLeft.value % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  });

  function startTimer() {
    if (timerId.value) clearInterval(timerId.value);
    if (soundStore.noSelected) return;
    if (!soundStore.isPlaying) soundStore.play();

    if (totalSeconds.value > 0) {
      active.value = true;
      timerId.value = setInterval(() => {
        timeSpent.value++;
      }, 1000);
    }
  }

  function stopTimer() {
    if (timerId.value) {
      clearInterval(timerId.value);
      timerId.value = null;
    }
    active.value = false;
  }

  function resetTimer() {
    stopTimer();
    timeSpent.value = 0;
    hours.value = '0';
    minutes.value = '10';
  }

  watch(timeLeft, (val) => {
    if (val === 0 && active.value) {
      stopTimer();
      soundStore.pause();
      timeSpent.value = 0;
    }
  });

  return {
    active,
    hours,
    minutes,
    timeSpent,
    timeLeft,
    formattedTimeLeft,
    startTimer,
    stopTimer,
    resetTimer,
  };
});
