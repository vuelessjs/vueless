import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { Config, UDropdownButtonProps } from "./types.ts";
import type { UseAttrs } from "src/types.ts";

interface DropdownButtonState {
  isShownOptions: Ref<boolean>;
}

export default function useAttrs(
  props: UDropdownButtonProps,
  { isShownOptions }: DropdownButtonState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = ["dropdownButtonActive"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    dropdownButton: {
      extend: computed(() => [
        isShownOptions.value && extendingKeysClasses.dropdownButtonActive.value,
      ]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
