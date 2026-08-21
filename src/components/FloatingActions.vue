<template>
  <div class="floating-actions">
    <div class="category-dropdown-container" ref="categoryMenuRef">
      <button
        :class="['action-button']"
        @click="toggleCategoryMenu"
        :title="$t('components.categories')"
      >
        <LayoutGridIcon class="icon-svg" />
      </button>

      <div v-if="showCategoryMenu" class="category-menu">
        <button
          v-for="category in categories"
          :key="category.id"
          class="category-icon-btn"
          :title="category.title"
          @click="goto(category.id)"
        >
          <component :is="getIcon(category.icon)" />
        </button>
      </div>
    </div>

    <button
      :class="['play-button', { disabled: noSelected || locked }]"
      @click="handleToggle"
      :disabled="noSelected || locked"
    >
      <span aria-hidden="true" class="icon">
        <PauseIcon v-if="isPlaying" class="icon-svg" />
        <PlayIcon v-else class="icon-svg" />
      </span>
      {{ isPlaying ? $t('common.pause') : $t('common.play') }}
    </button>

    <button
      v-if="!noSelected || hasHistory"
      :class="['action-button', { disabled: locked }]"
      @click="handleUnselectToggle"
      :disabled="locked"
      :title="hasHistory ? $t('floating.restoreSounds') : $t('floating.unselectAll')"
    >
      <UndoIcon v-if="hasHistory" class="icon-svg" />
      <TrashIcon v-else class="icon-svg" />
    </button>

    <button
      :class="['action-button', { disabled: locked }]"
      @click="handleShuffle"
      :disabled="locked"
      :title="$t('floating.shuffleSounds')"
    >
      <ShuffleIcon class="icon-svg" />
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  Undo2 as UndoIcon,
  Trash2 as TrashIcon,
  Shuffle as ShuffleIcon,
  Play,
  Pause,
  LayoutGrid as LayoutGridIcon,
  HelpCircle
} from "lucide-vue-next";
import * as LucideIcons from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { computed, ref, type Component } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useSoundStore } from "../stores/sound";
import { useSnackbar } from "../composables/useSnackbar";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  categories?: any[];
}>();

const PlayIcon = Play;
const PauseIcon = Pause;

const store = useSoundStore();
const { show: showSnackbar } = useSnackbar();
const { noSelected, history, locked, isPlaying } = storeToRefs(store);
const { t } = useI18n();

const hasHistory = computed(() => !!history.value);

const handleToggle = () => {
  if (locked.value) return;
  if (noSelected.value) {
    showSnackbar(t('floating.pleaseSelectSound'));
    return;
  }
  store.togglePlay();
};

const handleUnselectToggle = () => {
  if (locked.value) return;
  if (hasHistory.value) {
    store.restoreHistory();
    showSnackbar(t('floating.soundsRestored'));
  } else if (!noSelected.value) {
    store.unselectAll(true);
    showSnackbar(t('floating.allSoundsUnselected'));
  }
};

const handleShuffle = () => {
  if (locked.value) return;
  store.shuffle();
  showSnackbar(t('floating.soundsShuffled'));
};

const showCategoryMenu = ref(false);
const categoryMenuRef = ref(null);

onClickOutside(categoryMenuRef, () => {
  showCategoryMenu.value = false;
});

const toggleCategoryMenu = () => {
  showCategoryMenu.value = !showCategoryMenu.value;
};

const getIcon = (iconName: any): Component => {
  const icon = (LucideIcons as any)[iconName];
  if (!icon) return HelpCircle;
  return icon as Component;
};

const goto = (id: string) => {
  const category = document.getElementById(`category-${id}`);
  category?.scrollIntoView({ behavior: "smooth" });
  showCategoryMenu.value = false;
};
</script>

<style scoped lang="scss">
.floating-actions {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 10px;
  pointer-events: none;
}

.floating-actions > * {
  pointer-events: auto;
}

.category-dropdown-container {
  position: relative;
  display: flex;
}

.category-menu {
  position: absolute;
  bottom: calc(100% + 15px);
  left: 0;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-secondary);
  border-radius: 16px;
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: max-content;
  box-shadow: var(--shadow-floating);
  z-index: 100;
  transform-origin: bottom left;
  animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.9) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

.category-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  font-size: 20px;
  color: var(--color-fg-secondary);
  cursor: pointer;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border-primary);
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    color: var(--color-fg-primary);
    background: var(--color-bg-secondary);
    transform: translateY(-2px);
  }
}

.play-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 45px;
  font-family: "Fraunces", serif;
  font-size: 16px;
  line-height: 0;
  color: var(--color-bg-primary);
  cursor: pointer;
  background-color: var(--color-fg-primary);
  border: 1px solid var(--color-fg-primary);
  border-radius: 100px;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;

  &:hover:not(.disabled) {
    background-color: var(--color-fg-secondary);
  }

  &:not(.disabled):active {
    transform: scale(0.97);
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .icon {
    font-size: 18px;
    line-height: 0;
    display: flex;
    align-items: center;
  }

  .icon-svg {
    width: 18px;
    height: 18px;
  }

  &:focus-visible {
    outline: 2px solid var(--color-border-accent);
    outline-offset: 2px;
  }
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  font-family: "Fraunces", serif;
  font-size: 16px;
  line-height: 0;
  color: var(--color-fg-primary);
  cursor: pointer;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-secondary);
  border-radius: 100px;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:active:not(.disabled) {
    transform: scale(0.97);
  }

  &:hover:not(.disabled) {
    background-color: var(--color-bg-tertiary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-border-accent);
    outline-offset: 2px;
  }

  .icon-svg {
    width: 18px;
    height: 18px;
  }
}
</style>
