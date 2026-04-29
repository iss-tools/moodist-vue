import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { useSoundEffect } from '../composables/useSoundEffect';

export const usePomodoroStore = defineStore('pomodoro', () => {
  const running = ref(false);
  const selectedTab = ref('pomodoro');
  const timer = ref(0);
  const interval = ref<ReturnType<typeof setInterval> | null>(null);
  const alarm = useSoundEffect('/sounds/alarm.mp3');

  const defaultTimes = {
    long: 15 * 60,
    pomodoro: 25 * 60,
    short: 5 * 60,
  };

  const times = useLocalStorage('moodist-pomodoro-setting', defaultTimes);
  const completions = ref<Record<string, number>>({
    long: 0,
    pomodoro: 0,
    short: 0,
  });

  const formattedTime = computed(() => {
    const hours = Math.floor(timer.value / 3600);
    const minutes = Math.floor((timer.value % 3600) / 60);
    const seconds = timer.value % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  });

  function startTimer() {
    if (interval.value) clearInterval(interval.value);
    running.value = true;
    interval.value = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
      } else {
        finishTimer();
      }
    }, 1000);
  }

  function stopTimer() {
    if (interval.value) {
      clearInterval(interval.value);
      interval.value = null;
    }
    running.value = false;
  }

  function toggleRunning() {
    if (running.value) {
      stopTimer();
    } else {
      if (timer.value <= 0) {
        timer.value = (times.value as any)[selectedTab.value] || 0;
      }
      startTimer();
    }
  }

  function restart() {
    stopTimer();
    timer.value = (times.value as any)[selectedTab.value] || 0;
  }

  function finishTimer() {
    stopTimer();
    alarm.play();
    completions.value[selectedTab.value]++;
  }

  watch(selectedTab, (newTab) => {
    stopTimer();
    timer.value = (times.value as any)[newTab] || 0;
  }, { immediate: true });

  return {
    running,
    selectedTab,
    timer,
    times,
    completions,
    formattedTime,
    startTimer,
    stopTimer,
    toggleRunning,
    restart,
  };
});
