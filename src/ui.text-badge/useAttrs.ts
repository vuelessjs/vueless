import { computed, useSlots } from "vue";
import useUI from "../composables/useUI.ts";
import { hasSlotContent } from "../utils/helper.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UBadgeProps, Config } from "./types.ts";

export default function useAttrs(props: UBadgeProps): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);
  const slots = useSlots();

  const mutatedProps = computed(() => ({
    tabindex: Boolean(~Number(props.tabindex)),
    leftIcon: Boolean(props.leftIcon) || hasSlotContent(slots["left"]),
    rightIcon: Boolean(props.rightIcon) || hasSlotContent(slots["right"]),
  }));

  return { config, ...getKeysAttrs(mutatedProps) };
}
