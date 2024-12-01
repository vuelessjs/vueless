import { computed, useSlots } from "vue";
import useUI from "../composables/useUI.ts";
import { hasSlotContent } from "../utils/helper.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { ULinkProps, Config } from "./types.ts";

export default function useAttrs(props: ULinkProps): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config, "link");
  const slots = useSlots();

  const mutatedProps = computed(() => ({
    /* component state, not a props */
    defaultSlot: hasSlotContent(slots["default"]),
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return { config, ...keysAttrs };
}
