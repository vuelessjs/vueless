import { ref, watch } from "vue";

import { useLocale } from "./useLocale";

export function useLocaleTm(key: string) {
  const { tm, locale } = useLocale();

  const messages = ref(tm(key));

  watch(locale, () => {
    messages.value = tm(key);
  });

  return { messages };
}
