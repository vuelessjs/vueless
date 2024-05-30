import { computed } from "vue";

import { cva } from "../../service.ui";
import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { wrapper } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    cvaWrapper({
      gap: props.gap,
      align: props.align,
    }),
  );

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });

  return {
    wrapperAttrs,
  };
}
