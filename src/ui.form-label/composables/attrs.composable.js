import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { wrapper, label, description } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const cvaLabel = cva({
    base: label.base,
    variants: label.variants,
    compoundVariants: label.compoundVariants,
  });

  const cvaDescription = cva({
    base: description.base,
    variants: description.variants,
    compoundVariants: description.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    cvaWrapper({
      size: props.size,
      align: props.align,
    }),
  );

  const labelClasses = computed(() =>
    cvaLabel({
      size: props.size,
      error: Boolean(props.error),
      disabled: props.disabled,
      align: props.align,
    }),
  );

  const descriptionClasses = computed(() =>
    cvaDescription({
      size: props.size,
      error: Boolean(props.error),
      align: props.align,
    }),
  );

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const labelAttrs = getAttrs("label", { classes: labelClasses });
  const labelWrapperAttrs = getAttrs("labelWrapper");
  const descriptionAttrs = getAttrs("description", { classes: descriptionClasses });

  return {
    wrapperAttrs,
    labelWrapperAttrs,
    labelAttrs,
    descriptionAttrs,
    hasSlotContent,
  };
}
