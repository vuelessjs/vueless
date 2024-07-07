import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, getColor, setColor } = useUI(defaultConfig, () => props.config);
  const { progress, indicator, step, wrapper, stepper } = config.value;

  const cvaStepper = cva({
    base: stepper.base,
    variants: stepper.variants,
    compoundVariants: stepper.compoundVariants,
  });

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

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
        variant: props.variant,
      }),
      props.color,
    ),
  );

  const stepperClasses = computed(() => cvaStepper({ size: props.size }));

  const wrapperClasses = computed(() => cvaWrapper({ variant: props.variant }));

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const indicatorAttrs = getAttrs("indicator", { classes: indicatorClasses });
  const progressAttrs = getAttrs("progress", { classes: progressClasses });
  const stepAttrsRaw = getAttrs("step", { classes: stepClasses });
  const stepperAttrs = getAttrs("stepper", { classes: stepperClasses, isComponent: true });
  const stepperRingAttrs = getAttrs("stepperRing");
  const stepperCountAttrs = getAttrs("stepperCount");
  const stepperGradientAttrs = getAttrs("stepperGradient");
  const stepperSvgAttrs = getAttrs("stepperSvg");

  const stepAttrs = computed(() => (classes) => ({
    ...stepAttrsRaw.value,
    class: cx([stepAttrsRaw.value.class, classes]),
  }));

  return {
    progressAttrs,
    wrapperAttrs,
    indicatorAttrs,
    stepAttrs,
    stepperAttrs,
    stepperRingAttrs,
    stepperCountAttrs,
    stepperGradientAttrs,
    stepperSvgAttrs,
    config,
  };
}
