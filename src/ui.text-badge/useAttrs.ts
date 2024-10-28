import { computed, useSlots } from "vue";
import useUI from "../composablesTs/useUI";

import defaultConfig from "./config";

import type { UseAttrs } from "../types";
import type { UBadgeProps } from "./types";

export default function useAttrs(props: UBadgeProps) {
  const { config, getKeysAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const slots = useSlots();

  const mutatedProps = computed(() => ({
    tabindex: Boolean(~props.tabindex),
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
