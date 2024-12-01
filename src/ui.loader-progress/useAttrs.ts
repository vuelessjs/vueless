import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { ULoaderProgressProps, Config } from "./types.ts";

export default function useAttrs(props: ULoaderProgressProps): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return { config, ...keysAttrs };
}
