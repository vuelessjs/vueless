import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { content, header } = config.value;

  const cvaContent = cva({
    base: content.base,
    variants: content.variants,
    compoundVariants: content.compoundVariants,
  });

  const cvaHeader = cva({
    base: header.base,
    variants: header.variants,
    compoundVariants: header.compoundVariants,
  });

  const contentClasses = computed(() => cvaContent({ size: props.size }));

  const headerClasses = computed(() => cvaHeader({ underlined: props.underlined }));

  const wrapperAttrs = getAttrs("wrapper");
  const upperlineAttrs = getAttrs("upperline", { isComponent: true });
  const headerAttrs = getAttrs("header", { classes: headerClasses });
  const headerFallbackAttrs = getAttrs("headerFallback");
  const titleAttrs = getAttrs("title", { isComponent: true });
  const underlineAttrs = getAttrs("underline", { isComponent: true });
  const contentAttrs = getAttrs("content", { classes: contentClasses });

  return {
    contentAttrs,
    headerAttrs,
    wrapperAttrs,
    headerFallbackAttrs,
    titleAttrs,
    upperlineAttrs,
    underlineAttrs,
  };
}
