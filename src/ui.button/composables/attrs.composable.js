import { computed, useSlots } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";
import defaultConfig from "../configs/default.config";

export default function useAttrs(props) {
  const slots = useSlots();
  const { config, getAttrs, getColor, setColor, hasSlotContent, isSystemKey } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      const value = config.value[key];

      if (value.variants || value.compoundVariants) {
        return setColor(
          cva(value)({
            ...props,
            color: getColor(props.color),
            square: props.loading || props.square,
            iconLeft: Boolean(props.iconLeft) || hasSlotContent(slots["icon-left"]),
            iconRight: Boolean(props.iconRight) || hasSlotContent(slots["icon-right"]),
          }),
          props.color,
        );
      }

      return "";
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
