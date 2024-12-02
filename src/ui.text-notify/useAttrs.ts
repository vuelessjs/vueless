import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { UNotifyProps, Config } from "./types.ts";

type ComponentState = {
  notifications: Ref<{ type: string }[]>;
};

export default function useAttrs(
  props: UNotifyProps,
  { notifications }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs } = useUI<Config>(
    defaultConfig,
    () => props.config,
  );


  return { config, ...getKeysAttrs() };
}
