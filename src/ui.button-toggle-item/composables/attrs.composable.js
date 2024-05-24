import { computed, toValue } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props, { size, block, variant }) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { label, labelText, wrapper } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const cvaLabelText = cva({
    base: labelText.base,
    variants: labelText.variants,
    compoundVariants: labelText.compoundVariants,
  });

  const cvaLabel = cva({
    base: label.base,
    variants: label.variants,
    compoundVariants: label.compoundVariants,
  });

  const wrapperClasses = computed(() => cvaWrapper({ block: toValue(block) }));

  const labelTextClasses = computed(() => cvaLabelText({ size: toValue(size) }));

  const labelClasses = computed(() =>
    cvaLabel({
      size: toValue(size),
      variant: toValue(variant),
      disabled: props.disabled,
    }),
  );

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const inputAttrs = getAttrs("input");
  const labelAttrs = getAttrs("label", { classes: labelClasses });
  const labelTextAttrs = getAttrs("labelText", { classes: labelTextClasses });

  return {
    inputAttrs,
    wrapperAttrs,
    labelTextAttrs,
    labelAttrs,
    hasSlotContent,
  };
}
