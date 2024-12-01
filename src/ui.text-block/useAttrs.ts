import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UTextProps, Config } from "./types.ts";

export default function useAttrs(props: UTextProps): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return { config, ...keysAttrs };
}
