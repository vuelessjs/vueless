import useUI from "../composables/useUI.js";
import defaultConfig from "./config.js";
import { computed } from "vue";
import { cva, cx } from "../utils/utilUI.js";

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
        });
      }

      return value;
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "label") {
      const labelAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => (isActive) => ({
        ...labelAttrs,
        class: cx([
          labelAttrs.value.class,
          isActive !== undefined && !isActive ? config.value.labelCrossed : "",
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
