import { computed } from "vue";

import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { logo, title } = config.value;

  const cvaLogo = cva({
    base: logo.base,
    variants: logo.variants,
    compoundVariants: logo.compoundVariants,
  });

  const cvaTitle = cva({
    base: title.base,
    variants: title.variants,
    compoundVariants: title.compoundVariants,
  });

  const logoClasses = computed(() => cvaLogo({ size: props.size }));

  const titleClasses = computed(() => cvaTitle({ size: props.size }));

  const wrapperAttrs = getAttrs("wrapper");
  const logoAttrs = getAttrs("logo", { classes: logoClasses });
  const labelAttrs = getAttrs("label");
  const imageAttrs = getAttrs("image");
  const titleAttrs = getAttrs("title", { classes: titleClasses });

  return {
    titleAttrs,
    logoAttrs,
    wrapperAttrs,
    labelAttrs,
    imageAttrs,
  };
}
