import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UMoneyProps, Config } from "./types.ts";

export function useAttrs(props: UMoneyProps): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return { config, ...keysAttrs };
}
