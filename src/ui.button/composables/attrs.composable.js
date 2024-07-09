import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs, getColor, setColor } = useUI(defaultConfig, () => props.config);
  const { button, text } = config.value;

  const cvaButton = cva({
    base: button.base,
    variants: button.variants,
    compoundVariants: button.compoundVariants,
  });

  const cvaText = cva({
    base: text.base,
    variants: text.variants,
    compoundVariants: text.compoundVariants,
  });

  const buttonClasses = computed(() =>
    setColor(
      cvaButton({
        size: props.size,
        color: getColor(props.color),
        variant: props.variant,
        pill: props.pill,
        block: props.block,
        square: props.loading || props.square,
        filled: props.filled,
        loading: props.loading,
        disabled: props.disabled,
      }),
      props.color,
    ),
  );

  const textClasses = computed(() =>
    setColor(
      cvaText({
        color: getColor(props.color),
      }),
      props.color,
    ),
  );

  const buttonAttrs = getAttrs("button", { classes: buttonClasses });
  const loaderAttrs = getAttrs("loader");
  const textAttrs = getAttrs("text", { classes: textClasses });
  const leftIconSlotAttrs = getAttrs("leftIconSlot");
  const rightIconSlotAttrs = getAttrs("rightIconSlot");

  return {
    buttonAttrs,
    loaderAttrs,
    textAttrs,
    leftIconSlotAttrs,
    rightIconSlotAttrs,
  };
}
