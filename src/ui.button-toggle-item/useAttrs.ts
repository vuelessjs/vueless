import { computed, toValue, type Ref } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.ts";

import type { UseAttrs } from "../types.ts";
import type { UToggleItemProps } from "./types.ts";

type Config = Partial<typeof defaultConfig>;

type itemState = {
  isSelected: Ref<boolean>;
  separated: Ref<boolean>;
  variant: string;
};

export default function useAttrs(
  props: UToggleItemProps,
  { isSelected, separated, variant }: itemState,
): UseAttrs<Config> {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI<Config>(
    defaultConfig,
    () => props.config,
  );

  const mutatedProps = computed(() => ({
    variant: toValue(variant),
    separated: toValue(separated),
  }));

  const extendingKeys = ["toggleButtonActive"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys, mutatedProps);

  const keysAttrs = getKeysAttrs(mutatedProps, extendingKeys, {
    toggleButton: {
      extend: computed(() => [isSelected.value && extendingKeysClasses.toggleButtonActive.value]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
