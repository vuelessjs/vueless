import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export default function useAttrs(props) {
  const { config, getAttrs, getColor, setColor, isSystemKey } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      const value = config.value[key];

      if (value.variants || value.compoundVariants) {
        return setColor(
          cva(value)({
            ...props,
            color: getColor(props.color),
          }),
          props.color,
        );
      }

      return "";
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "ellipse") {
      const ellipseAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => (classes) => ({
        ...ellipseAttrs,
        class: cx([ellipseAttrs.value.class, classes]),
      }));
    }
  }

  return {
    ...attrs,
    config,
  };
}
