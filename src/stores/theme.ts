import { defineStore } from "pinia";
import { ref, watch } from "vue";

export type ThemeMode = "light" | "dark";

export const useThemeStore = defineStore("theme", () => {
  // 从 localStorage 读取主题，默认跟随系统
  const getInitialTheme = (): ThemeMode => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    // 默认使用 dark 模式
    return "dark";
  };

  const theme = ref<ThemeMode>(getInitialTheme());

  // 应用主题到 DOM
  const applyTheme = (newTheme: ThemeMode) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 切换主题
  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  };

  // 设置特定主题
  const setTheme = (newTheme: ThemeMode) => {
    theme.value = newTheme;
  };

  // 监听主题变化并应用
  watch(
    theme,
    (newTheme) => {
      applyTheme(newTheme);
    },
    { immediate: true },
  );

  // 监听系统主题变化
  const listenSystemTheme = () => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // 只有当用户没有手动设置主题时才跟随系统
      if (!localStorage.getItem("theme")) {
        theme.value = e.matches ? "dark" : "light";
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  };

  return {
    theme,
    toggleTheme,
    setTheme,
    applyTheme,
    listenSystemTheme,
  };
});
