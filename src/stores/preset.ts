import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { v4 as uuid } from 'uuid';

export interface Preset {
  id: string;
  label: string;
  sounds: Record<string, number>;
  icon?: string;
}

const defaultPresets: Preset[] = [
  { id: 'meditation', label: '冥想', icon: 'Brain', sounds: { 'meditation-zither': 0.8, 'singing-bowl': 0.6, 'river': 0.4 } },
  { id: 'study', label: '学习', icon: 'BookOpen', sounds: { 'study': 0.7, 'piano': 0.6, 'rain-on-window': 0.5 } },
  { id: 'sleep', label: '睡眠', icon: 'Moon', sounds: { 'heavy-rain-2': 0.6, 'campfire': 0.4, 'brown-noise': 0.5 } },
  { id: 'workout', label: '锻炼', icon: 'Dumbbell', sounds: { 'busy-street': 0.7, 'crowd': 0.5 } },
  { id: 'break', label: '休息', icon: 'Coffee', sounds: { 'cafe': 0.6, 'birds': 0.4, 'field': 0.3 } },
  { id: 'airplane', label: '飞机', icon: 'Plane', sounds: { 'airplane': 0.8, 'brown-noise': 0.3 } },
  { id: 'rain', label: '雨天', icon: 'CloudRain', sounds: { 'heavy-rain-2': 0.7, 'rain-on-window': 0.6, 'thunder': 0.4 } },
  { id: 'outdoor', label: '户外', icon: 'TreePine', sounds: { 'forest': 0.7, 'birds': 0.5, 'wind': 0.4 } }
];

export const usePresetStore = defineStore('preset', () => {
  const presets = useLocalStorage<Preset[]>('moodist-presets', []);
  const hasInitializedDefaults = useLocalStorage('moodist-presets-init-v4', false);

  if (!hasInitializedDefaults.value) {
    presets.value = [...defaultPresets, ...presets.value];
    hasInitializedDefaults.value = true;
  }

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
