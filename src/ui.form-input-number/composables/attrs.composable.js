import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { value, text } = config.value;

  const cvaValue = cva({
    base: value.base,
    variants: value.variants,
    compoundVariants: value.compoundVariants,
  });

  const cvaText = cva({
    base: text.base,
    variants: text.variants,
    compoundVariants: text.compoundVariants,
  });

  const textClasses = computed(() => cvaText({ size: props.size }));

  const valueClasses = computed(() => cvaValue({ size: props.size }));

  const wrapperAttrs = getAttrs("wrapper");
  const numberAttrs = getAttrs("number");
  const removeButtonAttrs = getAttrs("removeButton", { isComponent: true });
  const removeIconAttrs = getAttrs("removeIcon", { isComponent: true });
  const addButtonAttrs = getAttrs("addButton", { isComponent: true });
  const addIconAttrs = getAttrs("addIcon", { isComponent: true });
  const valueAttrs = getAttrs("value", { classes: valueClasses });
  const textAttrs = getAttrs("text", { classes: textClasses });

  return {
    config,
    valueAttrs,
    textAttrs,
    removeButtonAttrs,
    removeIconAttrs,
    addButtonAttrs,
    addIconAttrs,
    wrapperAttrs,
    numberAttrs,
  };
}
