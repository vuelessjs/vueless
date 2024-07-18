import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";
import defaultConfig from "../configs/default.config";

export default function useAttrs(props, { isOpened }) {
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

    if (key === "description") {
      const descriptionAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...descriptionAttrs.value,
        class: cx([
          descriptionAttrs.value.class,
          isOpened.value && config.value.description.variants.isOpened.true,
        ]),
      }));
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
