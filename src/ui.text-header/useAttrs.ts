import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UHeaderProps, Config } from "./types.ts";

export default function useAttrs(props: UHeaderProps): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}