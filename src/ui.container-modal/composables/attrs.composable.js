import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

import useBreakpoint from "../../composable.breakpoint";

export default function useAttrs(props) {
  const { config, getAttrs, hasSlotContent, isSystemKey, isCVA } = useUI(
    defaultConfig,
    () => props.config,
  );
  const { isMobileBreakpoint } = useBreakpoint();
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

    if (key === "header") {
      const headerAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...headerAttrs.value,
        class: cx([
          headerAttrs.value.class,
          props.mobileFooterReverse && isMobileBreakpoint.value && config.value.footerMobileReverse,
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
