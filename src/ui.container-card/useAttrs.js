import useUI from "../composables/useUI.js";
import { cva, cx } from "../utils/utilUI.js";

import defaultConfig from "./config.js";
import { computed } from "vue";

export default function useAttrs(props, { isMobileBreakpoint }) {
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

    if (key === "footer") {
      const footerAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...footerAttrs.value,
        class: cx([
          footerAttrs.value.class,
          props.mobileFooterReverse && isMobileBreakpoint.value && config.value.footerMobileReverse,
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
