import useUI from "../composables/useUI.js";
import { cva } from "../utils/utilUI.js";

import defaultConfig from "./config.js";
import { computed } from "vue";

export default function useAttrs(props) {
  const { config, getAttrs, hasSlotContent, isSystemKey, isCVA } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      let value = config.value[key];

      if (isCVA(value)) {
        value = cva(value)({
          ...props,
          label: Boolean(props.label),
        });
      }

      return value;
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
