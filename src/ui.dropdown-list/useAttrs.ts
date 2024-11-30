import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Config, UDropdownListProps } from "./types.ts";
import type { UseAttrs } from "../types.ts";

export default function useAttrs(props: UDropdownListProps): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
