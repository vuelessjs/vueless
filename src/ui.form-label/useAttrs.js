import { computed } from "vue";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props) {
  const { config, getKeysAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    error: Boolean(props.error),
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
