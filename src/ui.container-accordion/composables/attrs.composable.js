import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva, isSystemKey } from "../../service.ui";
import defaultConfig from "../configs/default.config";

const componentKeys = ["icon", "divider"];

export function useAttrs(props, { isOpened }) {
  const { config, getAttrs } = useUI(defaultConfig, () => props.config);
  const attrs = {};

  // New approach of defining attrs dynamically (need to test).
  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    let classes = "";
    let value = config.value[key];

    if (value.variants || value.compoundVariants) {
      const getCVA = cva(value);

      classes = computed(() =>
        getCVA({
          ...props,
          isOpened: isOpened.value,
        }),
      );
    }

    attrs[`${key}Attrs`] = getAttrs(key, { classes, isComponent: componentKeys.includes(key) });
  }

  return {
    ...attrs,
    config,
  };
}
