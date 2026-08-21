<template>
  <div class="scan-qr-container">
    <h2 class="scan-title">{{ $t('components.scanTitle') }}</h2>
    <p class="scan-desc">{{ $t('components.scanDesc') }}</p>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div class="qr-stream-wrapper">
      <QrcodeStream @detect="onDetect" @error="onError" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['close', 'scanned']);
const { t } = useI18n();

const errorMessage = ref('');

const onDetect = (detectedCodes: any[]) => {
  const result = detectedCodes[0];
  if (result && result.rawValue) {
    try {
      const url = new URL(result.rawValue);
      const shareParam = url.searchParams.get('share');
      if (shareParam) {
        window.history.replaceState({}, '', `/?share=${shareParam}`);
        emit('scanned', shareParam);
      } else {
        errorMessage.value = t('components.scanErrorInvalid');
      }
    } catch (e) {
      errorMessage.value = t('components.scanErrorInvalid');
    }
  }
};

const onError = (error: any) => {
  if (error.name === 'NotAllowedError' || error.name === 'NotFoundError') {
    errorMessage.value = t('components.scanErrorCamera');
  } else {
    errorMessage.value = error.message;
  }
};
</script>

<style scoped>
.scan-qr-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.scan-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-fg-primary);
}
.scan-desc {
  color: var(--color-fg-muted);
  font-size: 14px;
}
.error-message {
  padding: 12px 16px;
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #ef4444;
  font-size: 14px;
  text-align: center;
}
.qr-stream-wrapper {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border-primary);
  aspect-ratio: 1;
}
</style>
