import { TodoStore } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (title) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: Date.now().toString(), title, done: false },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      updateTodo: (id, newTitle) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, title: newTitle } : todo
          ),
        })),
    }),
    {
      name: 'todo-storage',
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => AsyncStorage.setItem(key, JSON.stringify(value)),
        removeItem: (key) => AsyncStorage.removeItem(key),
      },
    }
  )
);
