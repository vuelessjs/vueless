import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { items } = config.value;

  const cvaItems = cva({
    base: items.base,
    variants: items.variants,
    compoundVariants: items.compoundVariants,
  });

  const itemsClasses = computed(() =>
    cvaItems({
      size: props.size,
      separated: props.separated,
    }),
  );

  const labelAttrs = getAttrs("label", { isComponent: true });
  const itemsAttrs = getAttrs("items", { classes: itemsClasses });
  const itemAttrs = getAttrs("item", { isComponent: true });

  return {
    config,
    labelAttrs,
    itemsAttrs,
    itemAttrs,
  };
}
