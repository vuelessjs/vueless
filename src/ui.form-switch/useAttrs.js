import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

export default function useAttrs(props, { checked }) {
  const { config, getKeysAttrs } = useUI(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    checked: Boolean(checked.value),
  }));

  const keysAttrs = getKeysAttrs(mutatedProps);

  return { config, ...keysAttrs };
}
