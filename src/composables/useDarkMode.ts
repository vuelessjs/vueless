import { onMounted, ref, nextTick } from "vue";
import { DARK_MODE_SELECTOR } from "../constants.js";

export function useDarkMode() {
  const isDarkMode = ref(false);

  onMounted(async () => {
    await nextTick(() => {
      isDarkMode.value = document.documentElement.classList.contains(DARK_MODE_SELECTOR);

      window.addEventListener("darkModeChange", ((event: CustomEvent) => {
        isDarkMode.value = Boolean(event.detail);
      }) as EventListener);
    });
  });

  return { isDarkMode };
}
