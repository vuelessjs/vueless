import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props, { isOpened }) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { wrapper, description } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const cvaDescription = cva({
    base: description.base,
    variants: description.variants,
    compoundVariants: description.compoundVariants,
  });

  const wrapperClasses = computed(() => cvaWrapper({ size: props.size }));

  const descriptionClasses = computed(() =>
    cvaDescription({ size: props.size, isOpened: isOpened.value }),
  );

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const descriptionAttrs = getAttrs("description", { classes: descriptionClasses });
  const infoAttrs = getAttrs("info");
  const titleAttrs = getAttrs("title");
  const iconAttrs = getAttrs("icon", { isComponent: true });
  const separatorAttrs = getAttrs("separator");

  return {
    config,
    wrapperAttrs,
    descriptionAttrs,
    infoAttrs,
    titleAttrs,
    iconAttrs,
    separatorAttrs,
  };
}
