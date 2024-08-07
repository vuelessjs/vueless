import { computed } from "vue";
import useUI from "../../composable.ui";
import { cva } from "../../service.ui";
import defaultConfig from "../configs/default.config";

export default function useAttrs(props) {
  const { config, getAttrs, hasSlotContent, isSystemKey } = useUI(
    defaultConfig,
    () => props.config,
  );
  const attrs = {};

  for (const key in defaultConfig) {
    if (isSystemKey(key)) continue;

    const classes = computed(() => {
      const value = config.value[key];

      if (value.variants || value.compoundVariants) {
        return cva(value)({
          ...props,
          error: Boolean(props.error),
          label: Boolean(props.label),
        });
      }

      return "";
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    // if (key === "input") {
    //   const inputAttrs = attrs[`${key}Attrs`];
    //
    //   attrs[`${key}Attrs`] = computed(() => ({
    //     ...inputAttrs.value,
    //     class: cx([inputAttrs.value.class]),
    //   }));
    // }
  }

  return {
    ...attrs,
    config,
    hasSlotContent,
  };
}
