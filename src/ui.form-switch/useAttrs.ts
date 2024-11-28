import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { USwitchProps, Config } from "./types.ts";

type ComponentState = {
  checked: Ref<boolean>;
};

export default function useAttrs(
  props: USwitchProps,
  { checked }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    checked: Boolean(checked.value),
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
