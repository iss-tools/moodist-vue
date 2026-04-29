import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCountdownStore = defineStore('countdown', () => {
  const running = ref(false);

  const setRunning = (val: boolean) => {
    running.value = val;
  };

  return {
    running,
    setRunning,
  };
});
