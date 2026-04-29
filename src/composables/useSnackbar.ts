import { ref } from 'vue';

const message = ref('');
const isVisible = ref(false);
let timeout: any = null;

export function useSnackbar() {
  const show = (msg: string, duration = 3000) => {
    message.value = msg;
    isVisible.value = true;

    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      isVisible.value = false;
      setTimeout(() => {
        message.value = '';
      }, 300); // Wait for fade out
    }, duration);
  };

  return {
    message,
    isVisible,
    show
  };
}
