import useUI from "../composablesTs/useUI";

import defaultConfig from "./config";
import type { UTextProps } from "./types";
import type { VuelessAttrs } from "../types";

export default function useAttrs(props: UTextProps) {
  const { config, getKeysAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  } as VuelessAttrs;
}
