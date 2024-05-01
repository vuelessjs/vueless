import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, setColor } = useUI(defaultConfig, () => props.config);
  const { loader, ellipse } = config.value;

  const cvaLoader = cva({
    base: loader.base,
    variants: loader.variants,
    compoundVariants: loader.compoundVariants,
  });

  const cvaEllipse = cva({
    base: ellipse.base,
    variants: ellipse.variants,
    compoundVariants: ellipse.compoundVariants,
  });

  const loaderClasses = computed(() =>
    cvaLoader({
      size: props.size,
    }),
  );

  const ellipseClasses = computed(() =>
    setColor(
      cvaEllipse({
        size: props.size,
        color: props.color,
      }),
      props.color,
    ),
  );

  const loaderAttrs = getAttrs("loader", { classes: loaderClasses });
  const ellipseRaw = getAttrs("ellipse", { classes: ellipseClasses });

  const ellipseAttrs = computed(() => (classes) => ({
    ...ellipseRaw.value,
    class: cx([ellipseRaw.value.class, classes]),
  }));

  return {
    loaderAttrs,
    ellipseAttrs,
  };
}
