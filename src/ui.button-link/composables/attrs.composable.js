import { computed, useSlots } from "vue";
import useUI from "../../composable.ui";
import { cva, cx } from "../../service.ui";
import defaultConfig from "../configs/default.config";

export default function useAttrs(props, { isActive, isExactActive }) {
  const slots = useSlots();

  const { config, getAttrs, hasSlotContent, getColor, setColor, isSystemKey } = useUI(
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
          }),
          props.color,
        );
      }

      return "";
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "wrapper") {
      const wrapperAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => {
        const hasDefaultSlot = hasSlotContent(slots["default"]);
        const hasRightSlot = hasSlotContent(slots["right"]);
        const hasLeftSlot = hasSlotContent(slots["left"]);

        return {
          ...wrapperAttrs.value,
          class: cx([
            wrapperAttrs.value.class,
            (hasDefaultSlot || hasLeftSlot || hasRightSlot) && config.value.withSlots,
            isActive.value && props.wrapperActiveClass,
            isExactActive.value && props.wrapperExactActiveClass,
          ]),
        };
      });
    }

    if (key === "link") {
      const linkAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => {
        const hasDefaultSlot = hasSlotContent(slots["default"]);

        return {
          ...linkAttrs.value,
          class: cx([
            linkAttrs.value.class,
            hasDefaultSlot && config.value.withSlots,
            isActive.value && props.activeClass,
            isExactActive.value && props.exactActiveClass,
          ]),
        };
      });
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
