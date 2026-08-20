<template>
  <div class="install-container">
    <h2 class="install-title">{{ $t('install.title') }}</h2>
    <p class="install-description">
      {{ instructionText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const instructionText = computed(() => {
  if (typeof window === 'undefined') return t('install.otherInstruction');
  const ua = window.navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isMac = /macintosh|mac os x/.test(ua);
  
  if (isIOS) {
    return t('install.iosInstruction');
  } else if (isMac) {
    return t('install.macInstruction');
  }
  return t('install.otherInstruction');
});
</script>

<style scoped lang="scss">
.install-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.install-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.install-description {
  color: var(--color-fg-muted);
  font-size: 16px;
  line-height: 1.6;
  transition: color 0.3s ease;
}
</style>
