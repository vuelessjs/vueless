import { computed, type Ref } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

import type { Config, UDropdownLinkProps } from "./types.ts";
import type { UseAttrs } from "../types.ts";

interface DropdownLinkState {
  isShownOptions: Ref<boolean>;
}

export default function useAttrs(
  props: UDropdownLinkProps,
  { isShownOptions }: DropdownLinkState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = ["wrapperActive"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    wrapper: {
      extend: computed(() => [isShownOptions.value && extendingKeysClasses.wrapperActive.value]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
