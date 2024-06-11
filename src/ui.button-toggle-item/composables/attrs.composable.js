import { computed, toValue } from "vue";
import { cx, cva } from "../../service.ui";
import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props, { selectedValue, separated, variant }) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { button, selected } = config.value;

  const cvaButton = cva({
    base: button.base,
    variants: button.variants,
    compoundVariants: button.compoundVariants,
  });

  const buttonClasses = computed(() => {
    return cvaButton({
      variant: toValue(variant),
      separated: toValue(separated),
    });
  });

  const cvaSelected = cva({
    base: selected.base,
    variants: selected.variants,
    compoundVariants: selected.compoundVariants,
  });

  const selectedClasses = computed(() =>
    cvaSelected({
      variant: toValue(variant),
    }),
  );

  const inputAttrs = getAttrs("input");
  const buttonAttrsRaw = getAttrs("button", { isComponent: true, classes: buttonClasses });

  const buttonAttrs = computed(() => {
    const isSelected = Array.isArray(selectedValue?.value)
      ? selectedValue?.value?.includes(props.value)
      : selectedValue?.value === props.value;

    return {
      ...buttonAttrsRaw.value,
      class: cx([buttonAttrsRaw.value.class, isSelected && selectedClasses.value]),
    };
  });

  return {
    buttonAttrs,
    inputAttrs,
  };
}
