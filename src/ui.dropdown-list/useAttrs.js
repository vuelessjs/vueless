import useUI from "../composables/useUI.js";
import { cva, cx } from "../utils/utilUI.js";

import defaultConfig from "./config.js";
import { computed } from "vue";

export default function useAttrs(props) {
  const { config, getAttrs, hasSlotContent, isSystemKey, isCVA } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  const optionClasses = computed(() =>
    cva(config.value.option)({
      ...props,
    }),
  );

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      let value = config.value[key];

      if (isCVA(value)) {
        value = cva(value)({
          ...props,
        });
      }

      return value;
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "group" || key === "subGroup") {
      const keyAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...keyAttrs.value,
        class: cx([optionClasses.value, keyAttrs.value.class]),
      }));
    }
  }

  return {
    ...attrs,
    optionClasses,
    hasSlotContent,
    config,
  };
}
