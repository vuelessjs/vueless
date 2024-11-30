import { computed, toValue, type Ref } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UToggleItemProps, Config } from "./types.ts";

type itemState = {
  isSelected: Ref<boolean>;
  separated: boolean;
  variant: string;
};

export default function useAttrs(
  props: UToggleItemProps,
  { isSelected, separated, variant }: itemState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent } = useUI<Config>(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    variant: toValue(variant),
    separated: toValue(separated),
    /* component state, not a props */
    selected: isSelected.value,
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
