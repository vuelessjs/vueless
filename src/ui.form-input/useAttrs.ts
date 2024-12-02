import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UInputProps, Config } from "./types.ts";

export default function useAttrs(props: UInputProps): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    error: Boolean(props.error),
    label: Boolean(props.label),
  }));

  return {
    config,
    ...getKeysAttrs(mutatedProps),
  };
}
