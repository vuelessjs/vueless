import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UColorPickerProps, Config } from "./types.ts";

export default function useAttrs(props: UColorPickerProps): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);

  return {
    config,
    ...getKeysAttrs(),
  };
}