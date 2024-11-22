import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { UCheckboxProps, Config } from "./types.ts";

type ComponentState = {
  checkboxColor: Ref<string>;
  checkboxSize: Ref<string>;
};

export default function useAttrs(
  props: UCheckboxProps,
  { checkboxColor, checkboxSize }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    color: checkboxColor.value,
    size: checkboxSize.value,
    label: Boolean(props.label),
    error: Boolean(props.error),
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
