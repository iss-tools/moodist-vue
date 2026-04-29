<script setup lang="ts">
import { ref } from "vue";
import {
  Menu as MenuIcon,
  X as CloseIcon,
  Shuffle,
  Share2,
  Heart,
  Coffee,
  Timer,
  FileText,
  Keyboard,
  Moon,
  Wind,
  Waves,
  Zap,
  Music,
  ListMusic,
  CheckSquare,
} from "lucide-vue-next";

const props = defineProps<{
  noSelected: boolean;
}>();

const emit = defineEmits(["open-modal", "shuffle"]);

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleAction = (action: string) => {
  if (action === "shuffle") {
    emit("shuffle");
  } else {
    emit("open-modal", action);
  }
  isOpen.value = false;
};

defineExpose({
  toggleMenu,
});
</script>

<template>
  <div class="relative">
    <button
      @click="toggleMenu"
      class="menu-toggle-button"
      :class="{ active: isOpen }"
    >
      <CloseIcon v-if="isOpen" class="w-6 h-6" />
      <MenuIcon v-else class="w-6 h-6" />
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-64 rounded-xl shadow-2xl py-2 z-50 menu-dropdown"
      >
        <div class="menu-section-title">Productivity</div>
        <button @click="handleAction('pomodoro')" class="menu-item">
          <Timer class="w-4 h-4" />
          Pomodoro Timer
          <span class="menu-shortcut">Shift + P</span>
        </button>
        <button @click="handleAction('notepad')" class="menu-item">
          <FileText class="w-4 h-4" />
          Notepad
          <span class="menu-shortcut">Shift + N</span>
        </button>
        <button @click="handleAction('todo')" class="menu-item">
          <CheckSquare class="w-4 h-4" />
          Todo List
          <span class="menu-shortcut">Shift + T</span>
        </button>
        <button @click="handleAction('countdown')" class="menu-item">
          <Timer class="w-4 h-4" />
          Countdown Timer
          <span class="menu-shortcut">Shift + C</span>
        </button>

        <div class="menu-divider"></div>

        <div class="menu-section-title">Relaxation</div>
        <button @click="handleAction('breathing')" class="menu-item">
          <Wind class="w-4 h-4" />
          Breathing Exercise
          <span class="menu-shortcut">Shift + B</span>
        </button>
        <button @click="handleAction('binaural')" class="menu-item">
          <Waves class="w-4 h-4" />
          Binaural Beats
        </button>
        <button @click="handleAction('isochronic')" class="menu-item">
          <Zap class="w-4 h-4" />
          Isochronic Tones
        </button>
        <button @click="handleAction('lofi')" class="menu-item">
          <Music class="w-4 h-4" />
          Lofi Music
        </button>
        <button @click="handleAction('sleep-timer')" class="menu-item">
          <Moon class="w-4 h-4" />
          Sleep Timer
          <span class="menu-shortcut">Shift + S</span>
        </button>
        <button @click="handleAction('presets')" class="menu-item">
          <ListMusic class="w-4 h-4" />
          Your Presets
          <span class="menu-shortcut">Shift + Alt + P</span>
        </button>

        <div class="menu-divider"></div>

        <button @click="handleAction('shuffle')" class="menu-item">
          <Shuffle class="w-4 h-4" />
          Shuffle Sounds
        </button>
        <button @click="handleAction('shortcuts')" class="menu-item">
          <Keyboard class="w-4 h-4" />
          Shortcuts
          <span class="menu-shortcut">Shift + H</span>
        </button>
        <button
          :disabled="noSelected"
          @click="handleAction('share')"
          class="menu-item disabled"
          :class="{ 'opacity-30 cursor-not-allowed': noSelected }"
        >
          <Share2 class="w-4 h-4" />
          Share Mix
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.menu-toggle-button {
  padding: 8px;
  border-radius: 8px;
  background-color: var(--color-button-hover);
  border: 1px solid var(--color-border-primary);
  cursor: pointer;
  color: var(--color-fg-secondary);
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: var(--color-button-active);
  }

  &.active {
    background-color: var(--color-button-active);
  }
}

.menu-dropdown {
  background-color: var(--color-modal-bg);
  border: 1px solid var(--color-border-primary);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.menu-section-title {
  padding: 8px 16px;
  font-size: 12px;
  font-weight: bold;
  color: var(--color-fg-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  font-size: 14px;
  color: var(--color-fg-secondary);
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover:not(.disabled) {
    background-color: var(--color-button-hover);
    color: var(--color-fg-primary);
  }

  .menu-shortcut {
    margin-left: auto;
    font-size: 10px;
    color: var(--color-fg-muted);
    font-family: monospace;
    transition: color 0.3s ease;
  }
}

.menu-divider {
  height: 1px;
  background-color: var(--color-border-primary);
  margin: 8px 0;
  transition: background-color 0.3s ease;
}
</style>
