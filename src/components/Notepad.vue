<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Trash2, Copy, Download, Undo, Check } from "lucide-vue-next";
import { useNoteStore } from "../stores/note";
import { useCopy } from "../composables/useCopy";
import { download } from "../helpers/download";

const props = defineProps<{}>();

const emit = defineEmits(["close"]);

const store = useNoteStore();
const { copy, copying } = useCopy();
const textareaRef = ref<HTMLTextAreaElement | null>(null);

onMounted(() => {
  if (textareaRef.value) {
    textareaRef.value.focus();
  }
});

const handleDownload = () => {
  download("Moodit Note.txt", store.note);
};

const handleClearOrRestore = () => {
  if (store.history) {
    store.restore();
  } else {
    store.clear();
  }
};

const close = () => {
  emit("close");
};
</script>

<template>
  <div class="notepad-container">
    <header class="notepad-header">
      <h2 class="notepad-title">Your Note</h2>
      <div class="notepad-actions">
        <button
          @click="copy(store.note)"
          class="action-button"
          title="Copy Note"
        >
          <Check v-if="copying" class="w-5 h-5 success-icon" />
          <Copy v-else class="w-5 h-5" />
        </button>
        <button
          @click="handleDownload"
          class="action-button"
          title="Download Note"
        >
          <Download class="w-5 h-5" />
        </button>
        <button
          @click="handleClearOrRestore"
          class="action-button"
          :title="store.history ? 'Restore Note' : 'Clear Note'"
        >
          <Undo v-if="store.history" class="w-5 h-5" />
          <Trash2 v-else class="w-5 h-5" />
        </button>
      </div>
    </header>

    <textarea
      ref="textareaRef"
      v-model="store.note"
      class="notepad-textarea"
      placeholder="What is on your mind?"
      spellcheck="false"
      dir="auto"
    ></textarea>

    <footer class="notepad-footer">
      {{ store.characters }} character{{ store.characters !== 1 ? "s" : "" }} •
      {{ store.words }} word{{ store.words !== 1 ? "s" : "" }}
    </footer>
  </div>
</template>

<style scoped lang="scss">
.notepad-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notepad-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notepad-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.notepad-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-button {
  padding: 8px;
  border-radius: 8px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-fg-muted);
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-button-hover);
    color: var(--color-fg-secondary);
  }

  .success-icon {
    color: var(--color-success);
  }
}

.notepad-textarea {
  width: 100%;
  height: 400px;
  padding: 16px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: 12px;
  color: var(--color-fg-secondary);
  font-family: inherit;
  resize: none;
  outline: none;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;

  &:focus {
    border-color: var(--color-border-accent);
  }

  &::placeholder {
    color: var(--color-fg-muted);
  }
}

.notepad-footer {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-fg-muted);
  transition: color 0.3s ease;
}
</style>
