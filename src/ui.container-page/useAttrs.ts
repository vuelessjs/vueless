import { computed } from "vue";
import useUI from "../composables/useUI.ts";
import { isMobileApp } from "../utils/platform.ts";

import defaultConfig from "./config.ts";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { UPageProps, Config } from "./types.ts";

type ComponentState = {
  isMobileBreakpoint: Ref<boolean>;
};

export default function useAttrs(
  props: UPageProps,
  { isMobileBreakpoint }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI<Config>(
    defaultConfig,
    () => props.config,
    "wrapper",
  );

  const extendingKeys = ["wrapperMobile"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    wrapper: {
      extend: computed(() => [
        isMobileBreakpoint.value && !isMobileApp && extendingKeysClasses.wrapperMobile.value,
      ]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
