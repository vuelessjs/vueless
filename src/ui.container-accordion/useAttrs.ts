import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { UAccordionProps, Config } from "./types.ts";

type ComponentState = {
  isOpened: Ref<boolean>;
};

export default function useAttrs(
  props: UAccordionProps,
  { isOpened }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    /* component state, not a props */
    opened: isOpened.value,
  }));

  return { config, ...getKeysAttrs(mutatedProps) };
}
