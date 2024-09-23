import { computed } from "vue";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props, { focus }) {
  const { config, getKeysAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    focus: Boolean(focus.value),
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
