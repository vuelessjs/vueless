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

    if (key === "list") {
      const getCVA = cva({
        base: "",
        variants: config.value[key].variants,
        compoundVariants: [],
      });

      const classes = computed(() =>
        getCVA({
          ...props,
          listYPosition: props.listYPosition,
          listXPosition: props.listXPosition,
        }),
      );

      attrs[`${key}Attrs`] = getAttrs(key, {
        classes: classes,
      });
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
