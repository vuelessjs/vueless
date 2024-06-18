import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";
import { cva } from "../../service.ui/index.js";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, hasSlotContent, getColor, setColor } = useUI(
    defaultConfig,
    () => props.config,
  );
  const { modal, footerLeftFallback } = config.value;

  const cvaModal = cva({
    base: modal.base,
    variants: modal.variants,
    compoundVariants: modal.compoundVariants,
  });

  const cvaFooterLeftFallback = cva({
    base: footerLeftFallback.base,
    variants: footerLeftFallback.variants,
    compoundVariants: footerLeftFallback.compoundVariants,
  });

  const modalClasses = computed(() =>
    setColor(
      cvaModal({
        color: getColor(props.color),
      }),
      props.color,
    ),
  );

  const footerLeftFallbackClasses = computed(() =>
    setColor(cvaFooterLeftFallback({ color: getColor(props.color) }), props.color),
  );

  const footerLeftFallbackAttrs = getAttrs("footerLeftFallback", {
    classes: footerLeftFallbackClasses,
  });

  const confirmButtonAttrs = getAttrs("confirmButton", { isComponent: true });
  const cancelButtonAttrs = getAttrs("cancelButton", { isComponent: true });
  const modalAttrsRaw = getAttrs("modal", { isComponent: true, classes: modalClasses });

  const modalAttrs = computed(() => ({
    ...modalAttrsRaw.value,
    class: setColor(modalAttrsRaw.value.class, props.color),
  }));

  return {
    config,
    footerLeftFallbackAttrs,
    modalAttrs,
    confirmButtonAttrs,
    cancelButtonAttrs,
    hasSlotContent,
  };
}
