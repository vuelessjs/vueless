import { computed, useSlots } from "vue";

import useUI from "../../composables/useUI";
import { cva } from "../../utils/utilsUI";

import defaultConfig from "../configs/default.config";

export default function useAttrs(props) {
  const slots = useSlots();
  const { config, getAttrs, hasSlotContent, getColor, setColor, isSystemKey, isCVA } = useUI(
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
          tabindex: Boolean(~props.tabindex),
          leftIcon: Boolean(props.leftIcon) || hasSlotContent(slots["left"]),
          rightIcon: Boolean(props.rightIcon) || hasSlotContent(slots["right"]),
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
