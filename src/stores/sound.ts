import { defineStore } from "pinia";
import { sounds } from "@/data/sounds";
import { useLocalStorage } from "@vueuse/core";

export const useSoundStore = defineStore("sound", () => {
  const globalVolume = useLocalStorage("moodist-global-volume", 1);
  const isPlaying = ref(false);
  const locked = ref(false);

  // Use localStorage for persistence of sound selection and volume
  const soundsState = useLocalStorage("moodist-sounds-state", () => {
    const initial: Record<
      string,
      { isFavorite: boolean; isSelected: boolean; volume: number }
    > = {};
    sounds.categories.forEach((category) => {
      category.sounds.forEach((sound) => {
        initial[sound.id] = {
          isFavorite: false,
          isSelected: false,
          volume: 0.5,
        };
      });
    });
    return initial;
  });

  const history = ref<Record<string, any> | null>(null);

  const getFavorites = computed(() => {
    return Object.keys(soundsState.value).filter(
      (id) => soundsState.value[id].isFavorite,
    );
  });

  const noSelected = computed(() => {
    return Object.values(soundsState.value).every((s) => !s.isSelected);
  });

  function select(id: string) {
    if (soundsState.value[id]) {
      soundsState.value[id].isSelected = true;
      history.value = null;
    }
  }

  function unselect(id: string) {
    if (soundsState.value[id]) {
      soundsState.value[id].isSelected = false;
    }
  }

  function unselectAll(pushToHistory = false) {
    if (noSelected.value) return;

    if (pushToHistory) {
      history.value = JSON.parse(JSON.stringify(soundsState.value));
    }

    Object.keys(soundsState.value).forEach((id) => {
      soundsState.value[id].isSelected = false;
      soundsState.value[id].volume = 0.5;
    });
  }

  function restoreHistory() {
    if (history.value) {
      soundsState.value = { ...history.value };
      history.value = null;
    }
  }

  function togglePlay() {
    isPlaying.value = !isPlaying.value;
  }

  function play() {
    isPlaying.value = true;
  }

  function pause() {
    isPlaying.value = false;
  }

  function setVolume(id: string, volume: number) {
    if (soundsState.value[id]) {
      soundsState.value[id].volume = volume;
    }
  }

  function setGlobalVolume(volume: number) {
    globalVolume.value = volume;
  }

  function toggleFavorite(id: string) {
    if (soundsState.value[id]) {
      soundsState.value[id].isFavorite = !soundsState.value[id].isFavorite;
    }
  }

  function shuffle() {
    unselectAll();
    const ids = Object.keys(soundsState.value);
    const randomCount = 4;
    const shuffled = [...ids].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, randomCount);

    selected.forEach((id) => {
      soundsState.value[id].isSelected = true;
      soundsState.value[id].volume = Math.random() * 0.8 + 0.2;
    });

    isPlaying.value = true;
  }

  function override(sounds: Record<string, number>) {
    unselectAll();
    Object.keys(sounds).forEach((id) => {
      if (soundsState.value[id]) {
        soundsState.value[id].isSelected = true;
        soundsState.value[id].volume = sounds[id];
      }
    });
  }

  return {
    globalVolume,
    isPlaying,
    locked,
    sounds: soundsState,
    history,
    getFavorites,
    noSelected,
    select,
    unselect,
    unselectAll,
    restoreHistory,
    togglePlay,
    play,
    pause,
    setVolume,
    setGlobalVolume,
    toggleFavorite,
    shuffle,
    override,
  };
});
