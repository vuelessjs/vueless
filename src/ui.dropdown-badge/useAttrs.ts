import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { UDropdownBadgeProps, Config } from "./types.ts";

type ActiveState = {
  isShownOptions: Ref<boolean>;
};

export default function useAttrs(
  props: UDropdownBadgeProps,
  { isShownOptions }: ActiveState,
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
