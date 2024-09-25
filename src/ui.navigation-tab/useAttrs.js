import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";
import { computed } from "vue";

export default function useAttrs(props, { selected, size }) {
  const { config, getKeysAttrs, hasSlotContent, getExtendingKeysClasses } = useUI(
    defaultConfig,
    () => props.config,
  );

  const mutatedProps = computed(() => ({
    size: size.value,
  }));

  const extendingKeys = ["tabActive"];
  const extendingKeysClasses = getExtendingKeysClasses(extendingKeys);

  const keysAttrs = getKeysAttrs(mutatedProps, extendingKeys, {
    tab: {
      extend: computed(() => [selected.value && extendingKeysClasses.tabActive.value]),
    },
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
