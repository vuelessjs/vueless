import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

import type { UseAttrs } from "../types.ts";
import type { ULoaderOverlayProps, Config } from "./types.ts";

export default function useAttrs(props: ULoaderOverlayProps): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config, "overlay");

  const keysAttrs = getKeysAttrs();

  return { config, ...keysAttrs };
}
