import { onMounted, ref, nextTick } from "vue";
import { COLOR_MODE_KEY, DARK_MODE_CLASS } from "../constants.js";
import { ColorMode } from "../types.js";

export function useDarkMode() {
  const isDarkMode = ref(false);

  onMounted(async () => {
    await nextTick(() => {
      const isDarkModeClass = document.documentElement.classList.contains(DARK_MODE_CLASS);
      const cashedDarkMode = localStorage.getItem(COLOR_MODE_KEY) as ColorMode | null;
      const isDarkModeCashed = cashedDarkMode !== null && cashedDarkMode === ColorMode.Dark;

      isDarkMode.value = isDarkModeCashed || isDarkModeClass;

      window.addEventListener("darkModeChange", ((event: CustomEvent) => {
        isDarkMode.value = Boolean(event.detail);
      }) as EventListener);
    });
  });

  return { isDarkMode };
}
