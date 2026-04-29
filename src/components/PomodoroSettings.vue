<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  show: boolean;
  times: Record<string, number>;
}>();

const emit = defineEmits(["close", "save"]);

const values = ref<Record<string, number | string>>({});

watch(
  () => props.show,
  (show) => {
    if (show) {
      values.value = { ...props.times };
    }
  },
  { immediate: true },
);

const handleSubmit = () => {
  const newTimes: Record<string, number> = {};
  Object.keys(values.value).forEach((key) => {
    const val = values.value[key];
    newTimes[key] = typeof val === "number" ? val : props.times[key];
  });
  emit("save", newTimes);
};

const handleInput = (key: string, e: Event) => {
  const target = e.target as HTMLInputElement;
  values.value[key] = target.value === "" ? "" : Number(target.value) * 60;
};

const handleCancel = () => {
  emit("close");
};
</script>

<template>
  <Modal :show="show" @close="handleCancel">
    <div class="space-y-6">
      <h2 class="text-xl font-bold" style="color: var(--color-fg-primary)">
        Change Times
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-for="(val, key) in values" :key="key" class="space-y-2">
          <label
            class="text-sm font-medium capitalize"
            style="color: var(--color-fg-secondary)"
          >
            {{
              key === "pomodoro"
                ? "Pomodoro"
                : key === "short"
                  ? "Short Break"
                  : "Long Break"
            }}
            <span style="color: var(--color-fg-muted)">(minutes)</span>
          </label>
          <input
            type="number"
            :value="typeof val === 'number' ? val / 60 : ''"
            @input="(e) => handleInput(String(key), e)"
            min="1"
            max="120"
            required
            class="w-full px-3 py-2 rounded-lg outline-none transition-all"
            style="
              background-color: var(--color-bg-secondary);
              border: 1px solid var(--color-border-primary);
              color: var(--color-fg-primary);
            "
          />
        </div>

        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="handleCancel"
            class="flex-1 py-2 px-4 rounded-lg font-medium transition-colors cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 py-2 px-4 rounded-lg font-bold transition-colors shadow-lg"
            style="
              background-color: var(--color-bg-inverse);
              color: var(--color-fg-inverse);
            "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </Modal>
</template>

<style scoped>
button[type="button"]:hover {
  background-color: var(--color-bg-hover) !important;
}

button[type="submit"]:hover {
  opacity: 0.9;
}

.cancel-button:hover {
  background-color: var(--color-bg-hover);
}

input:focus {
  border-color: var(--color-border-focus) !important;
  box-shadow: 0 0 0 2px var(--color-focus-ring);
}
</style>
