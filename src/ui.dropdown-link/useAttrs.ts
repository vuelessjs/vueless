import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { Config, UDropdownLinkProps } from "./types.ts";
import type { UseAttrs } from "../types.ts";

interface ComponentState {
  isShownOptions: Ref<boolean>;
}

export default function useAttrs(
  props: UDropdownLinkProps,
  { isShownOptions }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    /* component state, not a props */
    opened: isShownOptions.value,
  }));

  return { config, ...getKeysAttrs(mutatedProps) };
}
