import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";
import { computed } from "vue";

export default function useAttrs(props) {
  const { config, getKeysAttrs, getExtendingKeysClasses, hasSlotContent } = useUI(
    defaultConfig,
    () => props.config,
  );

  const extendingKeysClasses = getExtendingKeysClasses(["label"]);

  const keysAttrs = getKeysAttrs({}, [], {
    labelCrossed: {
      base: computed(() => [extendingKeysClasses.label.value]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
