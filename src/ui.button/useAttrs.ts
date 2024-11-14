import { useSlots, computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UButtonProps, Config } from "./types.ts";

export default function useAttrs(props: UButtonProps): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(defaultConfig, () => props.config);
  const slots = useSlots();

  const mutatedProps = computed(() => ({
    leftIcon: Boolean(props.leftIcon) || hasSlotContent(slots["left"]),
    rightIcon: Boolean(props.rightIcon) || hasSlotContent(slots["right"]),
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
