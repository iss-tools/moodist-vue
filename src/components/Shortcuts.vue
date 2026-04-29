<template>
  <div class="shortcuts-container">
    <h2 class="shortcuts-title">Keyboard Shortcuts</h2>

    <div class="shortcuts-list">
      <div
        v-for="(group, name) in shortcuts"
        :key="name"
        class="shortcut-group"
      >
        <h3 class="shortcut-group-title">{{ name }}</h3>
        <div class="shortcut-items">
          <div
            v-for="shortcut in group"
            :key="shortcut.label"
            class="shortcut-item"
          >
            <span class="shortcut-label">{{ shortcut.label }}</span>
            <div class="shortcut-keys">
              <kbd v-for="key in shortcut.keys" :key="key" class="key-badge">
                {{ key }}
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{}>();

const shortcuts = {
  General: [
    { label: "Toggle Play/Pause", keys: ["Space"] },
    { label: "Open Menu", keys: ["Shift", "M"] },
    { label: "Share Mix", keys: ["Shift", "S"] },
    { label: "Close Modal", keys: ["Esc"] },
  ],
  Tools: [
    { label: "Pomodoro Timer", keys: ["Shift", "P"] },
    { label: "Notepad", keys: ["Shift", "N"] },
    { label: "Todo List", keys: ["Shift", "T"] },
    { label: "Sleep Timer", keys: ["Shift", "Alt", "T"] },
    { label: "Countdown Timer", keys: ["Shift", "C"] },
    { label: "Your Presets", keys: ["Shift", "Alt", "P"] },
  ],
  Relaxation: [
    { label: "Breathing Exercise", keys: ["Shift", "B"] },
    { label: "Shortcuts", keys: ["Shift", "H"] },
  ],
};
</script>

<style scoped lang="scss">
.shortcuts-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.shortcuts-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.shortcuts-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.shortcut-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.shortcut-group-title {
  font-size: 12px;
  font-weight: bold;
  color: var(--color-fg-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.shortcut-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.shortcut-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid var(--color-border-primary);
  transition: border-color 0.3s ease;

  &:last-child {
    border-bottom: none;
  }
}

.shortcut-label {
  font-size: 14px;
  color: var(--color-fg-secondary);
  transition: color 0.3s ease;
}

.shortcut-keys {
  display: flex;
  gap: 4px;
}

.key-badge {
  padding: 4px 8px;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-secondary);
  border-radius: 4px;
  font-size: 10px;
  font-family: monospace;
  color: var(--color-fg-muted);
  min-width: 24px;
  text-align: center;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}
</style>
