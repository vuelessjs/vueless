import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { getAttrs, config } = useUI(defaultConfig, () => props.config);
  const { body } = config.value;

  const cvaBody = cva({
    base: body.base,
    variants: body.variants,
    compoundVariants: body.compoundVariants,
  });

  const bodyClasses = computed(() => cvaBody({ label: Boolean(props.label) }));

  const labelAttrs = getAttrs("label");
  const bodyAttrs = getAttrs("body", { classes: bodyClasses });
  const fileAttrs = getAttrs("file", { isComponent: true });

  return {
    labelAttrs,
    bodyAttrs,
    fileAttrs,
  };
}
