import useUI from "../../composable.ui";

import defaultConfig from "../configs/default.config";
import { cva, cx } from "../../service.ui";
import { computed } from "vue";

export default function useAttrs(props) {
  const { config, getAttrs, isSystemKey, hasSlotContent, isCVA } = useUI(
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
    hasSlotContent,
  };
}
