import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

import type { UseAttrs } from "../types.ts";
import type { UCalendarProps, Config } from "./types.ts";

export default function useAttrs(props: UCalendarProps<unknown>): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  return { config, ...keysAttrs };
}
