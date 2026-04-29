<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  tight?: boolean;
}>();

const containerClass = computed(() => {
  return props.tight ? "max-w-4xl mx-auto px-4" : "max-w-4xl mx-auto px-4 py-8";
});
</script>
