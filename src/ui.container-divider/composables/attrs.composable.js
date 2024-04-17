import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { wrapper, divider, label } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const cvaDivider = cva({
    base: divider.base,
    variants: divider.variants,
    compoundVariants: divider.compoundVariants,
  });

  const cvaLabel = cva({
    base: label.base,
    variants: label.variants,
    compoundVariants: label.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    cvaWrapper({
      size: props.size,
      vertical: props.vertical,
      noPadding: props.noPadding,
      noTopPadding: props.noTopPadding,
      noBottomPadding: props.noBottomPadding,
      noLeftPadding: props.noLeftPadding,
      noRightPadding: props.noRightPadding,
      label: Boolean(props.label),
    }),
  );

  const dividerClasses = computed(() =>
    cvaDivider({
      variant: props.variant,
      dashed: props.dashed,
      dotted: props.dotted,
      vertical: props.vertical,
      noBorder: props.noBorder,
      label: Boolean(props.label),
    }),
  );

  const labelClasses = computed(() => cvaLabel({ variant: props.variant }));

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const dividerAttrs = getAttrs("divider", { classes: dividerClasses });
  const labelAttrs = getAttrs("label", { classes: labelClasses });

  return {
    hasSlotContent,
    wrapperAttrs,
    dividerAttrs,
    labelAttrs,
  };
}
