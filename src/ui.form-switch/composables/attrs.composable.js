import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props, { checked }) {
  const { config, getAttrs, getColor, setColor } = useUI(defaultConfig, () => props.config);
  const { wrapper, circle, toggleLabel } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const cvaCircle = cva({
    base: circle.base,
    variants: circle.variants,
    compoundVariants: circle.compoundVariants,
  });

  const cvaToggleLabel = cva({
    base: toggleLabel.base,
    variants: toggleLabel.variants,
    compoundVariants: toggleLabel.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    setColor(
      cvaWrapper({
        size: props.size,
        color: getColor(props.color),
        disabled: props.disabled,
        checked: Boolean(checked.value),
        toggleLabel: props.toggleLabel,
      }),
      props.color,
    ),
  );

  const circleClasses = computed(() =>
    cvaCircle({
      size: props.size,
      checked: Boolean(checked.value),
    }),
  );

  const toggleLabelClasses = computed(() =>
    setColor(
      cvaToggleLabel({
        size: props.size,
        color: getColor(props.color),
        toggleLabel: props.toggleLabel,
        checked: Boolean(checked.value),
      }),
      props.color,
    ),
  );

  const labelAttrs = getAttrs("label", { isComponent: true });
  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const inputAttrs = getAttrs("input");
  const circleAttrs = getAttrs("circle", { classes: circleClasses });
  const iconAttrs = getAttrs("icon", { isComponent: true });
  const toggleLabelAttrs = getAttrs("toggleLabel", { classes: toggleLabelClasses });

  return {
    config,
    iconAttrs,
    labelAttrs,
    wrapperAttrs,
    circleAttrs,
    toggleLabelAttrs,
    inputAttrs,
  };
}
