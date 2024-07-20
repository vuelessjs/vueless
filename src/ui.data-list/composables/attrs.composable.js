import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";
import { computed } from "vue";
import { cva, cx } from "../../service.ui";

export default function useAttrs(props) {
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

    if (key === "label") {
      const labelAttrs = getAttrs("label", { classes });

      attrs[`${key}Attrs`] = computed(() => (isActive) => ({
        ...labelAttrs,
        class: cx([
          labelAttrs.value.class,
          isActive !== undefined && !isActive ? config.value.labelCrossed : "",
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
