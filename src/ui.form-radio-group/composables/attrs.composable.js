import { computed } from "vue";

import { cva } from "../../service.ui";
import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { list } = config.value;

  const cvaList = cva({
    base: list.base,
    variants: list.variants,
    compoundVariants: list.compoundVariants,
  });

  const listClasses = computed(() => cvaList({ size: props.size }));

  const labelAttrs = getAttrs("label", { isComponent: true });
  const listAttrs = getAttrs("list", { classes: listClasses });
  const radioAttrs = getAttrs("radio", { isComponent: true });

  return {
    labelAttrs,
    listAttrs,
    radioAttrs,
  };
}
