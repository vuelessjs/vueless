import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, setColor } = useUI(defaultConfig, () => props.config);
  const { wrapper, container, icon } = config.value;

  const cvaWrapper = cva({
    base: wrapper.base,
    variants: wrapper.variants,
    compoundVariants: wrapper.compoundVariants,
  });

  const cvaContainer = cva({
    base: container.base,
    variants: container.variants,
    compoundVariants: container.compoundVariants,
  });

  const cvaIcon = cva({
    base: icon.base,
    variants: icon.variants,
    compoundVariants: icon.compoundVariants,
  });

  const wrapperClasses = computed(() =>
    setColor(
      cvaWrapper({
        pill: props.pill,
        size: props.size,
        color: props.color,
      }),
      props.color,
    ),
  );

  const containerClasses = computed(() =>
    setColor(
      cvaContainer({
        pill: props.pill,
        size: props.size,
        color: props.color,
        variant: props.variant,
        interactive: props.interactive,
      }),
      props.color,
    ),
  );

  const iconClasses = computed(() => cvaIcon({ size: props.size }));

  const wrapperAttrs = getAttrs("wrapper", { classes: wrapperClasses });
  const containerAttrs = getAttrs("container", { classes: containerClasses });
  const iconAttrs = getAttrs("icon", { classes: iconClasses });

  return {
    config,
    wrapperAttrs,
    containerAttrs,
    iconAttrs,
  };
}
