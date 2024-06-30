import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs, setColor } = useUI(defaultConfig, () => props.config);
  const { list, radio } = config.value;

  const cvaList = cva({
    base: list.base,
    variants: list.variants,
    compoundVariants: list.compoundVariants,
  });

  const cvaRadio = cva({
    base: radio.base,
    variants: radio.variants,
    compoundVariants: radio.compoundVariants,
  });

  const listClasses = computed(() => cvaList({ size: props.size }));
  const radioClasses = computed(() => setColor(cvaRadio({ color: props.color }), props.color));

  const labelAttrs = getAttrs("label");
  const listAttrs = getAttrs("list", { classes: listClasses });
  const unselectedAttrs = getAttrs("unselected");
  const unselectedRadioAttrs = getAttrs("unselectedRadio", { isComponent: true });
  const unselectedIconAttrs = getAttrs("unselectedIcon", { isComponent: true });
  const radioAttrs = getAttrs("radio", { classes: radioClasses, isComponent: true });

  return {
    config,
    listAttrs,
    labelAttrs,
    radioAttrs,
    unselectedIconAttrs,
    unselectedAttrs,
    unselectedRadioAttrs,
  };
}
