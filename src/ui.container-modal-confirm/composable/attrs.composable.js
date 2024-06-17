import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";
import { cva } from "../../service.ui/index.js";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, hasSlotContent, getColor, setColor } = useUI(
    defaultConfig,
    () => props.config,
  );
  const { modal, footerLeftFallback, confirmButton, cancelButton } = config.value;

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

  const cvaConfirmButton = cva({
    base: confirmButton.base,
    variants: confirmButton.variants,
    compoundVariants: confirmButton.compoundVariants,
  });

  const cvaCancelButton = cva({
    base: cancelButton.base,
    variants: cancelButton.variants,
    compoundVariants: cancelButton.compoundVariants,
  });

  const modalClasses = computed(() => setColor(cvaModal({ color: props.color }), props.color));

  const footerLeftFallbackClasses = computed(() =>
    setColor(cvaFooterLeftFallback({ color: props.color }), props.color),
  );

  const confirmButtonClasses = computed(() => cvaConfirmButton({ color: props.color }));

  const cancelButtonClasses = computed(() => cvaCancelButton({ color: props.color }));

  const modalAttrsRaw = getAttrs("modal", { isComponent: true, classes: modalClasses });
  const footerLeftFallbackAttrs = getAttrs("footerLeftFallback", {
    classes: footerLeftFallbackClasses,
  });
  const confirmButtonAttrs = getAttrs("confirmButton", {
    isComponent: true,
    classes: confirmButtonClasses,
  });
  const cancelButtonAttrs = getAttrs("cancelButton", {
    isComponent: true,
    classes: cancelButtonClasses,
  });

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
