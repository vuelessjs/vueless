import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, setColor } = useUI(defaultConfig, () => props.config);
  const { wrapper } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    setColor(
      cvaWrapper({
        size: props.size,
        weight: props.weight,
        underlined: props.underlined,
        color: props.color,
      }),
      props.color,
    ),
  );

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });

  return {
    wrapperAttrs,
  };
}
