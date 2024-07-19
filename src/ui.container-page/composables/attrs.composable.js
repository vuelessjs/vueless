import useUI from "../../composable.ui";
import { cva, cx, isMobileApp } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export default function useAttrs(props, { isMobileBreakpoint }) {
  const { config, getAttrs, hasSlotContent, isSystemKey } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      const value = config.value[key];

      if (value.variants || value.compoundVariants) {
        return cva(value)({
          ...props,
        });
      }

      return "";
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "wrapper") {
      const wrapperAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...wrapperAttrs.value,
        class: cx([
          wrapperAttrs.value.class,
          isMobileBreakpoint.value && !isMobileApp && config.value.wrapperMobile,
        ]),
      }));
    }

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
