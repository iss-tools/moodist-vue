<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useSoundStore } from '../stores/sound';
import { storeToRefs } from 'pinia';

const store = useSoundStore();
const { isPlaying } = storeToRefs(store);
const audioRef = ref<HTMLAudioElement | null>(null);

const metadata: MediaMetadataInit = {
  artist: 'Moodist',
  title: 'Ambient Sounds for Focus and Calm',
  artwork: [
    {
      sizes: '200x200',
      src: '/logo-dark.png',
      type: 'image/png',
    },
  ],
};

const updateMediaSession = () => {
  if (!('mediaSession' in navigator)) return;

  if (isPlaying.value) {
    navigator.mediaSession.metadata = new MediaMetadata(metadata);
    navigator.mediaSession.playbackState = 'playing';
    
    navigator.mediaSession.setActionHandler('play', () => store.play());
    navigator.mediaSession.setActionHandler('pause', () => store.pause());
  } else {
    navigator.mediaSession.playbackState = 'paused';
  }
};

const startAudio = async () => {
  if (!audioRef.value) return;
  
  try {
    if (isPlaying.value) {
      await audioRef.value.play();
      updateMediaSession();
    } else {
      audioRef.value.pause();
      updateMediaSession();
    }
  } catch (error) {
    console.error('MediaSession audio error:', error);
  }
};

watch(isPlaying, () => {
  startAudio();
});

onMounted(() => {
  if (isPlaying.value) {
    startAudio();
  }
});

onUnmounted(() => {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', null);
    navigator.mediaSession.setActionHandler('pause', null);
    navigator.mediaSession.playbackState = 'none';
  }
});
</script>

<template>
  <audio
    ref="audioRef"
    src="/sounds/silence.wav"
    loop
    class="hidden"
  />
</template>
