import { computed } from "vue";
import useUI from "../composables/useUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props, { selected }) {
  const { config, getKeysAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);

  const keysAttrs = getKeysAttrs();

  const { checkboxAttrs } = keysAttrs;

  keysAttrs.checkboxAttrs = computed(() => {
    if (selected.value.icon) {
      checkboxAttrs.value.config = checkboxAttrs.value.config || {};
      checkboxAttrs.value.config.defaults = checkboxAttrs.value.config.defaults || {};
      checkboxAttrs.value.config.defaults.checkedIcon = selected.value.icon;
    }

    return checkboxAttrs.value;
  });

  return {
    config,
    ...keysAttrs,
    hasSlotContent,
  };
}
