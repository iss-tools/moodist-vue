<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-4 opacity-0"
    >
      <div v-if="isVisible" class="snackbar">
        {{ message }}
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useSnackbar } from "../composables/useSnackbar";

const { message, isVisible } = useSnackbar();
</script>

<style scoped lang="scss">
.snackbar {
  position: fixed;
  bottom: 96px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  padding: 12px 24px;
  background-color: var(--color-fg-primary);
  color: var(--color-bg-primary);
  font-size: 14px;
  font-weight: 500;
  border-radius: 9999px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
  justify-content: center;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}
</style>
