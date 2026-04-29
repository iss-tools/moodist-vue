<template>
  <div class="todo-container">
    <div class="todo-header">
      <h2 class="todo-title">Todo List</h2>
      <span v-if="todos.length > 0" class="todo-count">
        {{ doneCount }} / {{ todos.length }} Done
      </span>
    </div>

    <!-- Add Todo -->
    <form @submit.prevent="handleSubmit" class="todo-form">
      <input
        v-model="newTodo"
        type="text"
        placeholder="What needs to be done?"
        required
        class="todo-input"
      />
      <button type="submit" class="todo-add-button">Add</button>
    </form>

    <div class="todo-divider"></div>

    <!-- Todos List -->
    <div class="todo-list">
      <div v-if="todos.length === 0" class="todo-empty">
        No tasks yet. Enjoy your focused session!
      </div>

      <div v-for="todo in todos" :key="todo.id" class="todo-item">
        <button
          @click="store.toggleTodo(todo.id)"
          :class="['todo-checkbox', { done: todo.done }]"
        >
          <CheckIcon v-if="todo.done" class="w-3 h-3" />
        </button>

        <input
          type="text"
          :value="todo.todo"
          @input="(e) => handleEdit(todo.id, e)"
          class="todo-text todo-input"
          :class="{ completed: todo.done }"
        />

        <button @click="store.deleteTodo(todo.id)" class="todo-delete-button">
          <TrashIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { Check as CheckIcon, Trash2 as TrashIcon } from "lucide-vue-next";
import { useTodoStore } from "../stores/todo";

defineProps<{}>();

const store = useTodoStore();
const { todos, doneCount } = storeToRefs(store);

const newTodo = ref("");

const handleEdit = (id: string, e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  store.editTodo(id, val);
};

const handleSubmit = () => {
  if (!newTodo.value.trim()) return;
  store.addTodo(newTodo.value.trim());
  newTodo.value = "";
};
</script>

<style scoped lang="scss">
.todo-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.todo-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todo-title {
  font-size: 24px;
  font-weight: bold;
  color: var(--color-fg-primary);
  transition: color 0.3s ease;
}

.todo-count {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-fg-muted);
  background-color: var(--color-bg-secondary);
  padding: 4px 8px;
  border-radius: 9999px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.todo-form {
  display: flex;
  gap: 8px;
}

.todo-input {
  flex: 1;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--color-fg-primary);
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

.todo-add-button {
  background-color: var(--color-fg-primary);
  color: var(--color-bg-primary);
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background-color: var(--color-fg-secondary);
  }
}

.todo-divider {
  height: 1px;
  background-color: var(--color-border-primary);
  transition: background-color 0.3s ease;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
}

.todo-empty {
  color: var(--color-fg-muted);
  text-align: center;
  padding: 32px;
  transition: color 0.3s ease;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--color-bg-secondary);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--color-border-primary);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid var(--color-border-accent);
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover:not(.done) {
    border-color: var(--color-fg-muted);
  }

  &.done {
    background-color: var(--color-fg-primary);
    border-color: var(--color-fg-primary);
    color: var(--color-bg-primary);
  }
}

.todo-text {
  flex: 1;
  background-color: transparent;
  color: var(--color-fg-primary);
  outline: none;
  transition:
    opacity 0.2s ease,
    color 0.3s ease;

  &.completed {
    opacity: 0.4;
    text-decoration: line-through;
  }
}

.todo-delete-button {
  padding: 8px;
  color: var(--color-fg-muted);
  background-color: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 0.2s ease,
    color 0.2s ease,
    background-color 0.2s ease;

  .todo-item:hover & {
    opacity: 1;
  }

  &:hover {
    color: var(--color-error);
    background-color: rgba(239, 68, 68, 0.1);
  }
}
</style>
