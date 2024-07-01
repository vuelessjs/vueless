import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, getColor, setColor } = useUI(defaultConfig, () => props.config);
  const { progress, indicator, step } = config.value;

  const cvaProgress = cva({
    base: progress.base,
    variants: progress.variants,
    compoundVariants: progress.compoundVariants,
  });

  const cvaIndicator = cva({
    base: indicator.base,
    variants: indicator.variants,
    compoundVariants: indicator.compoundVariants,
  });

  const cvaStep = cva({
    base: step.base,
    variants: step.variants,
    compoundVariants: step.compoundVariants,
  });

  const progressClasses = computed(() =>
    setColor(
      cvaProgress({
        size: props.size,
        color: getColor(props.color),
      }),
      props.color,
    ),
  );

  const indicatorClasses = computed(() =>
    setColor(
      cvaIndicator({
        size: props.size,
        color: getColor(props.color),
      }),
      props.color,
    ),
  );

  const stepClasses = computed(() =>
    setColor(
      cvaStep({
        size: props.size,
        color: getColor(props.color),
      }),
      props.color,
    ),
  );

  const wrapperAttrs = getAttrs("wrapper");
  const indicatorAttrs = getAttrs("indicator", { classes: indicatorClasses });
  const progressAttrs = getAttrs("progress", { classes: progressClasses });
  const stepAttrsRaw = getAttrs("step", { classes: stepClasses });

  const stepAttrs = computed(() => (classes) => ({
    ...stepAttrsRaw.value,
    class: cx([stepAttrsRaw.value.class, classes]),
  }));

  return {
    progressAttrs,
    wrapperAttrs,
    indicatorAttrs,
    stepAttrs,
    config,
  };
}
