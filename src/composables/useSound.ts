import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  toValue,
  type MaybeRefOrGetter,
} from "vue";
import { Howl } from "howler";

export function useSound(
  src: string,
  options: {
    loop?: boolean;
    volume?: MaybeRefOrGetter<number>;
    lazy?: boolean;
  } = {},
) {
  const sound = ref<Howl | null>(null);
  const isLoading = ref(false);
  const hasLoaded = ref(false);
  const shouldLoad = !options.lazy;

  // 延迟加载的声音文件，等待手动调用 loadSound()
  const lazySrc = ref<string | null>(null);

  onMounted(() => {
    if (shouldLoad) {
      loadSoundInstance();
    } else {
      lazySrc.value = src;
    }
  });

  const loadSoundInstance = () => {
    const source = lazySrc.value || src;
    isLoading.value = true;
    sound.value = new Howl({
      src: [source],
      loop: options.loop ?? false,
      volume: toValue(options.volume) ?? 0.5,
      onload: () => {
        console.log(`Loaded sound: ${source}`);
        hasLoaded.value = true;
        isLoading.value = false;
        lazySrc.value = null; // 清除延迟源
      },
      onloaderror: (_, error) => {
        console.error(`Error loading sound: ${source}`, error);
        isLoading.value = false;
        lazySrc.value = null; // 清除延迟源
      },
    });
  };

  // 暴露手动加载方法
  const loadSound = () => {
    if (!sound.value && !isLoading.value && !hasLoaded.value) {
      loadSoundInstance();
    }
  };

  onUnmounted(() => {
    if (sound.value) {
      sound.value.unload();
    }
  });

  watch(
    () => toValue(options.volume),
    (newVolume) => {
      if (sound.value && typeof newVolume === "number") {
        sound.value.volume(newVolume);
      }
    },
  );

  watch(
    () => options.loop,
    (newLoop) => {
      if (sound.value) {
        sound.value.loop(newLoop ?? false);
      }
    },
  );

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
    loadSound,
    isLoading,
    hasLoaded,
  };
}
