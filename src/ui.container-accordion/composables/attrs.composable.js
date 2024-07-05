import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export function useAttrs(props, { isOpened }) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const { wrapper, title, description } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

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

  const wrapperClasses = computed(() => cvaWrapper({ size: props.size }));

  const titleClasses = computed(() =>
    cvaTitle({
      size: props.size,
    }),
  );

  const descriptionClasses = computed(() =>
    cvaDescription({
      size: props.size,
      isOpened: isOpened.value,
    }),
  );

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const bodyAttrs = getAttrs("body");
  const titleAttrs = getAttrs("title", { classes: titleClasses });
  const descriptionAttrs = getAttrs("description", { classes: descriptionClasses });
  const iconAttrs = getAttrs("icon", { isComponent: true });
  const dividerAttrs = getAttrs("divider", { isComponent: true });

  return {
    config,
    wrapperAttrs,
    descriptionAttrs,
    bodyAttrs,
    titleAttrs,
    iconAttrs,
    dividerAttrs,
  };
}
