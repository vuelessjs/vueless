import { computed, type Ref } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UDropdownButtonProps } from "./types.ts";

type Config = Partial<typeof defaultConfig>;

type ActiveState = {
  isShownOptions: Ref<boolean>;
};

export default function useAttrs(
  props: UDropdownButtonProps,
  { isShownOptions }: ActiveState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI<Config>(
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
