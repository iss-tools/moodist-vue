<script setup lang="ts">
import { X as CloseIcon } from "lucide-vue-next";
import { onMounted, onUnmounted, watch } from "vue";

const props = defineProps<{
  show: boolean;
  wide?: boolean;
}>();

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  },
);

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.show) {
    close();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.style.overflowY = "auto";
});
</script>

<template>
  <Teleport to="body">
    <Transition
      v-if="show"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div class="modal-overlay">
        <div class="modal">
          <div :class="['modal-content', { wide }]">
            <!-- Close Button -->
            <button @click="close" class="close-button">
              <CloseIcon class="w-4 h-4" />
            </button>

            <div class="modal-body">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: var(--color-modal-overlay);
  backdrop-filter: blur(5px);
  transition: background-color 0.3s ease;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 50;
  width: 100%;
  max-height: 100%;
  padding: 50px 0;
  overflow-y: auto;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  padding-top: 40px;
  margin: 0 auto;
  pointer-events: auto;
  background-color: var(--color-modal-bg);
  border-radius: 8px;
  border: 1px solid var(--color-border-primary);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &.wide {
    max-width: 800px;
  }
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 8px;
  border-radius: 8px;
  background-color: var(--color-button-hover);
  border: 1px solid var(--color-border-primary);
  cursor: pointer;
  color: var(--color-fg-muted);
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: var(--color-button-active);
    color: var(--color-fg-primary);
  }
}

.modal-body {
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}
</style>
