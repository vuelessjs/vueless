import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs, getColor, setColor } = useUI(defaultConfig, () => props.config);
  const { wrapper } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    setColor(
      cvaWrapper({
        color: getColor(props.color),
      }),
      props.color,
    ),
  );

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });

  return {
    wrapperAttrs,
    config,
  };
}
