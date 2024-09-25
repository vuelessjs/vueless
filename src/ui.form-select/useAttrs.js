import { computed } from "vue";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props, { isTop, isOpen, selectedLabel: selectedLabelValue }) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const mutatedProps = computed(() => ({
    error: Boolean(props.error),
    label: Boolean(props.label),
  }));

  const extendingKeys = ["caret", "wrapperActive", "labelWrapperActive", "labelWrapperTop"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs(mutatedProps, extendingKeys, {
    wrapper: {
      extend: computed(() => [isOpen.value && extendingKeysClasses.wrapperActive.value]),
    },
    label: {
      extend: computed(() => [
        isOpen.value && extendingKeysClasses.labelWrapperActive.value,
        isTop.value && extendingKeysClasses.labelWrapperTop.value,
      ]),
    },
    toggle: {
      base: computed(() => [extendingKeysClasses.caret.value]),
    },
    clear: {
      base: computed(() => [extendingKeysClasses.caret.value]),
    },
    beforeCaret: {
      base: computed(() => [extendingKeysClasses.caret.value]),
    },
    afterCaret: {
      base: computed(() => [extendingKeysClasses.caret.value]),
    },
    rightIconWrapper: {
      base: computed(() => [extendingKeysClasses.caret.value]),
    },
    search: {
      extend: computed(() => [Boolean(selectedLabelValue.value) && !isOpen.value && "w-0"]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
