import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";
import defaultConfig from "../configs/default.config";

export function useAttrs(props, { isOpened }) {
  const { config, getAttrs, hasSlotContent, isSystemKey } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

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

    attrs[`${key}Attrs`] = getAttrs(key, { classes });
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
