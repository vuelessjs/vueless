import useUI from "../composables/useUI.js";
import { cva, cx } from "../utils/utilUI.js";

import defaultConfig from "./config.js";
import { computed } from "vue";

export default function useAttrs(props, { isShownOptions }) {
  const { config, getColor, setColor, getAttrs, hasSlotContent, isSystemKey, isCVA } = useUI(
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
          color: getColor(props.color),
        });
      }

      return setColor(value, props.color);
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "dropdownButton") {
      const dropdownButton = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...dropdownButton.value,
        class: cx([
          dropdownButton.value.class,
          isShownOptions.value && setColor(config.value.dropdownButtonActive, props.color),
        ]),
      }));
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
