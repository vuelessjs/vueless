import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";
import { cva } from "../../service.ui";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { radio } = config.value;

  const cvaRadio = cva({
    base: radio.base,
    variants: radio.variants,
    compoundVariants: radio.compoundVariants,
  });

  const radioClasses = computed(() => cvaRadio({ color: props.color }));

  const wrapperAttrs = getAttrs("wrapper");
  const listAttrs = getAttrs("listAttrs");
  const labelAttrs = getAttrs("label");
  const radioAttrs = getAttrs("radio", { classes: radioClasses, isComponent: true });
  const iconAttrs = getAttrs("icon");
  const uncoloredAttrs = getAttrs("uncolored", { isComponent: true });
  const uncoloredRadioAttrs = getAttrs("uncoloredRadio", { isComponent: true });

  return {
    config,
    wrapperAttrs,
    listAttrs,
    labelAttrs,
    radioAttrs,
    iconAttrs,
    uncoloredAttrs,
    uncoloredRadioAttrs,
  };
}
