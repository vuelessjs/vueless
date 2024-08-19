import useUI from "../../composable.ui";
import defaultConfig from "../configs/default.config";
import { computed } from "vue";
import { cva, cx } from "../../service.ui";

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
        });
      }

      return value;
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "label") {
      const labelAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => (isActive) => ({
        ...labelAttrs,
        class: cx([
          labelAttrs.value.class,
          isActive !== undefined && !isActive ? config.value.labelCrossed : "",
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
