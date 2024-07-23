import useUI from "../../composable.ui";
import { cva } from "../../service.ui";
import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export default function useAttrs(props, { selected }) {
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

    if (key === "checkbox") {
      const checkboxAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => {
        if (!checkboxAttrs.value.config) {
          checkboxAttrs.value.config = {};
        }

        checkboxAttrs.value.config.selectedIconName = selected.value.icon;

        return checkboxAttrs.value;
      });
    }
  }

  return {
    ...attrs,
    config,
  };
}
