import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props, { focus }) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { text } = config.value;

  const cvaText = cva({
    base: text.base,
    variants: text.variants,
    compoundVariants: text.compoundVariants,
  });

  const textClasses = computed(() =>
    cvaText({
      focus: Boolean(focus.value),
    }),
  );

  const textAttrs = getAttrs("text", { classes: textClasses });
  const fileAttrs = getAttrs("file", { isComponent: true });
  const infoAttrs = getAttrs("info");
  const iconAttrs = getAttrs("icon", { isComponent: true });
  const itemImageAttrs = getAttrs("itemImage");

  return {
    config,
    fileAttrs,
    infoAttrs,
    iconAttrs,
    textAttrs,
    itemImageAttrs,
  };
}
