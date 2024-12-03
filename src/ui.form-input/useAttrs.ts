import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { ComputedRef } from "vue";
import type { UseAttrs } from "../types.ts";
import type { UInputProps, Config } from "./types.ts";

type ComponentState = {
  applyPasswordClasses: ComputedRef<boolean>;
};

export default function useAttrs(
  props: UInputProps,
  { applyPasswordClasses }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    error: Boolean(props.error),
    label: Boolean(props.label),
    /* component state, not a props */
    typePassword: applyPasswordClasses.value,
  }));

  return {
    config,
    ...getKeysAttrs(mutatedProps),
  };
}
