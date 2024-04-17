import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, setColor, hasSlotContent } = useUI(defaultConfig, () => props.config);
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
        color: props.color,
        bordered: props.bordered,
      }),
      props.color,
    ),
  );

  const bodyClasses = computed(() => cvaBody({ size: props.size }));

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const bodyAttrs = getAttrs("body", { classes: bodyClasses });
  const buttonAttrs = getAttrs("button", { isComponent: true });
  const iconAttrs = getAttrs("icon", { isComponent: true });

  return {
    config,
    wrapperAttrs,
    bodyAttrs,
    buttonAttrs,
    iconAttrs,
    hasSlotContent,
  };
}
