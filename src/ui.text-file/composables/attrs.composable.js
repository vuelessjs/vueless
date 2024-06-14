import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props, { focus }) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { label } = config.value;

  const cvaLabel = cva({
    base: label.base,
    variants: label.variants,
    compoundVariants: label.compoundVariants,
  });

  const labelClasses = computed(() =>
    cvaLabel({
      focus: Boolean(focus.value),
      size: props.size,
    }),
  );

  const labelAttrs = getAttrs("label", { classes: labelClasses });
  const fileAttrs = getAttrs("file", { isComponent: true });
  const infoAttrs = getAttrs("info");
  const iconAttrs = getAttrs("icon", { isComponent: true });
  const imageAttrs = getAttrs("image");

  return {
    config,
    fileAttrs,
    infoAttrs,
    iconAttrs,
    labelAttrs,
    imageAttrs,
  };
}
