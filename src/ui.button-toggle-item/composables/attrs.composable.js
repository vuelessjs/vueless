import { computed, toValue } from "vue";
import useUI from "../../composable.ui";
import { cx, cva } from "../../service.ui";
import defaultConfig from "../configs/default.config";

export default function useAttrs(props, { selectedValue, separated, variant }) {
  const { config, getAttrs, isSystemKey, hasSlotContent } = useUI(
    defaultConfig,
    () => props.config,
  );

  const skipKeys = ["selected"];

  const attrs = {};

  for (const key in defaultConfig) {
    if (isSystemKey(key) || skipKeys.includes(key)) continue;

    const classes = computed(() => {
      const value = config.value[key];

      if (value.variants || value.compoundVariants) {
        return cva(value)({
          ...props,
          variant: toValue(variant),
          separated: toValue(separated),
        });
      }

      return value;
    });

    attrs[`${key}Attrs`] = getAttrs(key, { classes });

    if (key === "button") {
      const selectedClasses = computed(() =>
        cva(config.value.selected)({
          ...props,
          variant: toValue(variant),
          separated: toValue(separated),
        }),
      );

      const buttonAttrs = attrs[`${key}Attrs`];

      attrs[`${key}Attrs`] = computed(() => {
        const isSelected = Array.isArray(selectedValue?.value)
          ? selectedValue?.value?.includes(props.value)
          : selectedValue?.value === props.value;

        return {
          ...buttonAttrs.value,
          class: cx([buttonAttrs.value.class, isSelected && selectedClasses.value]),
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
