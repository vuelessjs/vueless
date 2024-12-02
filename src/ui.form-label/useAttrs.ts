import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { ULabelProps, Config } from "./types.ts";

export default function useAttrs(props: ULabelProps): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    error: Boolean(props.error),
  }));

  return {
    config,
    ...getKeysAttrs(mutatedProps),
  };
}
