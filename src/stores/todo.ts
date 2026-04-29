import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { v4 as uuid } from 'uuid';

interface Todo {
  id: string;
  todo: string;
  done: boolean;
  createdAt: number;
}

export const useTodoStore = defineStore('todo', () => {
  const todos = useLocalStorage<Todo[]>('moodist-todos', []);

  const doneCount = computed(() => todos.value.filter(t => t.done).length);

  function addTodo(todo: string) {
    todos.value = [
      {
        id: uuid(),
        todo,
        done: false,
        createdAt: Date.now(),
      },
      ...todos.value,
    ];
  }

  function deleteTodo(id: string) {
    todos.value = todos.value.filter(t => t.id !== id);
  }

  function toggleTodo(id: string) {
    todos.value = todos.value.map(t => {
      if (t.id === id) return { ...t, done: !t.done };
      return t;
    });
  }

  function editTodo(id: string, newTodo: string) {
    todos.value = todos.value.map(t => {
      if (t.id === id) return { ...t, todo: newTodo };
      return t;
    });
  }

  return {
    todos,
    doneCount,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  };
});
