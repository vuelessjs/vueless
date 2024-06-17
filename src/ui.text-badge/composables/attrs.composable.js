import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, hasSlotContent, getColor, setColor } = useUI(
    defaultConfig,
    () => props.config,
  );
  const { wrapper, body } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const cvaBody = cva({
    base: body.base,
    variants: body.variants,
    compoundVariants: body.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    setColor(
      cvaWrapper({
        variant: props.variant,
        size: props.size,
        color: getColor(props.color),
        weight: props.weight,
      }),
      props.color,
    ),
  );

  const bodyClasses = computed(() =>
    cvaBody({
      size: props.size,
    }),
  );

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const bodyAttrs = getAttrs("body", { classes: bodyClasses });

  return {
    bodyAttrs,
    wrapperAttrs,
    hasSlotContent,
  };
}
