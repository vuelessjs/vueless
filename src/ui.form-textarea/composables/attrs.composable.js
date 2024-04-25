import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { textarea, textareaWrapper } = config.value;

  const cvaTextarea = cva({
    base: textarea.base,
    variants: textarea.variants,
    compoundVariants: textarea.compoundVariants,
  });

  const cvaTextareaWrapper = cva({
    base: textareaWrapper.base,
    variants: textareaWrapper.variants,
    compoundVariants: textareaWrapper.compoundVariants,
  });

  const textareaWrapperClasses = computed(() =>
    cvaTextareaWrapper({
      error: Boolean(props.error),
      size: props.size,
      readonly: props.readonly,
      disabled: props.disabled,
      labelAlign: props.labelAlign,
      label: Boolean(props.label),
    }),
  );

  const textareaClasses = computed(() => cvaTextarea({ size: props.size }));

  const leftSlotAttrs = getAttrs("leftSlot");
  const rightSlotAttrs = getAttrs("rightSlot");
  const labelAttrs = getAttrs("label", { isComponent: true });
  const textareaWrapperAttrs = getAttrs("textareaWrapper", { classes: textareaWrapperClasses });
  const textareaAttrs = getAttrs("textarea", { classes: textareaClasses });

  return {
    textareaAttrs,
    labelAttrs,
    textareaWrapperAttrs,
    leftSlotAttrs,
    rightSlotAttrs,
    hasSlotContent,
  };
}
