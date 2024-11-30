import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UPageProps, Config } from "./types.ts";

export default function useAttrs(props: UPageProps): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(
    defaultConfig,
    () => props.config,
    "wrapper",
  );

  const keysAttrs = getKeysAttrs();

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
