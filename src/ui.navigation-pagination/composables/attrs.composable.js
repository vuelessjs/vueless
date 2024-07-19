import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";
import { cva, cx } from "../../service.ui";
import { computed } from "vue";

export function useAttrs(props) {
  const { config, getAttrs, isSystemKey } = useUI(defaultConfig, () => props.config);
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

    if (key === "item") {
      const itemAttrs = computed(() => (page = 0) => {
        const itemClass = page && !isFinite(page.number) && getAttrs("ellipsis");

        return {
          ...itemAttrs.value,
          class: cx([itemAttrs.value.class, itemClass]),
        };
      });
    }

    if (key === "pageButton") {
      const pageButtonAttrs = computed(() => (page) => {
        const pageButtonActiveClasses = page.isActive && config.value.pageButtonActive;

        return {
          ...pageButtonAttrs.value,
          class: cx([pageButtonAttrs.value.class, pageButtonActiveClasses]),
        };
      });
    }
  }

  return {
    ...attrs,
    config,
  };
}
