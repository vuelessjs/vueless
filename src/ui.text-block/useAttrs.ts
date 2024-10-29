import useUI from "../composablesTs/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UTextProps } from "./types.ts";

export default function useAttrs(props: UTextProps) {
  const { config, getKeysAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  } as UseAttrs;
}
