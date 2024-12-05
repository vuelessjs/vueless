import { computed, useSlots } from "vue";
import useUI from "../composables/useUI.ts";
import { hasSlotContent } from "../utils/helper.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { Config } from "./types.ts";

export default function useAttrs(): UseAttrs<Config> {
  const mutatedProps = computed(() => ({
    /* component state, not a props */
    defaultSlot: hasSlotContent(slots["default"]),
  }));

  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, mutatedProps, "link");
  const slots = useSlots();

  return { config, ...getKeysAttrs(mutatedProps) };
}
