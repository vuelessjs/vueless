import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { Config, UDropdownButtonProps } from "./types.ts";
import type { UseAttrs } from "../types.ts";

interface DropdownButtonState {
  isShownOptions: Ref<boolean>;
}

export default function useAttrs(
  props: UDropdownButtonProps,
  { isShownOptions }: DropdownButtonState,
): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    /* component state, not a props */
    opened: isShownOptions.value,
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return { config, ...keysAttrs };
}
