import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { title, description } = config.value;

  const cvaTitle = cva({
    base: title.base,
    variants: title.variants,
    compoundVariants: title.compoundVariants,
  });

  const cvaDescription = cva({
    base: description.base,
    variants: description.variants,
    compoundVariants: description.compoundVariants,
  });

  const titleClasses = computed(() => cvaTitle({ size: props.size }));

  const descriptionClasses = computed(() => cvaDescription({ size: props.size }));

  const wrapperAttrs = getAttrs("wrapper");
  const headerAttrs = getAttrs("header");
  const iconAttrs = getAttrs("icon", { isComponent: true });
  const footerAttrs = getAttrs("footer");
  const titleAttrs = getAttrs("title", { classes: titleClasses });
  const descriptionAttrs = getAttrs("description", { classes: descriptionClasses });

  return {
    config,
    titleAttrs,
    descriptionAttrs,
    wrapperAttrs,
    headerAttrs,
    footerAttrs,
    iconAttrs,
  };
}
