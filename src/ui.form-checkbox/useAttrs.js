import { computed } from "vue";
import useUI from "../composables/useUI.js";
import { cva } from "../utils/utilUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props, { checkboxColor, checkboxSize }) {
  const { config, getAttrs, getColor, setColor, isSystemKey, hasSlotContent, isCVA } = useUI(
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
          size: checkboxSize.value,
          label: Boolean(props.label),
          error: Boolean(props.error),
          color: getColor(checkboxColor.value),
        });
      }

      return setColor(value, checkboxColor.value);
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
