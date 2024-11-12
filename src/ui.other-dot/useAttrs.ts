import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UDotProps } from "./types.ts";

type Config = Partial<typeof defaultConfig>;

export default function useAttrs(props: UDotProps): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
