import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props, { checkboxColor, checkboxSize }) {
  const { config, getAttrs, getColor, setColor } = useUI(defaultConfig, () => props.config);
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
        size: checkboxSize.value,
        label: Boolean(props.label),
        color: getColor(checkboxColor.value),
        disabled: props.disabled,
      }),
      checkboxColor.value,
    ),
  );

  const iconWrapperClasses = computed(() =>
    setColor(
      cvaIconWrapper({
        size: checkboxSize.value,
        color: getColor(checkboxColor.value),
      }),
      checkboxColor.value,
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
