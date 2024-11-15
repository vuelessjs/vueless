import { nextTick } from "process";
import { DARK_MODE_SELECTOR } from "../constants.js";
import { onMounted, ref } from "vue";

export function useDarkMode() {
  const isDarkMode = ref(false);

  onMounted(() => {
    nextTick(() => {
      const isDarkModeClass = document.documentElement.classList.contains(DARK_MODE_SELECTOR);
      const isDarkModeCache = Boolean(localStorage.getItem(DARK_MODE_SELECTOR));

      isDarkMode.value = isDarkModeCache || isDarkModeClass;

      window.addEventListener("darkModeChange", ((event: CustomEvent) => {
        isDarkMode.value = Boolean(event.detail);
      }) as EventListener);
    });
  });

  return { isDarkMode };
}
