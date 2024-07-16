import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export default function useAttrs(props, { isShownOptions }) {
  const { config, getAttrs, hasSlotContent, isSystemKey } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      const value = config.value[key];

      if (value.variants || value.compoundVariants) {
        return cva(value)({
          ...props,
        });
      }

      return "";
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "icon") {
      const iconAttrs = attrs[`${key}Attrs`];
      const rotateClasses = isShownOptions.value && config.value.iconRotate;

      attrs[`${key}Attrs`] = computed(() => ({
        ...iconAttrs.value,
        class: cx([iconAttrs.value.class, rotateClasses]),
      }));
    }

    if (key === "listWrapper") {
      const cvaListWrapperVariants = cva({
        base: "",
        variants: config.value[key].variants,
        compoundVariants: [],
      });

      const listWrapperPositionClasses = computed(() =>
        cvaListWrapperVariants({
          listYPosition: props.listYPosition,
          listXPosition: props.listXPosition,
        }),
      );

      attrs[`${key}PositionClasses`] = getAttrs(key, {
        classes: listWrapperPositionClasses,
      });
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
