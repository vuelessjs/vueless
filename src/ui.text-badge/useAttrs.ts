import { computed, useSlots } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UBadgeProps } from "./types.ts";

type Config = Partial<typeof defaultConfig>;

export default function useAttrs(props: UBadgeProps) {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(defaultConfig, () => props.config);
  const slots = useSlots();

  const mutatedProps = computed(() => ({
    tabindex: Boolean(~Number(props.tabindex)),
    leftIcon: Boolean(props.leftIcon) || hasSlotContent(slots["left"]),
    rightIcon: Boolean(props.rightIcon) || hasSlotContent(slots["right"]),
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  } as UseAttrs;
}
