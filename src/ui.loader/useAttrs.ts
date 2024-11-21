import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { ULoaderProps, Config } from "./types.ts";

export default function useAttrs(props: ULoaderProps): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(
    defaultConfig,
    () => props.config,
    "loader",
  );

  const keysAttrs = getKeysAttrs({}, [], {
    ellipse: {
      extend: computed(() => ["vueless-loader-ellipse", `vueless-loader-ellipse-${props.size}`]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
