import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export default function useAttrs(props, { isShownOptions }) {
  const { config, getAttrs, hasSlotContent, isSystemKey, isCVA } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      let value = config.value[key];

      if (isCVA(value)) {
        value = cva(value)({
          ...props,
        });
      }

      return value;
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "icon") {
      const iconAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...iconAttrs.value,
        class: cx([iconAttrs.value.class, isShownOptions.value && config.value.iconRotate]),
      }));
    }

    if (key === "list") {
      const getCVA = cva({
        base: "",
        variants: config.value["listWrapper"].variants,
        compoundVariants: [],
      });

      const classes = computed(() =>
        getCVA({
          ...props,
        }),
      );

      attrs[`${key}Attrs`] = getAttrs(key, { classes: classes });
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
