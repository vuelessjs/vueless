import useUI from "../composablesTs/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UTextProps } from "./types.ts";

type Config = Partial<typeof defaultConfig>;

export default function useAttrs(props: UTextProps): UseAttrs {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}