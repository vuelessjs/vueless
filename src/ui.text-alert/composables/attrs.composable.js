import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, setColor, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { wrapper, body, button, icon } = config.value;

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

  const cvaButton = cva({
    base: button.base,
    variants: button.variants,
    compoundVariants: button.compoundVariants,
  });

  const cvaIcon = cva({
    base: icon.base,
    variants: icon.variants,
    compoundVariants: icon.compoundVariants,
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

  const bodyClasses = computed(() => setColor(cvaBody({ size: props.size }),props.color));

  const buttonClasses = computed(() => setColor(cvaButton,props.color));

  const iconClasses = computed(() => setColor(cvaIcon,props.color));


  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const bodyAttrs = getAttrs("body", { classes: bodyClasses });
  const buttonAttrs = getAttrs("button", { isComponent: true,classes:buttonClasses });
  const iconAttrs = getAttrs("icon", { isComponent: true,classes:iconClasses });

  return {
    config,
    wrapperAttrs,
    bodyAttrs,
    buttonAttrs,
    iconAttrs,
    hasSlotContent,
  };
}
