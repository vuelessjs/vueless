import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";

export default function useAttrs(props, { focus }) {
  const { config, getAttrs, isSystemKey } = useUI(defaultConfig, () => props.config);
  const attrs = {};

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      const value = config.value[key];

      if (value.variants || value.compoundVariants) {
        return cva(value)({
          ...props,
          focus: Boolean(focus.value),
        });
      }

      return "";
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });
  }

  return {
    ...attrs,
    config,
  };
}
