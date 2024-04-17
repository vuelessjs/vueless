import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, setColor } = useUI(defaultConfig, () => props.config);
  const { checkbox, iconWrapper } = config.value;

  const cvaCheckbox = cva({
    base: checkbox.base,
    variants: checkbox.variants,
    compoundVariants: checkbox.compoundVariants,
  });

  const cvaIconWrapper = cva({
    base: iconWrapper.base,
    variants: iconWrapper.variants,
    compoundVariants: iconWrapper.compoundVariants,
  });

  const checkboxClasses = computed(() =>
    setColor(
      cvaCheckbox({
        size: props.size,
        label: Boolean(props.label),
        color: props.color,
        disabled: props.color,
      }),
      props.color,
    ),
  );

  const iconWrapperClasses = computed(() =>
    setColor(
      cvaIconWrapper({
        size: props.size,
        color: props.color,
      }),
      props.color,
    ),
  );

  const labelAttrs = getAttrs("label", { isComponent: true });
  const iconWrapperCellAttrs = getAttrs("iconWrapper", { classes: iconWrapperClasses });
  const iconAttrs = getAttrs("icon", { isComponent: true });
  const checkboxAttrs = getAttrs("checkbox", { classes: checkboxClasses });

  return {
    config,
    checkboxAttrs,
    iconWrapperCellAttrs,
    labelAttrs,
    iconAttrs,
  };
}
