<template>
  <div class="lofi-container">
    <h2 class="lofi-title">Lofi Music Player</h2>

    <div v-if="!isAccepted" class="lofi-notice">
      <p class="lofi-notice-text">
        This feature plays music using embedded YouTube videos. By continuing,
        you agree to connect to YouTube, which may collect data in accordance
        with their privacy policy. We do not control or track this data.
      </p>

      <div class="lofi-notice-buttons">
        <button @click="$emit('close')" class="cancel-button">Cancel</button>
        <button @click="isAccepted = true" class="continue-button">
          Continue
        </button>
      </div>
    </div>

    <div v-else class="lofi-videos">
      <div v-for="(video, index) in videos" :key="video.id" class="video-item">
        <h3 class="video-title">
          <span class="video-index">{{
            (index + 1).toString().padStart(2, "0")
          }}</span>
          <strong class="video-channel">{{ video.channel }}</strong>
          <span class="video-separator">/</span>
          {{ video.title }}
        </h3>
        <div class="video-wrapper">
          <iframe
            :src="`https://www.youtube.com/embed/${video.id}?autoplay=0&controls=1&rel=0&modestbranding=1`"
            class="video-iframe"
            frameborder="0"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
            "
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{}>();

const isAccepted = ref(false);

const videos = [
  {
    channel: "Lofi Girl",
    id: "jfKfPfyJRdk",
    title: "lofi hip hop radio",
  },
  {
    channel: "Lofi Girl",
    id: "4xDzrJKXOOY",
    title: "synthwave radio",
  },
  {
    channel: "Lofi Girl",
    id: "P6Segk8cr-c",
    title: "sad lofi radio",
  },
  {
    channel: "Lofi Girl",
    id: "S_MOd40zlYU",
    title: "dark ambient radio",
  },
  {
    channel: "Lofi Girl",
    id: "TtkFsfOP9QI",
    title: "peaceful piano radio",
  },
];
</script>

<style scoped lang="scss">
.lofi-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.lofi-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.lofi-notice {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lofi-notice-text {
  color: var(--color-fg-muted);
  font-size: 14px;
  line-height: 1.5;
  transition: color 0.3s ease;
}

.lofi-notice-buttons {
  display: flex;
  gap: 12px;
}

.cancel-button {
  flex: 1;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: var(--color-bg-secondary);
  color: var(--color-fg-primary);
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-bg-tertiary);
  }
}

.continue-button {
  flex: 1;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: var(--color-fg-primary);
  color: var(--color-bg-primary);
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-fg-secondary);
  }
}

.lofi-videos {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-border-accent);
    border-radius: 10px;
    opacity: 0.3;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-fg-muted);
  }
}

.video-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.video-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-fg-muted);
  transition: color 0.3s ease;
}

.video-index {
  color: var(--color-fg-muted);
  margin-right: 8px;
  opacity: 0.5;
}

.video-channel {
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.video-separator {
  margin: 0 8px;
  color: var(--color-fg-muted);
  opacity: 0.3;
}

.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.video-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
