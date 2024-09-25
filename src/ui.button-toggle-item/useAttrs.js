import { computed, toValue } from "vue";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props, { isSelected, separated, variant }) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
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
