import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { label, items } = config.value;

  const cvaItems = cva({
    base: items.base,
    variants: items.variants,
    compoundVariants: items.compoundVariants,
  });

  const cvaLabel = cva({
    base: label.base,
    variants: label.variants,
    compoundVariants: label.compoundVariants,
  });

  const itemsClasses = computed(() =>
    cvaItems({
      size: props.size,
      variant: props.variant,
      multiple: props.multiple,
      separated: props.separated,
    }),
  );

  const labelClasses = computed(() =>
    cvaLabel({
      block: props.block,
    }),
  );

  const labelAttrs = getAttrs("label", { isComponent: true, classes: labelClasses });
  const itemsAttrs = getAttrs("items", { classes: itemsClasses });
  const itemAttrs = getAttrs("item", { isComponent: true });

  return {
    config,
    labelAttrs,
    itemsAttrs,
    itemAttrs,
  };
}
