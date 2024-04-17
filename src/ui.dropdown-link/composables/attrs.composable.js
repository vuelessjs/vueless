import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props, { isShownOptions }) {
  const { config, getAttrs, hasSlotContent } = useUI(defaultConfig, () => props.config);
  const { listWrapper } = config.value;

  const cvaListWrapper = cva({
    base: listWrapper.base,
    variants: listWrapper.variants,
    compoundVariants: listWrapper.compoundVariants,
  });

  const listWrapperClasses = computed(() =>
    cvaListWrapper({
      listYPosition: props.listYPosition,
      listXPosition: props.listXPosition,
    }),
  );

  // Get list wrapper position classes to apply them to list without wrapper
  const cvaListWrapperVariants = cva({
    base: "",
    variants: listWrapper.variants,
    compoundVariants: [],
  });

  const listWrapperPositionClasses = computed(() =>
    cvaListWrapperVariants({
      listYPosition: props.listYPosition,
      listXPosition: props.listXPosition,
    }),
  );

  const wrapperAttrs = getAttrs("wrapper", true);
  const triggerAttrs = getAttrs("trigger");
  const linkAttrs = getAttrs("link", { isComponent: true });
  const iconAttrsRaw = getAttrs("icon", { isComponent: true });

  const iconAttrs = computed(() => {
    const rotateClasses = isShownOptions.value && config.value.iconRotate;

    return {
      ...iconAttrsRaw.value,
      class: cx([iconAttrsRaw.value.class, rotateClasses]),
    };
  });

  const listWrapperAttrs = getAttrs("listWrapper", { classes: listWrapperClasses });
  const listAttrs = getAttrs("list", { isComponent: true, classes: listWrapperPositionClasses });

  return {
    config,
    listWrapperAttrs,
    wrapperAttrs,
    linkAttrs,
    listAttrs,
    iconAttrs,
    triggerAttrs,
    hasSlotContent,
  };
}
