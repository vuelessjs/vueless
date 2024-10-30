import { computed, onBeforeUnmount, onMounted, toValue, watch } from "vue";
import { isSSR } from "../utilsTs/utilHelper.ts";

import type { TemplateRefElement } from "../types.ts";

export function useMutationObserver(
  target: TemplateRefElement,
  callback: MutationCallback,
  config = { childList: true, attributes: true, characterData: true },
) {
  if (isSSR) return;

  const observer = new MutationObserver(callback);
  const targetValue = computed(() => toValue(target));

  onMounted(() => {
    if (!targetValue.value) return;

    if (Array.isArray(targetValue.value)) {
      targetValue.value.forEach((element) => {
        observer.observe(element, config);
      });
    } else {
      observer.observe(targetValue.value, config);
    }
  });

  watch(
    targetValue,
    () => {
      if (!targetValue.value) return;

      if (Array.isArray(targetValue.value)) {
        targetValue.value.forEach((element) => {
          observer.observe(element, config);
        });

        return;
      }

      observer.observe(targetValue.value, config);
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
