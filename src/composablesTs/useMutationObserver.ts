import { onBeforeUnmount, onMounted, toValue, watch } from "vue";
import { isSSR } from "../utils/utilHelper.js";

import type { Ref } from "vue";

export function useMutationObserver(
  target: Ref<HTMLElement | null>,
  callBack: () => void,
  config = { childList: true, attributes: true, characterData: true },
) {
  if (isSSR) return;

  const observer = new MutationObserver(callBack);

  onMounted(() => {
    if (!toValue(target)) return;

    if (Array.isArray(toValue(target))) {
      toValue(target).forEach((element) => {
        observer.observe(element, config);
      });
    } else {
      observer.observe(toValue(target), config);
    }
  });

  watch(
    () => toValue(target),
    () => {
      if (Array.isArray(toValue(target))) {
        toValue(target).forEach((element) => {
          observer.observe(element, config);
        });

        return;
      }

      observer.observe(toValue(target), config);
    },
    {
      deep: true,
    },
  );

  onBeforeUnmount(() => {
    observer.disconnect();
  });

  return { observer };
}
