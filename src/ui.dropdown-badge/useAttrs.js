import { computed } from "vue";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props, { isShownOptions }) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = ["dropdownBadgeActive"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    dropdownBadge: {
      extend: computed(() => [
        isShownOptions.value && extendingKeysClasses.dropdownBadgeActive.value,
      ]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
