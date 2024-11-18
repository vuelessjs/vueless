import { onMounted, ref, nextTick } from "vue";
import { DARK_MODE_SELECTOR } from "../constants.js";

export function useDarkMode() {
  const isDarkMode = ref(false);

  onMounted(async () => {
    await nextTick(() => {
      const isDarkModeClass = document.documentElement.classList.contains(DARK_MODE_SELECTOR);
      const isDarkModeCache = !!Number(localStorage.getItem(DARK_MODE_SELECTOR));

      isDarkMode.value = isDarkModeCache || isDarkModeClass;

      window.addEventListener("darkModeChange", ((event: CustomEvent) => {
        isDarkMode.value = Boolean(event.detail);
      }) as EventListener);
    });
  });

  return { isDarkMode };
}
