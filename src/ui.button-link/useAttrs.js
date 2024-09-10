import { computed, useSlots } from "vue";
import useUI from "../composables/useUI";
import { cva, cx } from "../utils/utilsUI";
import defaultConfig from "./config";

export default function useAttrs(props, { isActive, isExactActive }) {
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
        });
      }

      return setColor(value, props.color);
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "wrapper") {
      const wrapperAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...wrapperAttrs.value,
        class: cx([
          wrapperAttrs.value.class,
          hasSlotContent(slots["default"]) && config.value.withChild,
          isActive.value && props.wrapperActiveClass,
          isExactActive.value && props.wrapperExactActiveClass,
        ]),
      }));
    }

    if (key === "link") {
      const linkAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => ({
        ...linkAttrs.value,
        class: cx([
          linkAttrs.value.class,
          hasSlotContent(slots["default"]) && config.value.withChild,
          isActive.value && props.activeClass,
          isExactActive.value && props.exactActiveClass,
        ]),
      }));
    }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
