import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

import type { Ref } from "vue";
import type { UseAttrs } from "../types.ts";
import type { UTabProps, Config } from "./types.ts";

type ComponentState = {
  selected: Ref<boolean>;
  size: Ref<string>;
};

export default function useAttrs(
  props: UTabProps,
  { selected, size }: ComponentState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI<Config>(
    defaultConfig,
    () => props.config,
  );

  const mutatedProps = computed(() => ({
    size: size.value,
  }));

  const extendingKeys = ["tabActive"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs(mutatedProps, extendingKeys, {
    tab: {
      extend: computed(() => [selected.value && extendingKeysClasses.tabActive.value]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
