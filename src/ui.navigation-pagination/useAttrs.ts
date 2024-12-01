import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

import type { UseAttrs } from "../types.ts";
import type { UPaginationProps, Config } from "./types.ts";

export default function useAttrs(props: UPaginationProps): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return { config, ...keysAttrs };
}
