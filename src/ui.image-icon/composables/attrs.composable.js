import useUI from "../../composables/useUI.js";
import { cva } from "../../utils/utilUI.js";

import defaultConfig from "../configs/default.config";
import { computed } from "vue";

export default function useAttrs(props) {
  const { config, getAttrs, getColor, setColor, isSystemKey, hasSlotContent, isCVA } = useUI(
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
          color: getColor(props.color),
        });
      }

      return setColor(value, props.color);
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
