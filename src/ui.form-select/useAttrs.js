import { computed } from "vue";
import useUI from "../composables/useUI.ts";

import defaultConfig from "./config.js";

export default function useAttrs(props, { isTop, isOpen, selectedLabel: selectedLabelValue }) {
  const { config, getKeysAttrs } = useUI(defaultConfig, () => props.config);

  const mutatedProps = computed(() => ({
    error: Boolean(props.error),
    label: Boolean(props.label),
    /* component state, not a props */
    selected: Boolean(selectedLabelValue.value),
    opened: isOpen.value,
    openedTop: isTop.value,
  }));

  return { config, ...getKeysAttrs(mutatedProps) };
}
