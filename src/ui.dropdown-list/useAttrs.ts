import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

import type { Config, UDropdownListProps } from "./types.ts";
import type { UseAttrs } from "../types.ts";

export default function useAttrs(props: UDropdownListProps): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = ["option"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, [], {
    group: {
      base: computed(() => [extendingKeysClasses.option.value]),
    },
    subGroup: {
      base: computed(() => [extendingKeysClasses.option.value]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
