import { computed } from "vue";
import useUI from "../composables/useUI.js";
// import { cva } from "../utils/utilUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const extendingKeys = ["option"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs({}, extendingKeys, {
    optionContent: {
      extend: computed(() => [extendingKeysClasses.option.value]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
