import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

export default function useAttrs(props) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = ["paginationButton"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    firstButton: {
      base: computed(() => [extendingKeysClasses.paginationButton.value]),
    },
    lastButton: {
      base: computed(() => [extendingKeysClasses.paginationButton.value]),
    },
    prevButton: {
      base: computed(() => [extendingKeysClasses.paginationButton.value]),
    },
    nextButton: {
      base: computed(() => [extendingKeysClasses.paginationButton.value]),
    },
    activeButton: {
      base: computed(() => [extendingKeysClasses.paginationButton.value]),
    },
    inactiveButton: {
      base: computed(() => [extendingKeysClasses.paginationButton.value]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
