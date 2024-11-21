import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { ULoaderProgressProps, Config } from "./types.ts";

type ComponentState = {
  isMobileApp: boolean;
};

export default function useAttrs(
  props: ULoaderProgressProps,
  { isMobileApp }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, getExtendingKeysClasses, hasSlotContent } = useUI<Config>(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = ["stripeMobile"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    stripe: {
      extend: computed(() => [isMobileApp && extendingKeysClasses.linkWithChild.value]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
