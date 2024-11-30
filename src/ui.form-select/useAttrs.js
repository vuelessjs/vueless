import { computed } from "vue";
import useUI from "../composables/useUI.ts";

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

  const extendingKeys = [
    "searchActive",
    "wrapperActive",
    "selectLabelActive",
    "selectLabelOpenDirectionTop",
  ];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys, mutatedProps);

  const keysAttrs = getKeysAttrs(mutatedProps, extendingKeys, {
    selectLabel: {
      extend: computed(() => [
        isOpen.value && extendingKeysClasses.selectLabelActive.value,
        isTop.value && extendingKeysClasses.selectLabelOpenDirectionTop.value,
      ]),
    },
    wrapper: {
      extend: computed(() => [isOpen.value && extendingKeysClasses.wrapperActive.value]),
    },
    search: {
      extend: computed(() => [
        (!selectedLabelValue.value || isOpen.value) && extendingKeysClasses.searchActive.value,
      ]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
