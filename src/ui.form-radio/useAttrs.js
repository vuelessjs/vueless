import { computed } from "vue";
import useUI from "../composables/useUI.js";
import { cva } from "../utils/utilUI.js";

import defaultConfig from "./config.js";

export default function useAttrs(props, { radioColor, radioSize }) {
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
          size: radioSize.value,
          label: Boolean(props.label),
          error: Boolean(props.error),
          color: getColor(radioColor.value),
        });
      }

      return setColor(value, radioColor.value);
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}