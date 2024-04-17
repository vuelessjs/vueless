import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { wrapper } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const wrapperClasses = computed(() => cvaWrapper({ underlined: props.underlined }));

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });

  return {
    wrapperAttrs,
  };
}
