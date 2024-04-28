import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props, { isMobileBreakpoint }) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { wrapper } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    cvaWrapper({
      padding: props.padding,
      rounded: props.rounded,
    }),
  );

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const headerAttrs = getAttrs("header");
  const headerLeftAttrs = getAttrs("headerLeft");
  const headerLeftFallbackAttrs = getAttrs("headerLeftFallback");
  const titleAttrs = getAttrs("title", { isComponent: true });
  const descriptionAttrs = getAttrs("description");
  const contentAttrs = getAttrs("content");
  const dividerAttrs = getAttrs("divider", { isComponent: true });
  const footerAttrsRaw = getAttrs("footer");

  const footerAttrs = computed(() => {
    const footerMobileReverseClasses =
      props.mobileFooterReverse && isMobileBreakpoint.value && config.value.footerMobileReverse;

    return {
      ...footerAttrsRaw.value,
      class: cx([footerAttrsRaw.value.class, footerMobileReverseClasses]),
    };
  });

  return {
    hasSlotContent,
    wrapperAttrs,
    titleAttrs,
    dividerAttrs,
    headerAttrs,
    headerLeftAttrs,
    headerLeftFallbackAttrs,
    descriptionAttrs,
    contentAttrs,
    footerAttrs,
  };
}
