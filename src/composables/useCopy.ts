import { ref } from 'vue';

export function useCopy() {
  const copying = ref(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      copying.value = true;
      setTimeout(() => {
        copying.value = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return {
    copy,
    copying,
  };
}
