import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

export default function useAttrs(props, { isShownOptions }) {
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
