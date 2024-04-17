import useUI from "../../composable.ui";
import { cva, cx, isMobileApp } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props, { isMobileDevice }) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { wrapper, page, rightRounding } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const cvaPage = cva({
    base: page.base,
    variants: page.variants,
    compoundVariants: page.compoundVariants,
  });

  const cvaRightRounding = cva({
    base: rightRounding.base,
    variants: rightRounding.variants,
    compoundVariants: rightRounding.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    cvaWrapper({
      width: props.width,
      fixedRounding: props.fixedRounding,
    }),
  );

  const pageClasses = computed(() =>
    cvaPage({
      fixedRounding: props.fixedRounding,
      gray: props.gray,
    }),
  );

  const rightRoundingClasses = computed(() => cvaRightRounding({ gray: props.gray }));

  const wrapperAttrsRaw = getAttrs("wrapper", { classes: wrapperClasses });
  const pageAttrs = getAttrs("page", { classes: pageClasses });
  const headerAttrs = getAttrs("header");
  const headerLeftAttrs = getAttrs("headerLeft");
  const headerRightAttrs = getAttrs("headerRight");
  const headerLeftFallbackAttrs = getAttrs("headerLeftFallback");
  const backLinkAttrs = getAttrs("backLink", { isComponent: true });
  const backLinkIconAttrs = getAttrs("backLinkIcon", { isComponent: true });
  const titleAttrs = getAttrs("title", { isComponent: true });
  const descriptionAttrs = getAttrs("description");
  const footerAttrsRaw = getAttrs("footer");
  const footerLeftAttrs = getAttrs("footerLeft");
  const footerRightAttrs = getAttrs("footerRight");
  const rightRoundingWrapperAttrs = getAttrs("rightRoundingWrapper");
  const rightRoundingAttrs = getAttrs("rightRounding", { classes: rightRoundingClasses });

  const wrapperAttrs = computed(() => ({
    ...wrapperAttrsRaw.value,
    class: cx([
      wrapperAttrsRaw.value.class,
      isMobileDevice.value && !isMobileApp && config.value.wrapperMobile,
    ]),
  }));

  const footerAttrs = computed(() => ({
    ...footerAttrsRaw.value,
    class: cx([
      footerAttrsRaw.value.class,
      props.mobileFooterReverse && isMobileDevice.value && config.value.footerMobileReverse,
    ]),
  }));

  return {
    config,
    wrapperAttrs,
    pageAttrs,
    rightRoundingWrapperAttrs,
    rightRoundingAttrs,
    headerAttrs,
    headerRightAttrs,
    headerLeftAttrs,
    headerLeftFallbackAttrs,
    titleAttrs,
    backLinkAttrs,
    backLinkIconAttrs,
    descriptionAttrs,
    footerAttrs,
    footerLeftAttrs,
    footerRightAttrs,
    hasSlotContent,
  };
}
