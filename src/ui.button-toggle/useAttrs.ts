import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { Config } from "./types.ts";

export default function useAttrs(): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig);

  return { config, ...getKeysAttrs() };
}
