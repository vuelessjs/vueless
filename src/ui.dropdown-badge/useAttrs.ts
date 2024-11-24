import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { Config, UDropdownBadgeProps } from "./types.ts";
import type { UseAttrs } from "../types.ts";

interface DropdownBadgeState {
  isShownOptions: Ref<boolean>;
}

export default function useAttrs(
  props: UDropdownBadgeProps,
  { isShownOptions }: DropdownBadgeState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = ["dropdownBadgeActive"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    dropdownBadge: {
      extend: computed(() => [
        isShownOptions.value && extendingKeysClasses.dropdownBadgeActive.value,
      ]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
