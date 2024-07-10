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

  const iconClasses = computed(() => ({
    iconLeft: Boolean(props.iconLeft) || hasSlotContent(slots["icon-left"]),
    iconRight: Boolean(props.iconRight) || hasSlotContent(slots["icon-right"]),
  }));

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    let classes = "";
    let value = config.value[key];

    if (value.variants || value.compoundVariants) {
      const getCVA = cva(value);

      classes = computed(() =>
        setColor(
          getCVA({
            ...props,
            color: getColor(props.color),
            square: props.loading || props.square,
            iconLeft: iconClasses.value.iconLeft,
            iconRight: iconClasses.value.iconRight,
          }),
          props.color,
        ),
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
