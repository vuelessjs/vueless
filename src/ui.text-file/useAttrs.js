import { computed } from "vue";
import useUI from "../composables/useUI.js";
import { cva } from "../utils/utilUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props, { focus }) {
  const { config, getAttrs, isSystemKey, hasSlotContent, isCVA } = useUI(
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
          focus: Boolean(focus.value),
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