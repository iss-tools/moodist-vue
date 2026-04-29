import { ref, onMounted, onUnmounted, watch, toValue, type MaybeRefOrGetter } from 'vue';
import { Howl } from 'howler';

export function useSound(src: string, options: { loop?: boolean; volume?: MaybeRefOrGetter<number> } = {}) {
  const sound = ref<Howl | null>(null);
  const isLoading = ref(false);
  const hasLoaded = ref(false);

  onMounted(() => {
    sound.value = new Howl({
      src: [src],
      loop: options.loop ?? false,
      volume: toValue(options.volume) ?? 0.5,
      onload: () => {
        console.log(`Loaded sound: ${src}`);
        hasLoaded.value = true;
        isLoading.value = false;
      },
      onloaderror: (_, error) => {
        console.error(`Error loading sound: ${src}`, error);
        isLoading.value = false;
      },
    });
  });

  onUnmounted(() => {
    if (sound.value) {
      sound.value.unload();
    }
  });

  watch(() => toValue(options.volume), (newVolume) => {
    if (sound.value && typeof newVolume === 'number') {
      sound.value.volume(newVolume);
    }
  });

  watch(() => options.loop, (newLoop) => {
    if (sound.value) {
      sound.value.loop(newLoop ?? false);
    }
  });

  const play = () => {
    if (!sound.value) return;
    if (!hasLoaded.value && !isLoading.value) {
      isLoading.value = true;
      sound.value.load();
    }
    if (!sound.value.playing()) {
      sound.value.play();
    }
  };

  const stop = () => {
    sound.value?.stop();
  };

  const pause = () => {
    sound.value?.pause();
  };

  const fadeOut = (duration: number) => {
    if (sound.value) {
      sound.value.fade(sound.value.volume(), 0, duration);
      setTimeout(() => {
        pause();
      }, duration);
    }
  };

  return {
    play,
    stop,
    pause,
    fadeOut,
    isLoading,
    hasLoaded,
  };
}
