import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { useStore } from "vuex";
import { computed } from "vue";

export function useAttrs(props) {
  const store = useStore();
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config, "wrapper");
  const { modal } = config.value;

  const cvaModal = cva({
    base: modal.base,
    variants: modal.variants,
    compoundVariants: modal.compoundVariants,
  });

  const modalClasses = computed(() =>
    cvaModal({
      width: props.width,
      inner: props.inner,
    }),
  );

  const wrapperAttrs = getAttrs("wrapper");
  const overlayAttrs = getAttrs("overlay");
  const innerWrapperAttrs = getAttrs("innerWrapper");
  const headerAttrsRaw = getAttrs("header");
  const headerLeftAttrs = getAttrs("headerLeft");
  const headerLeftFallbackAttrs = getAttrs("headerLeftFallback");
  const backLinkAttrs = getAttrs("backLink", { isComponent: true });
  const backLinkIconAttrs = getAttrs("backLinkIcon", { isComponent: true });
  const titleAttrs = getAttrs("title", { isComponent: true });
  const descriptionAttrs = getAttrs("description");
  const headerRightAttrs = getAttrs("headerRight");
  const closeIconAttrs = getAttrs("closeIcon", { isComponent: true });
  const bodyAttrs = getAttrs("body");
  const dividerAttrs = getAttrs("divider", { isComponent: true });
  const dividerSpacingAttrs = getAttrs("dividerSpacing", { isComponent: true });
  const footerAttrsRaw = getAttrs("footer");

  const headerAttrs = computed(() => ({
    ...headerAttrsRaw.value,
    class: cx([
      headerAttrsRaw.value.class,
      props.mobileFooterReverse &&
        store.getters["breakpoint/isMobileDevice"] &&
        config.value.footerMobileReverse,
    ]),
  }));

  const footerAttrs = computed(() => ({
    ...footerAttrsRaw.value,
    class: cx([
      footerAttrsRaw.value.class,
      props.mobileFooterReverse &&
        store.getters["breakpoint/isMobileDevice"] &&
        config.value.footerMobileReverse,
    ]),
  }));

  const footerLeftAttrs = getAttrs("footerLeft");
  const footerRightAttrs = getAttrs("footerRight");
  const modalAttrs = getAttrs("modal", { classes: modalClasses });

  return {
    config,
    modalAttrs,
    titleAttrs,
    backLinkAttrs,
    backLinkIconAttrs,
    closeIconAttrs,
    dividerAttrs,
    dividerSpacingAttrs,
    overlayAttrs,
    wrapperAttrs,
    innerWrapperAttrs,
    headerAttrs,
    headerLeftAttrs,
    headerLeftFallbackAttrs,
    descriptionAttrs,
    headerRightAttrs,
    bodyAttrs,
    footerLeftAttrs,
    footerAttrs,
    footerRightAttrs,
    hasSlotContent,
  };
}
