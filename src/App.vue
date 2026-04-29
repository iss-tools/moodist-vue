<template>
  <div class="app-container">
    <!-- Main App -->
    <div id="app" class="app-main">
      <!-- Header -->
      <header class="header">
        <Container class="header-content">
          <div class="logo-section">
            <div class="logo">
              <div class="logo-inner"></div>
            </div>
            <h1 class="app-title">Moodist-Vue</h1>
          </div>
          <div class="header-actions">
            <!-- Theme Toggle Button -->
            <button
              class="theme-toggle-button"
              @click="themeStore.toggleTheme()"
              :title="
                themeStore.theme === 'dark'
                  ? '切换到浅色模式'
                  : '切换到深色模式'
              "
            >
              <SunIcon v-if="themeStore.theme === 'dark'" class="theme-icon" />
              <MoonIcon v-else class="theme-icon" />
            </button>

            <!-- Global Volume -->
            <div class="volume-control">
              <Volume2Icon class="volume-icon" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                v-model.number="globalVolume"
                class="volume-slider"
              />
            </div>

            <!-- Menu -->
            <Menu
              ref="menuRef"
              :no-selected="noSelected"
              @open-modal="openModal"
              @shuffle="store.shuffle()"
            />
          </div>
        </Container>
      </header>
      <!-- Hero Section -->
      <Hero />
      <CategoryIcons />
      <!-- Main Content -->
      <main class="main-content">
        <Container>
          <CategorySection
            v-for="category in allCategories"
            :key="category.id"
            :category="category"
          />
        </Container>
      </main>

      <FloatingActions />

      <!-- Modals -->
      <Modal :show="!!activeModal" @close="closeModal">
        <Pomodoro v-if="activeModal === 'pomodoro'" />
        <Notepad v-if="activeModal === 'notepad'" />
        <SleepTimer v-if="activeModal === 'sleep-timer'" />
        <Breathing v-if="activeModal === 'breathing'" />
        <Binaural v-if="activeModal === 'binaural'" />
        <Isochronic v-if="activeModal === 'isochronic'" />
        <Lofi v-if="activeModal === 'lofi'" />
        <Share v-if="activeModal === 'share'" />
        <Presets v-if="activeModal === 'presets'" />
        <Todo v-if="activeModal === 'todo'" />
        <Countdown v-if="activeModal === 'countdown'" />
        <Shortcuts v-if="activeModal === 'shortcuts'" />
        <SharedMix v-if="activeModal === 'share'" />
      </Modal>
      <MediaSession />
      <Snackbar />
      <!-- About & Source Sections -->
      <About />
      <Source />
      <!-- Footer -->
      <footer class="footer">
        <Container class="footer-content">
          <p class="footer-text">
            &copy; 2026 Moodist. Built with Vue 3 & Tailwind.
          </p>
        </Container>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Volume2 as Volume2Icon,
  Sun as SunIcon,
  Moon as MoonIcon,
} from "lucide-vue-next";
import { Howler } from "howler";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { sounds } from "./data/sounds";
import { useSoundStore } from "./stores/sound";
import { useThemeStore } from "./stores/theme";
import { useShortcuts } from "./composables/useShortcuts";
import { computed } from "vue";

// Components are auto-imported by unplugin-vue-components

const store = useSoundStore();
const themeStore = useThemeStore();
const { globalVolume, noSelected, getFavorites } = storeToRefs(store);

const allCategories = computed(() => {
  const categories = [];

  // Add favorites category if there are any
  if (getFavorites.value.length > 0) {
    const favoriteSounds = [];
    for (const category of sounds.categories) {
      for (const sound of category.sounds) {
        if (getFavorites.value.includes(sound.id)) {
          favoriteSounds.push(sound);
        }
      }
    }

    // Sort favorite sounds by the order they were added (based on getFavorites order)
    favoriteSounds.sort((a, b) => {
      return (
        getFavorites.value.indexOf(a.id) - getFavorites.value.indexOf(b.id)
      );
    });

    categories.push({
      id: "favorites",
      title: "Favorites",
      icon: "Heart",
      sounds: favoriteSounds,
    });
  }

  return [...categories, ...sounds.categories];
});

const activeModal = ref<string | null>(null);
const showSharedMix = ref(false);

const openModal = (name: string) => {
  activeModal.value = name;
};

const closeModal = () => {
  activeModal.value = null;
};

const menuRef = ref<any>(null);

useShortcuts({
  pomodoro: () => openModal("pomodoro"),
  notepad: () => openModal("notepad"),
  sleepTimer: () => openModal("sleep-timer"),
  breathing: () => openModal("breathing"),
  binaural: () => openModal("binaural"),
  isochronic: () => openModal("isochronic"),
  lofi: () => openModal("lofi"),
  share: () => openModal("share"),
  presets: () => openModal("presets"),
  todo: () => openModal("todo"),
  countdown: () => openModal("countdown"),
  shortcuts: () => openModal("shortcuts"),
  togglePlay: () => store.togglePlay(),
  menu: () => menuRef.value?.toggleMenu(),
});

onMounted(() => {
  // 初始化主题
  themeStore.applyTheme(themeStore.theme);

  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("share")) {
    showSharedMix.value = true;
  }

  // Resume AudioContext on first user interaction if needed
  const handleFirstInteraction = () => {
    if (
      typeof Howler !== "undefined" &&
      (Howler as any).ctx &&
      (Howler as any).ctx.state === "suspended"
    ) {
      (Howler as any).ctx.resume();
    }
    window.removeEventListener("click", handleFirstInteraction);
  };
  window.addEventListener("click", handleFirstInteraction);
});
</script>

<style scoped lang="scss">
.app-container {
  min-height: 100vh;
  background-color: var(--color-bg-primary);
  color: var(--color-fg-primary);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: var(--color-bg-primary);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border-primary);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo {
  width: 32px;
  height: 32px;
  background-color: var(--color-fg-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.logo-inner {
  width: 16px;
  height: 16px;
  background-color: var(--color-bg-primary);
  border-radius: 2px;
  transform: rotate(45deg);
  transition: background-color 0.3s ease;
}

.app-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.theme-toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background-color: var(--color-button-hover);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: var(--color-button-active);
  }

  .theme-icon {
    width: 18px;
    height: 18px;
    color: var(--color-fg-secondary);
    transition: color 0.2s ease;
  }

  &:hover .theme-icon {
    color: var(--color-fg-primary);
  }
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  background-color: var(--color-button-hover);
  border-radius: 9999px;
  border: 1px solid var(--color-border-primary);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    .volume-icon {
      color: var(--color-fg-primary);
    }
  }
}

.volume-icon {
  width: 16px;
  height: 16px;
  color: var(--color-fg-muted);
  transition: color 0.2s ease;
}

.volume-slider {
  width: 80px;
  height: 4px;
  background: var(--color-bg-tertiary);
  border-radius: 4px;
  appearance: none;
  cursor: pointer;
  accent-color: var(--color-fg-primary);
  transition: background-color 0.3s ease;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: var(--color-fg-primary);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
}

.main-content {
  padding: 48px 0;
  padding-bottom: 128px;
}

.footer {
  padding: 48px 0;
  border-top: 1px solid var(--color-border-primary);
  background-color: var(--color-bg-primary);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.footer-content {
  text-align: center;
}

.footer-text {
  color: var(--color-fg-muted);
  font-size: 14px;
  transition: color 0.3s ease;
}
</style>

<style>
@import "./styles/main.scss";

body {
  margin: 0;
  background-color: var(--color-bg-primary);
  color: var(--color-fg-primary);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: var(--color-fg-primary);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

input[type="range"]::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: var(--color-fg-primary);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}
</style>
