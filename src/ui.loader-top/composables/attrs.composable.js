import useUI from "vueless/composable.ui";
import { cva } from "vueless/service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, setColor } = useUI(defaultConfig, () => props.config);
  const { progress } = config.value;

  const cvaProgress = cva({
    base: progress.base,
    variants: progress.variants,
    compoundVariants: progress.compoundVariants,
  });

  const progressClasses = computed(() =>
    setColor(cvaProgress({ color: props.color }), props.color),
  );

  const progressAttrs = getAttrs("progress", { classes: progressClasses.value });

  return {
    progressAttrs,
  };
}
