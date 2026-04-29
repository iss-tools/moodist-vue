import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { v4 as uuid } from 'uuid';

interface Preset {
  id: string;
  label: string;
  sounds: Record<string, number>;
}

export const usePresetStore = defineStore('preset', () => {
  const presets = useLocalStorage<Preset[]>('moodist-presets', []);

  function addPreset(label: string, sounds: Record<string, number>) {
    presets.value = [{ id: uuid(), label, sounds }, ...presets.value];
  }

  function changeName(id: string, newName: string) {
    presets.value = presets.value.map(preset => {
      if (preset.id === id) return { ...preset, label: newName };
      return preset;
    });
  }

  function deletePreset(id: string) {
    presets.value = presets.value.filter(preset => preset.id !== id);
  }

  return {
    presets,
    addPreset,
    changeName,
    deletePreset,
  };
});
