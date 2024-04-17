import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, setColor } = useUI(defaultConfig, () => props.config);
  const { radio } = config.value;

  const cvaRadio = cva({
    base: radio.base,
    variants: radio.variants,
    compoundVariants: radio.compoundVariants,
  });

  const radioClasses = computed(() => setColor(cvaRadio({ color: props.color }), props.color));

  const wrapperAttrsRaw = getAttrs("wrapper");
  const radioAttrs = getAttrs("radio", { isComponent: true, classes: radioClasses });
  const labelAttrs = getAttrs("label", { isComponent: true });
  const iconAttrs = getAttrs("icon", { isComponent: true });

  const wrapperAttrs = computed(() => (classes) => ({
    ...wrapperAttrsRaw.value,
    class: cx([wrapperAttrsRaw.value.class, classes]),
  }));

  return {
    radioAttrs,
    iconAttrs,
    wrapperAttrs,
    labelAttrs,
  };
}
