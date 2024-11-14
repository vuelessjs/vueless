import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

import type { UseAttrs } from "../types.ts";
import type { UDividerProps, Config } from "./types.ts";

export default function useAttrs(props: UDividerProps): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    label: Boolean(props.label),
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
