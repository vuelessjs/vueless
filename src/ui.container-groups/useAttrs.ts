import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UGroupsProps, Config } from "./types.ts";

export default function useAttrs(props: UGroupsProps): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}