import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props, { radioColor, radioSize }) {
  const { config, getAttrs, getColor, setColor } = useUI(defaultConfig, () => props.config);
  const { radio } = config.value;

  const cvaRadio = cva({
    base: radio.base,
    variants: radio.variants,
    compoundVariants: radio.compoundVariants,
  });

  const radioClasses = computed(() =>
    setColor(
      cvaRadio({
        color: getColor(radioColor.value),
        size: radioSize.value,
      }),
      radioColor.value,
    ),
  );

  const labelAttrs = getAttrs("label", { isComponent: true });
  const radioAttrs = getAttrs("radio", { classes: radioClasses });

  return {
    radioAttrs,
    labelAttrs,
  };
}
