import useUI from "../composablesTs/useUI";

import defaultConfig from "./config";
import type { UTextProps } from "./types";

export default function useAttrs(props: UTextProps) {
  const { config, getKeysAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const keysAttrs: any = getKeysAttrs();

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
