import useUI from "../../composable.ui";
import { cva } from "../../service.ui";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export default function useAttrs(props) {
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
          label: Boolean(props.label),
        });
      }

      return value;
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
