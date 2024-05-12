import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { counter } = config.value;

  const cvaCounter = cva({
    base: counter.base,
    variants: counter.variants,
    compoundVariants: counter.compoundVariants,
  });

  const counterClasses = computed(() => cvaCounter({ size: props.size }));

  const counterAttrs = getAttrs("counter", { classes: counterClasses });
  const ratingAttrs = getAttrs("rating");
  const wrapperAttrs = getAttrs("wrapper");
  const iconAttrs = getAttrs("icon", { isComponent: true });
  const iconWrapperAttrs = getAttrs("iconWrapper");
  const labelAttrs = getAttrs("label", { isComponent: true });

  return {
    config,
    counterAttrs,
    ratingAttrs,
    wrapperAttrs,
    iconAttrs,
    iconWrapperAttrs,
    labelAttrs,
  };
}
