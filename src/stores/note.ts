import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useNoteStore = defineStore('note', () => {
  const note = useLocalStorage('moodist-note', '');
  const history = ref<string | null>(null);

  const words = computed(() => {
    const text = note.value.trim();
    if (text === '') return 0;
    return text.split(/\s+/).length;
  });

  const characters = computed(() => note.value.length);

  function write(text: string) {
    note.value = text;
  }

  function clear() {
    if (note.value !== '') {
      history.value = note.value;
      note.value = '';
    }
  }

  function restore() {
    if (history.value !== null) {
      note.value = history.value;
      history.value = null;
    }
  }

  return {
    note,
    history,
    words,
    characters,
    write,
    clear,
    restore,
  };
});
