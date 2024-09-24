import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";
import { computed } from "vue";

export default function useAttrs(props, { selected, size }) {
  const { config, getKeysAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    size: size.value,
    selected: selected.value,
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
