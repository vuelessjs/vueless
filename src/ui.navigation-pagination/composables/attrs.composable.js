import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";
import { cva, cx } from "../../service.ui";
import { computed } from "vue";

export default function useAttrs(props) {
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
      attrs.itemAttrs = computed(() => (page = 0) => {
        const itemClass = page && !isFinite(page.number) && getAttrs("ellipsis");

        return {
          ...getAttrs("item"),
          class: cx([getAttrs("item").value.class, itemClass]),
        };
      });
    }

    if (key === "pageButton") {
      attrs.pageButtonAttrs = computed(() => (page) => {
        const pageButtonActiveClasses = page.isActive && config.value.pageButtonActive;

        return {
          ...getAttrs("pageButton"),
          class: cx([getAttrs("pageButton").value.class, pageButtonActiveClasses]),
        };
      });
    }
  }

  return {
    ...attrs,
    config,
  };
}
