import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { wrapper } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    cvaWrapper({
      align: props.align,
      size: props.size,
      line: props.line,
    }),
  );

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const htmlAttrs = getAttrs("html");

  return {
    wrapperAttrs,
    htmlAttrs,
    hasSlotContent,
  };
}
